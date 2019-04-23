import scrapNextLink from '../scrap-next-link';
import filePage from '../utils/file-page';

describe('scrap-next-link', () => {
  test('scrapNextLink first 20', async () => {
    await page.goto(filePage('table-players-20.html'));
    const scrapNextLinkTest = await scrapNextLink(page);
    expect(scrapNextLinkTest).toEqual(
      'https://liquipedia.net/counterstrike/index.php?title=Special:Ask&limit=20&offset=20&q=%5B%5BCategory%3APlayers%5D%5D+%5B%5B%3A%2B%5D%5D&p=format%3Dtemplate%2Flink%3Dnone%2Fheaders%3Dshow%2Fsearchlabel%3D...-20further-20results%2Fvaluesep%3D%2C%2Ftemplate%3DPlayers-20Role-20Table-2Frow%2Fintrotemplate%3DPlayers-20Role-20Table-2Fintro%2Foutrotemplate%3DPlayers-20Role-20Table-2Foutro&po=%3FHas+nationality%0A%3FHas+id%0A%3FHas+team%0A%3FHas+status%0A%3FHas+role%0A&sort=has+id&order=asc&eq=yes#search'
    );
  });
  //
  test('scrapNextLink last 500', async () => {
    await page.goto(filePage('table-players-500-last.html'));
    const scrapNextLinkTest = await scrapNextLink(page);
    expect(scrapNextLinkTest).toEqual(undefined);
  });
});
