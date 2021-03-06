
class RankInfo {
  constructor (rank, rankName, rankSmallImg, rankImg, rankAbbr) {
    this.Rank = rank
    this.Name = rankName
    this.SmallImg = rankSmallImg
    this.Img = rankImg
    this.Abbreviation = rankAbbr
  }
}

export default function (rank) {
  var rankInfo = null

  switch (rank) {
  case 1:
    rankInfo = new RankInfo(
      1,
      'Silver 1',
      '/images/ranks/small/rank01.png',
      '/images/ranks/rank01.png',
      'S1')
    break
  case 2:
    rankInfo = new RankInfo(
      2,
      'Silver 2',
      '/images/ranks/small/rank02.png',
      '/images/ranks/rank02.png',
      'S2')
    break
  case 3:
    rankInfo = new RankInfo(
      3,
      'Silver 3',
      '/images/ranks/small/rank03.png',
      '/images/ranks/rank03.png',
      'S3')
    break
  case 4:
    rankInfo = new RankInfo(
      4,
      'Silver 4',
      '/images/ranks/small/rank04.png',
      '/images/ranks/rank04.png',
      'S4')
    break
  case 5:
    rankInfo = new RankInfo(
      5,
      'Silver Elite',
      '/images/ranks/small/rank05.png',
      '/images/ranks/rank05.png',
      'SE')
    break
  case 6:
    rankInfo = new RankInfo(
      6,
      'Silver Elite Master',
      '/images/ranks/small/rank06.png',
      '/images/ranks/rank06.png',
      'SEM')
    break
  case 7:
    rankInfo = new RankInfo(
      7,
      'Gold Nova 1',
      '/images/ranks/small/rank07.png',
      '/images/ranks/rank07.png',
      'GN1')
    break
  case 8:
    rankInfo = new RankInfo(
      8,
      'Gold Nova 2',
      '/images/ranks/small/rank08.png',
      '/images/ranks/rank08.png',
      'GN2')
    break
  case 9:
    rankInfo = new RankInfo(
      9,
      'Gold Nova 3',
      '/images/ranks/small/rank09.png',
      '/images/ranks/rank09.png',
      'GN3')
    break
  case 10:
    rankInfo = new RankInfo(
      10,
      'Gold Nova Master',
      '/images/ranks/small/rank10.png',
      '/images/ranks/rank10.png',
      'GNM')
    break
  case 11:
    rankInfo = new RankInfo(
      11,
      'Master Guardian 1',
      '/images/ranks/small/rank11.png',
      '/images/ranks/rank11.png',
      'MG1')
    break
  case 12:
    rankInfo = new RankInfo(
      12,
      'Master Guardian 2',
      '/images/ranks/small/rank12.png',
      '/images/ranks/rank12.png',
      'MG2')
    break
  case 13:
    rankInfo = new RankInfo(
      13,
      'Master Guardian Elite',
      '/images/ranks/small/rank13.png',
      '/images/ranks/rank13.png',
      'MGE')
    break
  case 14:
    rankInfo = new RankInfo(
      14,
      'Distinguished Master Guardian',
      '/images/ranks/small/rank14.png',
      '/images/ranks/rank14.png',
      'DMG')
    break
  case 15:
    rankInfo = new RankInfo(
      15,
      'Legendary Eagle',
      '/images/ranks/small/rank15.png',
      '/images/ranks/rank15.png',
      'LE')
    break
  case 16:
    rankInfo = new RankInfo(
      16,
      'Legendary Eagle Master',
      '/images/ranks/small/rank16.png',
      '/images/ranks/rank16.png',
      'LEM')
    break
  case 17:
    rankInfo = new RankInfo(
      17,
      'Supreme Master First Class',
      '/images/ranks/small/rank17.png',
      '/images/ranks/rank17.png',
      'SMFC')
    break
  case 18:
    rankInfo = new RankInfo(
      18,
      'The Global Elite',
      '/images/ranks/small/rank18.png',
      '/images/ranks/rank18.png',
      'GE')
    break
  }

  return rankInfo
}
