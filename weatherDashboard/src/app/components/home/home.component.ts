import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';

import * as songsActions from '../../stores/actions/songs.action'
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatTabsModule } from '@angular/material/tabs'
import { FavouritesService } from '../../favourites.service';
import { MatDividerModule } from '@angular/material/divider'
import { CitiesService } from '../../cities.service';
import { map, Observable, of, startWith, Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout'

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		CommonModule,
		SidebarComponent,
		MatTabsModule,
		MatDividerModule,
		MatAutocompleteModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule

	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent {
	tempMarque: boolean = false;
	screen: string = 'mobile'; // tablet, pc

	summaryData: any = {
		today: [
			{ time: '01:00 pm', weather: 'sunny', minTemp: 32, maxTemp: 40 },
			{ time: '02:00 pm', weather: 'rain', minTemp: 32, maxTemp: 40 },
			{ time: '03:00 pm', weather: 'cloudy', minTemp: 32, maxTemp: 40 },
			{ time: '04:00 pm', weather: 'sunny', minTemp: 32, maxTemp: 40 },
			{ time: '05:00 pm', weather: 'rain', minTemp: 32, maxTemp: 40 },
			{ time: '06:00 pm', weather: 'thunderstorm', minTemp: 12, maxTemp: 20 },
			{ time: '07:00 pm', weather: 'snow', minTemp: -22, maxTemp: 0 },
			{ time: '08:00 pm', weather: 'snow', minTemp: -32, maxTemp: 0 },
		],
		sevenDays: [
			{ time: 'Monday', weather: 'sunny', minTemp: 32, maxTemp: 40 },
			{ time: 'Tuesday', weather: 'rain', minTemp: 32, maxTemp: 40 },
			{ time: 'Wednesday', weather: 'cloudy', minTemp: 32, maxTemp: 40 },
			{ time: 'Thursday', weather: 'sunny', minTemp: 32, maxTemp: 40 },
			{ time: 'Friday', weather: 'rain', minTemp: 32, maxTemp: 40 },
			{ time: 'Saturday', weather: 'thunderstorm', minTemp: 32, maxTemp: 40 },
			{ time: 'Sunday', weather: 'snow', minTemp: 32, maxTemp: 40 },
		]
	}

	/** Condition code, to set icons and bg-images. */
	weatherBackgrounds: any = {
		sunny: [1000], // Sunny/Clear
		cloudy: [1003, 1006, 1009, 1030, 1135, 1147], // Cloudy/Overcast
		rainy: [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201,
			1240, 1243, 1246, 1273, 1276], // Rainy
		snowy: [1066, 1069, 1072, 1114, 1117, 1168, 1171, 1204, 1207, 1210, 1213,
			1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264, 1279, 1282], // Snowy/Wintry
		thundery: [1087, 1273, 1276, 1279, 1282] // Thundery
	};
	bgImgPath: string = '';
	imgpaths: any = {
		sunny: '/assets/sunny1.png',
		cloudy: '/assets/sunny1.png',
		rainy: '/assets/sunny1.png',
		snowy: '/assets/sunny1.png',
		thundery: '/assets/sunny1.png',
	}

	/** For city searchbar */
	myControl = new FormControl('');
	cityOptions: string[] = [];
	filteredOptions: Observable<string[]> = of([]);

	searchQuery: string = 'Pune'

	/** DATA */
	// data: any = {}

	obsGetCurrentWeather$: Observable<any>;
	subGetCurrentWeather: Subscription = new Subscription;
	obsGetForecast$: Observable<any>;
	subGetForecast: Subscription = new Subscription;

	constructor(private store: Store<AppState>, public favouriteService: FavouritesService,
		public citiesService: CitiesService,
		private breakpoint: BreakpointObserver,

	) {
		this.obsGetCurrentWeather$ = store.select((state) => state.SongsSlice.getSongs);
		this.obsGetForecast$ = store.select((state) => state.SongsSlice.getForecast);

	}

	ngOnInit() {
		console.log("Home, ngOnInit")
		this.breakpoint.observe([this.favouriteService.getSmallScr(), this.favouriteService.getMediumScr()]).subscribe(result => {
			if (result.breakpoints[this.favouriteService.getSmallScr()]) {
				this.screen = 'mobile'
				console.log("small");
			}
			else if (result.breakpoints[this.favouriteService.getMediumScr()]) {
				this.screen = 'tablet';
				console.log("medium");
			}
			else {
				this.screen = 'pc';
				console.log("large")
			}
		})
		console.log("screen size", this.screen)
		// this.store.dispatch(new songsActions.GetSongs({city: 'Haryana'}));
		// this.store.dispatch(new songsActions.GetForecast({city: 'Pune'}));

		this.cityOptions = this.citiesService.getCitiesList();
		this.filteredOptions = this.myControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value || '')),
		);
		console.log("#########################", this.citiesService.getCitiesList().length)

		/** Subscribe get current weather. */
		this.subGetCurrentWeather = this.obsGetCurrentWeather$.subscribe((action) => {
			if (action) {
				console.log("subGetCurrentWeather", action)
				if (action.payload && action.payload.current) {
					this.data = action.payload;
					this.setBgImg(this.data.current.condition.code);
				}
			}
		})

		this.subGetForecast = this.obsGetForecast$.subscribe((action) => {
			if (action) {
				console.log("subGetForecast", action)
				if (action.payload && action.payload.current) {
					this.data = action.payload;
					this.setBgImg(this.data.current.condition.code);
				}
			}
		})

		this.setBgImg(this.data.current.condition.code);

	}

	ngOnDestroy() {
		this.subGetCurrentWeather !== undefined ? this.subGetCurrentWeather.unsubscribe() : null
	}

	/** Set background image. */
	setBgImg(code: number) {
		this.bgImgPath = '';
		Object.keys(this.weatherBackgrounds).forEach((wth: any) => {
			if (this.weatherBackgrounds[wth].includes(code)) {
				// this.bgImgPath = this.imgpaths[wth];
				return;
			}
		});

		console.log("setImg", code, this.bgImgPath)
		if (this.bgImgPath === '') {
			/** set default image. */
		}
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.cityOptions.filter(option => option.toLowerCase().includes(filterValue));
	}

	search(event: any) {

	}




	/** Dummy response..... */
	data: any = //{}
		{
			"location": {
				"name": "Pune",
				"region": "Maharashtra",
				"country": "India",
			},
			"current": {
				"last_updated_epoch": 1726943400,
				"last_updated": "2024-09-22 00:00",
				"temp_c": 22,
				"is_day": 0,
				"condition": {
					"text": "Patchy rain nearby",
					"icon": "//cdn.weatherapi.com/weather/64x64/night/176.png",
					"code": 1063
				},
				"wind_kph": 9.4,
				"wind_degree": 279,
				"wind_dir": "W",
				"pressure_mb": 1009, //mBar
				"pressure_in": 29.8,
				"precip_mm": 0.06,
				// "precip_in": 0,
				"humidity": 94, //%
				"cloud": 58,  //% cloud cover
				"feelslike_c": 22,
				"windchill_c": 22,
				"heatindex_c": 24.6,
				"dewpoint_c": 21,
				"vis_km": 10,   // visibility
				"uv": 1,
				"air_quality": {
					"co": 608.65,
					"no2": 34.41,
					"o3": 75,
					"so2": 23.68,
					"pm2_5": 39.775,
					"pm10": 57.905,
					"us-epa-index": 2,
					"gb-defra-index": 4
				},
				"gust_kph": 14.3,
				"wind_mph": 5.8
			},
			"forecast": {
				"forecastday": [
					{
						"date": "2024-10-02",
						"date_epoch": 1727827200,
						"day": {
							"maxtemp_c": 31.2,
							"maxtemp_f": 88.2,
							"mintemp_c": 23.7,
							"mintemp_f": 74.7,
							"avgtemp_c": 26.7,
							"avgtemp_f": 80,
							"maxwind_mph": 9.6,
							"maxwind_kph": 15.5,
							"totalprecip_mm": 5.96,
							"totalprecip_in": 0.23,
							"totalsnow_cm": 0,
							"avgvis_km": 9.5,
							"avgvis_miles": 5,
							"avghumidity": 74,
							"daily_will_it_rain": 1,
							"daily_chance_of_rain": 96,
							"daily_will_it_snow": 0,
							"daily_chance_of_snow": 0,
							"condition": {
								"text": "Moderate rain",
								"icon": "//cdn.weatherapi.com/weather/64x64/day/302.png",
								"code": 1189
							},
							"uv": 11
						},
						"astro": {
							"sunrise": "06:25 AM",
							"sunset": "06:22 PM",
							"moonrise": "05:55 AM",
							"moonset": "06:09 PM",
							"moon_phase": "New Moon",
							"moon_illumination": 1,
							"is_moon_up": 0,
							"is_sun_up": 0
						},
						"hourly": []
					},
					{
						"date": "2024-10-03",
						"date_epoch": 1727913600,
						"day": {
							"maxtemp_c": 29.7,
							"maxtemp_f": 85.5,
							"mintemp_c": 22.4,
							"mintemp_f": 72.4,
							"avgtemp_c": 25.1,
							"avgtemp_f": 77.3,
							"maxwind_mph": 10.1,
							"maxwind_kph": 16.2,
							"totalprecip_mm": 1.79,
							"totalprecip_in": 0.07,
							"totalsnow_cm": 0,
							"avgvis_km": 9.6,
							"avgvis_miles": 5,
							"avghumidity": 82,
							"daily_will_it_rain": 1,
							"daily_chance_of_rain": 86,
							"daily_will_it_snow": 0,
							"daily_chance_of_snow": 0,
							"condition": {
								"text": "Patchy rain nearby",
								"icon": "//cdn.weatherapi.com/weather/64x64/day/176.png",
								"code": 1063
							},
							"uv": 10
						}
					},
					{
						"date": "2024-10-04",
						"date_epoch": 1728000000,
						"day": {
							"maxtemp_c": 28.9,
							"maxtemp_f": 84,
							"mintemp_c": 21.4,
							"mintemp_f": 70.5,
							"avgtemp_c": 24.2,
							"avgtemp_f": 75.6,
							"maxwind_mph": 9.8,
							"maxwind_kph": 15.8,
							"totalprecip_mm": 6.9,
							"totalprecip_in": 0.27,
							"totalsnow_cm": 0,
							"avgvis_km": 8.6,
							"avgvis_miles": 5,
							"avghumidity": 82,
							"daily_will_it_rain": 1,
							"daily_chance_of_rain": 89,
							"daily_will_it_snow": 0,
							"daily_chance_of_snow": 0,
							"condition": {
								"text": "Moderate rain",
								"icon": "//cdn.weatherapi.com/weather/64x64/day/302.png",
								"code": 1189
							},
							"uv": 11
						}
					}
				]
			}
		}

}

