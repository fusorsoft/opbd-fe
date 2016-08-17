angular.module('csgoData').factory('Weapons', function weaponDataFactory() {

	var iconBase = "/assets/images/weaponIcons/";
	var imageBase = "/assets/images/weapons/";

	var weaponInfo = function(weaponName, imageName) {
		var self = this;
		self.Name = weaponName;
		self.ImageName = imageName;
		self.IconUrl = iconBase + imageName;
		self.ImageUrl = imageBase + imageName;
	};

	var getInfo = function(weaponName) {
		switch (weaponName) {
			case 'AK47':
				return new weaponInfo('AK-47', 'ak47.png');
			case 'AUG':
				return new weaponInfo('AUG', 'aug.png');
			case 'AWP':
				return new weaponInfo('AWP', 'awp.png');
			case 'Bizon':
				return new weaponInfo('PP-Bizon', 'bizon.png');
			case 'CZ':
				return new weaponInfo('CZ75-Auto', 'cz75.png');
			case 'DesertEagle':
				return new weaponInfo('Desert Eagle', 'deagle.png');
			case 'Decoy':
				return new weaponInfo('Decoy', 'decoy.png');
			case 'DualBarettas':
				return new weaponInfo('Dual Berettas', 'dualies.png');
			case 'Famas':
				return new weaponInfo('FAMAS', 'famas.png');
			case 'FiveSeven':
				return new weaponInfo('Five-SeveN', 'fiveseven.png');
			case 'Flash':
				return new weaponInfo('Flashbang', 'flashbang.png');
			case 'G3SG1':
				return new weaponInfo('G3SG1', 'g3sg1.png');
			case 'Galil':
				return new weaponInfo('Galil AR', 'galilar.png');
			case 'Glock':
				return new weaponInfo('Glock-18', 'glock.png');
			case 'HE':
				return new weaponInfo('HE Grenade', 'grenade.png');
			case 'Incendiary':
				return new weaponInfo('Incendiary Grenade', 'incgrenade.png');
			case 'Fire':
				return new weaponInfo('Fire', 'inferno.png');
			case 'knife_bayonet':
				return new weaponInfo('knife_bayonet', 'knife_bayonet.png');
			case 'knife_default_ct':
				return new weaponInfo('knife_default_ct', 'knife_default_ct.png');
			//case 'knife_default_t':
			case 'Knife':
				//return new weaponInfo('knife_default_t', 'knife_default_t.png');
				return new weaponInfo('Knife', 'knife_default_t.png');
			case 'knife_flip':
				return new weaponInfo('knife_flip', 'knife_flip.png');
			case 'knife_gut':
				return new weaponInfo('knife_gut', 'knife_gut.png');
			case 'knife_karambit':
				return new weaponInfo('knife_karambit', 'knife_karambit.png');
			case 'knife_m9_bayonet':
				return new weaponInfo('knife_m9_bayonet', 'knife_m9_bayonet.png');
			case 'M249':
				return new weaponInfo('M249', 'm249.png');
			case 'M4A4':
				return new weaponInfo('M4A4', 'm4a1.png');
			case 'M4A1':
				return new weaponInfo('M4A1-S', 'm4a1_silencer.png');
			case 'Mac10':
				return new weaponInfo('MAC-10', 'mac10.png');
			case 'Mag7':
				return new weaponInfo('MAG-7', 'mag7.png');
			case 'Molotov':
				return new weaponInfo('Molotov Cocktail', 'molotov.png');
			case 'MP7':
				return new weaponInfo('MP7', 'mp7.png');
			case 'MP9':
				return new weaponInfo('MP9', 'mp9.png');
			case 'Negev':
				return new weaponInfo('Negev', 'negev.png');
			case 'Nova':
				return new weaponInfo('Nova', 'nova.png');
			case 'P2000':
				return new weaponInfo('P2000', 'p2000.png');
			case 'P250':
				return new weaponInfo('P250', 'p250.png');
			case 'P90':
				return new weaponInfo('P90', 'p90.png');
			case 'SawedOff':
				return new weaponInfo('Sawed-Off', 'sawedoff.png');
			case 'Scar20':
				return new weaponInfo('SCAR-20', 'scar20.png');
			// case 'sg552':
			// 	return new weaponInfo('sg552', 'sg552.png');
			case 'SG556':
				return new weaponInfo('SG 553', 'sg556.png');
			case 'Smoke':
				return new weaponInfo('Smoke Grenade', 'smokegrenade.png');
			case 'Scout':
				return new weaponInfo('SSG 08', 'ssg08.png');
			case 'suicide':
				return new weaponInfo('suicide', 'suicide.png');
			case 'Zeus':
				return new weaponInfo('taser', 'taser.png');
			case 'Tec9':
				return new weaponInfo('Tec-9', 'tec9.png');
			case 'UMP':
				return new weaponInfo('UMP-45', 'ump45.png');
			case 'USP':
				return new weaponInfo('USP-S', 'usp_silencer.png');
			// case 'usp_silencer':
			// 	return new weaponInfo('usp_silencer', 'usp_silencer.png');
			// case 'usp_silencer_off':
			// 	return new weaponInfo('usp_silencer_off', 'usp_silencer_off.png');
			case 'XM1014':
				return new weaponInfo('XM1014', 'xm1014.png');
		}
	};

	return {
		GetInfo: getInfo
	};
});