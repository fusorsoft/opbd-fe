angular.module('csgoData').factory('Maps', function mapDataFactory() {

	var mapBase = "/assets/images/maps/";
	var mapIconBase = "/assets/images/mapIcons/";
	var mapShotBase = "/assets/images/mapShots/";

	var mapInfo = function(name, prettyName, xOffset, yOffset, scaleFactor, imageName, ssName, legendXOffset, legendYOffset) {
		var self = this;
		self.name = name;
		self.prettyName = prettyName;
		self.xOffset = xOffset;
		self.yOffset = yOffset;
		self.scaleFactor = scaleFactor;
		self.imageUrl = mapBase + imageName;
		self.fullIconUrl = mapIconBase + 'Full/' + imageName;
		self.medIconUrl = mapIconBase + 'Med/' + imageName;
		self.screenshot = mapShotBase + ssName;
		self.legendXOffset = legendXOffset;
		self.legendYOffset = legendYOffset;
	};

	var getMapData = function(mapName) { 
		var info = null;

		switch (mapName) {
			case 'de_cache':
				info = new mapInfo(
						"de_cache",
						"Cache",
						465,
						-735,
						4.4,
						'cache.png',
						'de_cache.jpg',
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
						550,
						700
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
						20,
						20
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
						'santorini.png',
						'de_santorini.jpg',
						20,
						600
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