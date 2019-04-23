import { Page } from 'puppeteer';

import getAttribute from './utils/get-attribute';

/**
 *
 *  finde JSON link by text/content
 */
async function findeJsonLink(element): Promise<string | undefined> {
  const text = await getAttribute(element);
  if (text && /JSON/.test(text)) {
    const jsonLink = getAttribute(element, 'href');
    return jsonLink;
  }
}

/**
 *
 *  scrap JSON link from page
 */
export default async function scrapJsonSaveLink(
  page: Page
): Promise<string | undefined> {
  const allPageLinks = await page.$$(
    'div[class="smw-ui-pagination"] > a[class="page-link"]'
  );
  const jsonLinkArray = await Promise.all(
    allPageLinks.map(
      async (element): Promise<string | undefined> =>
        await findeJsonLink(element)
    )
  );
  const jsonLink = jsonLinkArray.filter(Boolean);
  return jsonLink[jsonLink.length - 1];
}