/** Api response's condition code mappping. */
weatherCodeMapping: [
	{
		"code": 1000,
		"day": "Sunny",
		"night": "Clear",
		"icon": 113
	},
	{
		"code": 1003,
		"day": "Partly cloudy",
		"night": "Partly cloudy",
		"icon": 116
	},
	{
		"code": 1006,
		"day": "Cloudy",
		"night": "Cloudy",
		"icon": 119
	},
	{
		"code": 1009,
		"day": "Overcast",
		"night": "Overcast",
		"icon": 122
	},
	{
		"code": 1030,
		"day": "Mist",
		"night": "Mist",
		"icon": 143
	},
	{
		"code": 1063,
		"day": "Patchy rain possible",
		"night": "Patchy rain possible",
		"icon": 176
	},
	{
		"code": 1066,
		"day": "Patchy snow possible",
		"night": "Patchy snow possible",
		"icon": 179
	},
	{
		"code": 1069,
		"day": "Patchy sleet possible",
		"night": "Patchy sleet possible",
		"icon": 182
	},
	{
		"code": 1072,
		"day": "Patchy freezing drizzle possible",
		"night": "Patchy freezing drizzle possible",
		"icon": 185
	},
	{
		"code": 1087,
		"day": "Thundery outbreaks possible",
		"night": "Thundery outbreaks possible",
		"icon": 200
	},
	{
		"code": 1114,
		"day": "Blowing snow",
		"night": "Blowing snow",
		"icon": 227
	},
	{
		"code": 1117,
		"day": "Blizzard",
		"night": "Blizzard",
		"icon": 230
	},
	{
		"code": 1135,
		"day": "Fog",
		"night": "Fog",
		"icon": 248
	},
	{
		"code": 1147,
		"day": "Freezing fog",
		"night": "Freezing fog",
		"icon": 260
	},
	{
		"code": 1150,
		"day": "Patchy light drizzle",
		"night": "Patchy light drizzle",
		"icon": 263
	},
	{
		"code": 1153,
		"day": "Light drizzle",
		"night": "Light drizzle",
		"icon": 266
	},
	{
		"code": 1168,
		"day": "Freezing drizzle",
		"night": "Freezing drizzle",
		"icon": 281
	},
	{
		"code": 1171,
		"day": "Heavy freezing drizzle",
		"night": "Heavy freezing drizzle",
		"icon": 284
	},
	{
		"code": 1180,
		"day": "Patchy light rain",
		"night": "Patchy light rain",
		"icon": 293
	},
	{
		"code": 1183,
		"day": "Light rain",
		"night": "Light rain",
		"icon": 296
	},
	{
		"code": 1186,
		"day": "Moderate rain at times",
		"night": "Moderate rain at times",
		"icon": 299
	},
	{
		"code": 1189,
		"day": "Moderate rain",
		"night": "Moderate rain",
		"icon": 302
	},
	{
		"code": 1192,
		"day": "Heavy rain at times",
		"night": "Heavy rain at times",
		"icon": 305
	},
	{
		"code": 1195,
		"day": "Heavy rain",
		"night": "Heavy rain",
		"icon": 308
	},
	{
		"code": 1198,
		"day": "Light freezing rain",
		"night": "Light freezing rain",
		"icon": 311
	},
	{
		"code": 1201,
		"day": "Moderate or heavy freezing rain",
		"night": "Moderate or heavy freezing rain",
		"icon": 314
	},
	{
		"code": 1204,
		"day": "Light sleet",
		"night": "Light sleet",
		"icon": 317
	},
	{
		"code": 1207,
		"day": "Moderate or heavy sleet",
		"night": "Moderate or heavy sleet",
		"icon": 320
	},
	{
		"code": 1210,
		"day": "Patchy light snow",
		"night": "Patchy light snow",
		"icon": 323
	},
	{
		"code": 1213,
		"day": "Light snow",
		"night": "Light snow",
		"icon": 326
	},
	{
		"code": 1216,
		"day": "Patchy moderate snow",
		"night": "Patchy moderate snow",
		"icon": 329
	},
	{
		"code": 1219,
		"day": "Moderate snow",
		"night": "Moderate snow",
		"icon": 332
	},
	{
		"code": 1222,
		"day": "Patchy heavy snow",
		"night": "Patchy heavy snow",
		"icon": 335
	},
	{
		"code": 1225,
		"day": "Heavy snow",
		"night": "Heavy snow",
		"icon": 338
	},
	{
		"code": 1237,
		"day": "Ice pellets",
		"night": "Ice pellets",
		"icon": 350
	},
	{
		"code": 1240,
		"day": "Light rain shower",
		"night": "Light rain shower",
		"icon": 353
	},
	{
		"code": 1243,
		"day": "Moderate or heavy rain shower",
		"night": "Moderate or heavy rain shower",
		"icon": 356
	},
	{
		"code": 1246,
		"day": "Torrential rain shower",
		"night": "Torrential rain shower",
		"icon": 359
	},
	{
		"code": 1249,
		"day": "Light sleet showers",
		"night": "Light sleet showers",
		"icon": 362
	},
	{
		"code": 1252,
		"day": "Moderate or heavy sleet showers",
		"night": "Moderate or heavy sleet showers",
		"icon": 365
	},
	{
		"code": 1255,
		"day": "Light snow showers",
		"night": "Light snow showers",
		"icon": 368
	},
	{
		"code": 1258,
		"day": "Moderate or heavy snow showers",
		"night": "Moderate or heavy snow showers",
		"icon": 371
	},
	{
		"code": 1261,
		"day": "Light showers of ice pellets",
		"night": "Light showers of ice pellets",
		"icon": 374
	},
	{
		"code": 1264,
		"day": "Moderate or heavy showers of ice pellets",
		"night": "Moderate or heavy showers of ice pellets",
		"icon": 377
	},
	{
		"code": 1273,
		"day": "Patchy light rain with thunder",
		"night": "Patchy light rain with thunder",
		"icon": 386
	},
	{
		"code": 1276,
		"day": "Moderate or heavy rain with thunder",
		"night": "Moderate or heavy rain with thunder",
		"icon": 389
	},
	{
		"code": 1279,
		"day": "Patchy light snow with thunder",
		"night": "Patchy light snow with thunder",
		"icon": 392
	},
	{
		"code": 1282,
		"day": "Moderate or heavy snow with thunder",
		"night": "Moderate or heavy snow with thunder",
		"icon": 395
	}
]

