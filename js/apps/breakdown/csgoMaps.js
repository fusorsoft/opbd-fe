angular.module('csgoData').factory('Maps', function mapDataFactory() {

	var mapBase = "/assets/images/maps/";
	var mapIconBase = "/assets/images/mapIcons/";
	var mapShotBase = "/assets/images/mapShots/";

	var mapInfo = function(name, prettyName, xOffset, yOffset, scaleFactor, iconName, ssName, mapImgName, legendXOffset, legendYOffset) {
		var self = this;
		self.name = name;
		self.prettyName = prettyName;
		self.xOffset = xOffset;
		self.yOffset = yOffset;
		self.scaleFactor = scaleFactor;
		self.imageUrl = mapBase + mapImgName;
		self.fullIconUrl = mapIconBase + 'Full/' + iconName;
		self.medIconUrl = mapIconBase + 'Med/' + iconName;
		self.smallIconUrl = mapIconBase + 'Small/' + iconName;
		self.screenshot = mapShotBase + ssName;
		self.legendXOffset = legendXOffset;
		self.legendYOffset = legendYOffset;
	};

	var getMapData = function(mapName) { 
		var info = null;

		switch (mapName) {

			// Active Duty

			case 'de_cache':
				info = new mapInfo(
						"de_cache",
						"Cache",
						465,
						-735,
						4.4,
						'cache.png',
						'de_cache.jpg',
						'cache.png',
						520,
						175
					);

				break;
			case 'de_cbble':
				info = new mapInfo(
						"de_cbble",
						"Cobblestone",
						800,
						-635,
						4.75,
						'cobble.png',
						'de_cbble.jpg',
						'cobble.png',
						480,
						635
					);

				break;
			case 'de_dust2':
				info = new mapInfo(
						"de_dust2",
						"Dust II",
						680,
						-980,
						3.5,
						'dust2.png',
						'de_dust2.jpg',
						'dust2.png',
						550,
						700
					);
				break;
			case 'de_mirage':
				info = new mapInfo(
						"de_mirage",
						"Mirage",
						790,
						-440,
						4.3,
						'mirage.png',
						'de_mirage.jpg',
						'mirage.png',
						20,
						675
					);

				break;
			case 'de_nuke':
				info = new mapInfo(
						"de_nuke",
						"Nuke",
						615,
						-530,
						5.9,
						'nuke.png',
						'de_nuke.jpg',
						'nuke.png',
						20,
						200
					);

				break;
			case 'de_overpass':
				info = new mapInfo(
						"de_overpass",
						"Overpass",
						1150,
						-430,
						4.2,
						'overpass.png',
						'de_overpass.jpg',
						'overpass.png',
						20,
						20
					);

				break;
			
			case 'de_train':
				info = new mapInfo(
						"de_train",
						"Train",
						650,
						-630,
						3.7,
						'train.png',
						'de_train.jpg',
						'train.png',
						20,
						20
					);

				break;

			// reserves
			case 'cs_assault':
				info = new mapInfo(
						// origin is nowhere near the play area....
						'cs_assault',
						'Assault',
						-1100,
						-2050,
						3.7,
						'assault.png',
						'cs_assault.jpg',
						'assault.png',
						20,
						20
					);
				break;
			case 'de_aztec':
				info = new mapInfo(
						'de_aztec',
						'Aztec',
						660,
						-590,
						4.9,
						'aztec.png',
						'de_aztec.jpg',
						'aztec.png',
						20,
						20
					);
				break;
			case 'de_dust':
				info = new mapInfo(
						'de_dust',
						'Dust',
						570,
						-835,
						4.95,
						'dust.png',
						'de_dust.jpg',
						'dust.png',
						500,
						600
					);
				break;
			case 'de_inferno':
				info = new mapInfo(
						"de_inferno",
						"Inferno",
						465,
						-930,
						4.75,
						'inferno.png',
						"de_inferno.jpg",
						'inferno.png',
						20,
						20
					);

				break;
			case 'cs_italy':
				info = new mapInfo(
						"cs_italy",
						"Italy",
						700,
						-700,
						3.8,
						'italy.png',
						"cs_italy.jpg",
						'italy.png',
						20,
						20
					);

				break;
			case 'cs_militia':
				info = new mapInfo(
						"cs_militia",
						"Militia",
						370,
						-520,
						3.6,
						'militia.png',
						"cs_militia.jpg",
						'militia.png',
						20,
						20
					);

				break;
			case 'cs_office':
				info = new mapInfo(
						"cs_office",
						"Office",
						555,
						-575,
						3.41,
						'office.png',
						"cs_office.jpg",
						'office.png',
						300,
						20
					);

				break;
			case 'de_vertigo':
				info = new mapInfo(
						"de_vertigo",
						"Vertigo",
						980,
						-550,
						3.2,
						'vertigo.png',
						"de_vertigo.jpg",
						'vertigo.png',
						20,
						20
					);

				break;

			// wildfire
			case 'de_coast': 
				info = new mapInfo(
						"de_coast",
						"Coast",
						670,
						-935,
						8.9,
						"operation_wildfire.png",
						"de_coast.jpg",
						"coast.png",
						20,
						635
					);
				break;
			case 'cs_cruise': 
				info = new mapInfo(
						"cs_cruise",
						"Cruise",
						930,
						-625,
						3.4,
						"operation_wildfire.png",
						"cs_coast.jpg",
						"cruise.png",
						20,
						20
					);
				break;
			case 'de_empire': 
				info = new mapInfo(
						"de_empire",
						"Empire",
						600,
						-545,
						3.4,
						"operation_wildfire.png",
						"de_empire.jpg",
						"empire.png",
						20,
						20
					);
				break;
			case 'de_mikla': 
				info = new mapInfo(
						"de_mikla",
						"Mikla",
						-180,
						-725,
						3.4,
						"operation_wildfire.png",
						"de_mikla.jpg",
						"mikla.png",
						20,
						20
					);
				break;
			case 'de_royal': 
				info = new mapInfo(
						"de_royal",
						"Royal",
						730,
						-820,
						3.2,
						"operation_wildfire.png",
						"de_royal.jpg",
						"royal.png",
						20,
						20
					);
				break;
			case 'de_santorini':
				info = new mapInfo(
						"de_santorini",
						"Santorini",
						665,
						-435,
						3.1,
						'operation_wildfire.png',
						'de_santorini.jpg',
						'santorini.png',
						20,
						600
					);
				break;
			case 'de_tulip':
				info = new mapInfo(
						"de_tulip",
						"Tulip",
						-1297,
						871,
						4.5,
						'operation_wildfire.png',
						'de_tulip.jpg',
						'tulip.png',
						20,
						600
					);
				break;

			// bloodhound

			case 'cs_agency':
				info = new mapInfo(
						"cs_agency",
						"Agency",
						735,
						-620,
						3.9,
						'operation_bloodhound.png',
						'cs_agency.jpg',
						'agency.png',
						20,
						600
					);
				break;
			case 'de_log':
				info = new mapInfo(
						"de_log",
						"Log",
						65,
						-125,
						5.1,
						'operation_bloodhound.png',
						'de_log.jpg',
						'log.png',
						20,
						600
					);
				break;
			case 'de_rails':
				info = new mapInfo(
						"de_rails",
						"Rails",
						600,
						-795,
						3.5,
						'operation_bloodhound.png',
						'de_rails.jpg',
						'rails.png',
						20,
						600
					);
				break;
			case 'de_resort':
				info = new mapInfo(
						"de_resort",
						"Resort",
						160,
						-615,
						4.6,
						'operation_bloodhound.png',
						'de_resort.jpg',
						'resort.png',
						20,
						600
					);
				break;
			case 'de_season':
				info = new mapInfo(
						"de_season",
						"Season",
						255,
						-640,
						4.0,
						'operation_bloodhound.png',
						'de_season.jpg',
						'season.png',
						20,
						600
					);
				break;
			case 'de_zoo':
				info = new mapInfo(
						"de_zoo",
						"Zoo",
						435,
						-1040,
						6.2,
						'operation_bloodhound.png',
						'de_zoo.jpg',
						'zoo.png',
						20,
						20
					);
				break;

			default:
				info = new mapInfo(
						mapName,
						mapName
					);

		}

		return info;
	};

	return {
		GetMapData: getMapData
	};
});