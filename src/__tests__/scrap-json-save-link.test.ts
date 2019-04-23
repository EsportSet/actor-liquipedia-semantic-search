import scrapJsonSaveLink from '../scrap-json-save-link';
import filePage from '../utils/file-page';

describe('scrap-json-save-link', () => {
  test('scrapJsonSaveLink first 20', async () => {
    await page.goto(filePage('table-players-20.html'));
    const scrapJsonSaveLinkTest = await scrapJsonSaveLink(page);
    expect(scrapJsonSaveLinkTest).toEqual(
      'https://liquipedia.net/counterstrike/Special:Ask/cl:YzqNUNtKxEAM_SAtKZV9WciLyiI-qKz-QLab2tHpZEjSlf690xbto0IgOcnJyaUTHcjxwyRBDOkTkySGnunMami9fIExadtHOnHEx9fnJ7hQHNk44zU4DzmSM75EmkpH1dRHiVzcG51mf9CiEJKr_E1daCDjv8gLDUzU8YHmejiDaNkayVqQrjN2rMtNQ3Bsaqh2t8Xuiua76LT_0d3dz9bUa3l_tSagujmsqok8SKIYfNqSZdRv7EzDhszJR9uwlqVhoJDW90FWdp-yllPRdWQYE1tLmRf0DQ'
    );
  });
  //
  test('scrapJsonSaveLink last 500', async () => {
    await page.goto(filePage('table-players-500-last.html'));
    const scrapJsonSaveLinkTest = await scrapJsonSaveLink(page);
    expect(scrapJsonSaveLinkTest).toEqual(
      'https://liquipedia.net/counterstrike/Special:Ask/cl:YzqNUMtKxUAM_SAtKZVuLmSjchEXKuoP5PamdnRmUpJU6d87bdEuFQLJSU5OHr1oIsd3kwwx5A_MkhkGpjOroQ3yBcak3RDpxBHvXx4f4JPixMYjXoJzGiM541OkuXRUTf0skYt7pdPij1oUQnaVv6krDWT6F3mlgYk63tFSD2cQLVsjWQfS98aOTV3X5awUHNsSVe11sZui-yY6H36029vFmnorHy62BFRXx005kwfJFIPPe7KM-42dKe3InHyyHWtZHBKFvL0QRmX3edRyLrpODFNm62jkFX0D'
    );
  });
});
