import Apify from 'apify';
import got from 'got';
import normalizeUrl from 'normalize-url';
import { Page } from 'puppeteer';

import scrapJsonSaveLink from './scrap-json-save-link';
import scrapNextLink from './scrap-next-link';

/**
 *
 * Modified version of default apify gotoFunction
 * https://github.com/apifytech/apify-js/blob/master/src/puppeteer_crawler.js#L9
 */
async function gotoFunctionModified({
  page,
  request
}: {
  page: Page;
  request: any;
}): Promise<void> {
  // setRequestInterception - wish this we can ignore some content on page
  // https://pptr.dev/#?product=Puppeteer&version=v1.14.0&show=api-pagesetrequestinterceptionvalue
  await page.setRequestInterception(true);
  //
  page.on(
    'request',
    (intercepted): void => {
      const ignoredTypes = [
        'stylesheet',
        'image',
        'media',
        'font',
        'script',
        'texttrack',
        'xhr',
        'fetch',
        'eventsource',
        'websocket',
        'manifest',
        'other'
      ];
      const resourceType = intercepted.resourceType();
      if (ignoredTypes.includes(resourceType)) {
        intercepted.abort();
      } else {
        intercepted.continue();
      }
    }
  );
  await Apify.utils.puppeteer.hideWebDriver(page);
  const userAgent = Apify.utils.getRandomUserAgent();
  await page.setUserAgent(userAgent);
  await page.goto(request.url, { timeout: 100000 });
}

/* eslint-disable sonarjs/cognitive-complexity */
Apify.main(
  async (): Promise<void> => {
    const inputRaw = await Apify.getValue('INPUT');
    //
    if (!inputRaw.startUrl)
      throw new Error('Attribute startUrl missing in input.');
    if (typeof inputRaw.startUrl !== 'string') {
      throw new TypeError('input.startUrl must an string!');
    }
    //
    const startUrlNorm = normalizeUrl(inputRaw.startUrl, { forceHttps: true });
    const input = Object.assign(inputRaw, { startUrl: startUrlNorm });

    const requestQueue = await Apify.openRequestQueue();
    await requestQueue.addRequest({
      url: input.startUrl
    });

    const crawler = new Apify.PuppeteerCrawler({
      requestQueue,
      //
      maxRequestRetries: input.maxRequestRetries ? input.maxRequestRetries : 3,
      maxRequestsPerCrawl: input.maxRequestsPerCrawl
        ? input.maxRequestsPerCrawl
        : 100,
      maxConcurrency: 1,
      //
      // from
      // https://github.com/VaclavRut/actor-amazon-crawler/blob/master/src/main.js
      // This page is executed for each request.
      // Parameter page is Puppeteers page object with loaded page.
      gotoFunction: async ({
        request,
        page
      }: {
        page: Page;
        request: any;
      }): Promise<void> => {
        await gotoFunctionModified({ page, request });
      },
      //
      launchPuppeteerFunction: async (): Promise<void> =>
        Apify.launchPuppeteer({
          headless: input.headless ? input.headless : false,
          useApifyProxy:
            input.proxyConfiguration && input.proxyConfiguration.useApifyProxy
              ? input.proxyConfiguration.useApifyProxy
              : false,
          userAgent: await Apify.utils.getRandomUserAgent(),
          liveView: input.liveView ? input.liveView : false
        }),
      //
      handlePageFunction: async ({
        page
      }: {
        page: Page;
        request: any;
      }): Promise<void> => {
        // added delay not to crawl too fast
        await page.waitFor(Math.floor(Math.random() * 5000) + 1000);
        //
        // get JSON file wish got lib
        const jsonSaveUrl = await scrapJsonSaveLink(page);
        if (jsonSaveUrl) {
          const response = await got.get(jsonSaveUrl, { json: true });
          const jsonArray = await Object.values(response.body.results);
          await Apify.pushData(jsonArray);
        }
        //
        const nextLink = await scrapNextLink(page);
        if (nextLink) {
          await requestQueue.addRequest({
            url: nextLink
          });
        }
      },
      handleFailedRequestFunction: async ({ request }): Promise<void> => {
        await Apify.pushData({
          '#debug': Apify.utils.createRequestDebugInfo(request)
        });
      }
    });
    //
    await crawler.run();
  }
);
