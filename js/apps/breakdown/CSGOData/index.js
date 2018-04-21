import getMapData from './getMapData'
import getRankData from './getRankData'
import getWeaponData from './getWeaponData'

function mapDataFactory () {
  return { getMapData }
}

function rankDataFactory () {
  return { getRankData }
}

function weaponDataFactory () {
  return { getWeaponData }
}

export default angular.module('csgoData', [])
  .factory('Maps', mapDataFactory)
  .factory('Ranks', rankDataFactory)
  .factory('Weapons', weaponDataFactory)
  .name