/** sample response */
// tmp: {
//     "payload": {
//         "location": {
//             "name": "Pune",
//             "region": "Maharashtra",
//             "country": "India",
//             "lat": 18.53,
//             "lon": 73.87,
//             "tz_id": "Asia/Kolkata",
//             "localtime_epoch": 1727870410,
//             "localtime": "2024-10-02 17:30"
//         },
//         "current": {
//             "last_updated_epoch": 1727870400,
//             "last_updated": "2024-10-02 17:30",
//             "temp_c": 28,
//             "temp_f": 82.3,
//             "is_day": 1,
//             "condition": {
//                 "text": "Moderate or heavy rain shower",
//                 "icon": "//cdn.weatherapi.com/weather/64x64/day/356.png",
//                 "code": 1243
//             },
//             "wind_mph": 8.5,
//             "wind_kph": 13.7,
//             "wind_degree": 283,
//             "wind_dir": "WNW",
//             "pressure_mb": 1008,
//             "pressure_in": 29.77,
//             "precip_mm": 2.81,
//             "precip_in": 0.11,
//             "humidity": 74,
//             "cloud": 74,
//             "feelslike_c": 31.3,
//             "feelslike_f": 88.4,
//             "windchill_c": 28,
//             "windchill_f": 82.3,
//             "heatindex_c": 31.3,
//             "heatindex_f": 88.4,
//             "dewpoint_c": 22.9,
//             "dewpoint_f": 73.1,
//             "vis_km": 7,
//             "vis_miles": 4,
//             "uv": 6,
//             "gust_mph": 13.6,
//             "gust_kph": 22
//         }
//     },
//     "error": null,
//     "type": "GET_SONGS_RESP"
// }