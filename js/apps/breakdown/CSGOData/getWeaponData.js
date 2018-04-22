const iconBase = '/images/weaponIcons/'
const imageBase = '/images/weapons/'

class WeaponInfo {
  constructor (weaponName, imageName) {
    this.Name = weaponName
    this.ImageName = imageName
    this.IconUrl = iconBase + imageName
    this.ImageUrl = imageBase + imageName
  }
}

export default function (weaponName) {
  switch (weaponName) {
  case 'AK47':
    return new WeaponInfo('AK-47', 'ak47.png')
  case 'AUG':
    return new WeaponInfo('AUG', 'aug.png')
  case 'AWP':
    return new WeaponInfo('AWP', 'awp.png')
  case 'Bizon':
    return new WeaponInfo('PP-Bizon', 'bizon.png')
  case 'CZ':
    return new WeaponInfo('CZ75-Auto', 'cz75.png')
  case 'DesertEagle':
    return new WeaponInfo('Desert Eagle', 'deagle.png')
  case 'Decoy':
    return new WeaponInfo('Decoy', 'decoy.png')
  case 'DualBarettas':
    return new WeaponInfo('Dual Berettas', 'dualies.png')
  case 'Famas':
    return new WeaponInfo('FAMAS', 'famas.png')
  case 'FiveSeven':
    return new WeaponInfo('Five-SeveN', 'fiveseven.png')
  case 'Flash':
    return new WeaponInfo('Flashbang', 'flashbang.png')
  case 'G3SG1':
    return new WeaponInfo('G3SG1', 'g3sg1.png')
  case 'Galil':
    return new WeaponInfo('Galil AR', 'galilar.png')
  case 'Glock':
    return new WeaponInfo('Glock-18', 'glock.png')
  case 'HE':
    return new WeaponInfo('HE Grenade', 'grenade.png')
  case 'Incendiary':
    return new WeaponInfo('Incendiary Grenade', 'incgrenade.png')
  case 'Fire':
    return new WeaponInfo('Fire', 'inferno.png')
  case 'knife_bayonet':
    return new WeaponInfo('knife_bayonet', 'knife_bayonet.png')
  case 'knife_default_ct':
    return new WeaponInfo('knife_default_ct', 'knife_default_ct.png')
    // case 'knife_default_t':
  case 'Knife':
    // return new WeaponInfo('knife_default_t', 'knife_default_t.png');
    return new WeaponInfo('Knife', 'knife_default_t.png')
  case 'knife_flip':
    return new WeaponInfo('knife_flip', 'knife_flip.png')
  case 'knife_gut':
    return new WeaponInfo('knife_gut', 'knife_gut.png')
  case 'knife_karambit':
    return new WeaponInfo('knife_karambit', 'knife_karambit.png')
  case 'knife_m9_bayonet':
    return new WeaponInfo('knife_m9_bayonet', 'knife_m9_bayonet.png')
  case 'M249':
    return new WeaponInfo('M249', 'm249.png')
  case 'M4A4':
    return new WeaponInfo('M4A4', 'm4a1.png')
  case 'M4A1':
    return new WeaponInfo('M4A1-S', 'm4a1_silencer.png')
  case 'Mac10':
    return new WeaponInfo('MAC-10', 'mac10.png')
  case 'Mag7':
    return new WeaponInfo('MAG-7', 'mag7.png')
  case 'Molotov':
    return new WeaponInfo('Molotov Cocktail', 'molotov.png')
  case 'MP7':
    return new WeaponInfo('MP7', 'mp7.png')
  case 'MP9':
    return new WeaponInfo('MP9', 'mp9.png')
  case 'Negev':
    return new WeaponInfo('Negev', 'negev.png')
  case 'Nova':
    return new WeaponInfo('Nova', 'nova.png')
  case 'P2000':
    return new WeaponInfo('P2000', 'p2000.png')
  case 'P250':
    return new WeaponInfo('P250', 'p250.png')
  case 'P90':
    return new WeaponInfo('P90', 'p90.png')
  case 'SawedOff':
    return new WeaponInfo('Sawed-Off', 'sawedoff.png')
  case 'Scar20':
    return new WeaponInfo('SCAR-20', 'scar20.png')
  case 'SG556':
    return new WeaponInfo('SG 553', 'sg556.png')
  case 'Smoke':
    return new WeaponInfo('Smoke Grenade', 'smokegrenade.png')
  case 'Scout':
    return new WeaponInfo('SSG 08', 'ssg08.png')
  case 'suicide':
    return new WeaponInfo('suicide', 'suicide.png')
  case 'Zeus':
    return new WeaponInfo('taser', 'taser.png')
  case 'Tec9':
    return new WeaponInfo('Tec-9', 'tec9.png')
  case 'UMP':
    return new WeaponInfo('UMP-45', 'ump45.png')
  case 'USP':
    return new WeaponInfo('USP-S', 'usp_silencer.png')
  case 'XM1014':
    return new WeaponInfo('XM1014', 'xm1014.png')
  }
}
