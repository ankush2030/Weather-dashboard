
import { Injectable } from '@angular/core';
import * as actionSongs from '../actions/songs.action';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { apis, getApi } from '../../api';

@Injectable({ providedIn: 'root' })
export class SongsEffects {
	constructor(private actions$: Actions, private http: HttpClient, private router: Router) {
		console.log("@@@@@@@@!!!!!!!!!!", actions$)
	}

	// getSongs$ = createEffect(() => {
	//     console.log("$$$$%%%%", this.actions$)
	//     return this.actions$.pipe(
	//         ofType(actionSongs.SongActionType.GET_SONGS),
	//         map((data: any) => data.payload),

	//         exhaustMap((payload) => {

	//             return this.http
	//                 .get(getApi(apis.GET_SONGS) )
	//                 .pipe(map((data: any) => new actionSongs.GetSongsResp(data, null)),
	//                     catchError(err => of(new actionSongs.GetSongsResp(null, err))))
	//         })
	//     )
	// })

	getSongs$ = createEffect(() => {
		return () => {
			console.log("$$$$%%%%", this.actions$)
			return this.actions$.pipe(
				ofType(actionSongs.SongActionType.GET_SONGS),
				map((data: any) => data.payload),
				exhaustMap((payload) => {
					const q = payload?.city ? `&q=${payload.city}` : '';
					const aqi = `&aqi=yes`;

					return this.http.get(getApi(apis.GET_SONGS) + q + aqi).pipe(
						map((data: any) => new actionSongs.GetSongsResp(data, null)),
						catchError(err => of(new actionSongs.GetSongsResp(null, err)))
					);
				})
			);
		};
	});


	getForecast$ = createEffect(() => {
		return () => {
			console.log("$$$$%%%%", this.actions$)
			return this.actions$.pipe(
				ofType(actionSongs.SongActionType.GET_FORECAST),
				map((data: any) => data.payload),
				exhaustMap((payload) => {
					const q = payload?.city ? `&q=${payload.city}` : '';
					const aqi = `&aqi=yes`;
					const days = `&days=7`;

					return this.http.get(getApi(apis.GET_FORECAST) + q + aqi + days).pipe(
						map((data: any) => new actionSongs.GetForecastResp(data, null)),
						catchError(err => of(new actionSongs.GetForecastResp(null, err)))
					);
				})
			);
		};
	});


}