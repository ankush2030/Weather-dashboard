import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class FavouritesService {
	smallScreen = '(max-width: 768px)';
	mediumScreen = '(max-width: 1200px)';

	constructor() { }

	getIconClass(type: string) {

		switch (type) {
			/** weather related */
			case 'sunny':
				return 'fas fa-sun';

			case 'cloudy':
				return 'fas fa-cloud';

			case 'thunderstorm':
				return 'fas fa-bolt';

			case 'rain':
				return 'fas fa-cloud-showers-heavy';

			case 'snow':
				return 'fas fa-snowflake';

			/** general */
			case 'city':
				return 'fas fa-city';

			case 'map':
				return 'fas fa-map';

			default:
				return 'fas fa-question';
		}
	}

	getWeatherColor(type: string) {

		switch (type) {
			/** weather related */
			case 'sunny':
				return '#FFD700';
			
			case 'partly cloudy':
				return '#87CEEB ';

			case 'cloudy':
				return '#808080';

			case 'thunderstorm':
				return '#4B0082';

			case 'rain':
				return '#4682B4';

			case 'snow':
				return '#FFFFFF';
			
			case 'windy':
				return '#D3D3D3'
			
			case 'foggy':
				return '#C0C0C0'

			default:
				return 'fas fa-question';
		}
	}

	getSmallScr() {
		return this.smallScreen;
	}
	getMediumScr() {
		return this.mediumScreen;
	}


}
