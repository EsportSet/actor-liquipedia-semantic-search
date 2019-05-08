import playerFilter from '../player-filter';

const ALOHADANCE = {
  printouts: {
    'Has nationality': ['Ukraine'],
    'Has id': ['ALOHADANCE'],
    'Has team': [],
    'Has status': ['Active'],
    'Has role': ['Carry']
  },
  fulltext: 'ALOHADANCE',
  fullurl: 'https://liquipedia.net/dota2/ALOHADANCE',
  namespace: 0,
  exists: '1',
  displaytitle: 'ALOHADANCE'
};
const Victoria = {
  printouts: {
    'Has nationality': ['China'],
    'Has id': ['黑凤梨丶'],
    'Has team': ['CDEC Gaming'],
    'Has status': ['Active'],
    'Has role': ['Support']
  },
  fulltext: 'Victoria',
  fullurl: 'https://liquipedia.net/dota2/Victoria',
  namespace: 0,
  exists: '1',
  displaytitle: '黑凤梨丶'
};
const yxb = {
  printouts: {
    'Has nationality': ['China'],
    'Has id': ['yxb'],
    'Has team': [],
    'Has status': ['Inactive'],
    'Has role': ['Support']
  },
  fulltext: 'Ainiyo',
  fullurl: 'https://liquipedia.net/dota2/Ainiyo',
  namespace: 0,
  exists: '1',
  displaytitle: 'yxb'
};
const EriNeeman = {
  printouts: {
    'Has nationality': ['Philippines'],
    'Has id': ['Eri Neeman'],
    'Has team': [],
    'Has status': ['Active'],
    'Has role': ['Host']
  },
  fulltext: 'Eri Neeman',
  fullurl: 'https://liquipedia.net/dota2/Eri_Neeman',
  namespace: 0,
  exists: '1',
  displaytitle: 'Eri Neeman'
};

describe('player-filter', () => {
  describe('pass filter', () => {
    test('Victoria', () => {
      const test = playerFilter(Victoria, {
        onlyStatusActive: true,
        noCoach: true,
        noCaster: true,
        haveTeam: true
      });
      expect(test).toEqual(true);
    });
    test('yxb, no haveTeam', () => {
      const test = playerFilter(yxb, {
        noCoach: true,
        noCaster: true
      });
      expect(test).toEqual(true);
    });
    test('yxb, no filter', () => {
      const test = playerFilter(yxb);
      expect(test).toEqual(true);
    });
  });
  //
  describe('NOT pass filter', () => {
    test('ALOHADANCE', () => {
      const test = playerFilter(ALOHADANCE, {
        haveTeam: true
      });
      expect(test).toEqual(false);
    });
    test('yxb', () => {
      const test = playerFilter(yxb, {
        onlyStatusActive: true,
        noCoach: true,
        noCaster: true,
        haveTeam: true
      });
      expect(test).toEqual(false);
    });
    test('Eri Neeman', () => {
      const test = playerFilter(EriNeeman, {
        noHost: true
      });
      expect(test).toEqual(false);
    });
  });
});
