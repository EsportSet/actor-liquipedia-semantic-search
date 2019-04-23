import { Page } from 'puppeteer';

import getAttribute from './utils/get-attribute';

/**
 *
 *  finde next link by text/content
 */
async function findeNextLink(element): Promise<string | undefined> {
  const text = await getAttribute(element);
  if (text && /next.*/.test(text)) {
    const nextLink = getAttribute(element, 'href');
    return nextLink;
  }
}

/**
 *
 *  scrap next link from page
 */
export default async function scrapNextLink(
  page: Page
): Promise<string | undefined> {
  const paginationLinksBlock = await page.$('div[class="smw-ui-pagination"]');
  if (paginationLinksBlock) {
    const paginationLinksArray = await paginationLinksBlock.$$('a');
    const nextLinkArray = await Promise.all(
      paginationLinksArray.map(
        async (element): Promise<string | undefined> =>
          await findeNextLink(element)
      )
    );
    const nextLink = nextLinkArray.filter(Boolean);
    return nextLink[nextLink.length - 1];
  }
}
