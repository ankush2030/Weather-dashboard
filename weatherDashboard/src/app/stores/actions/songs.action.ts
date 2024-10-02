import { Action } from "@ngrx/store";

export enum SongActionType {
    GET_SONGS = 'GET_SONGS',
    GET_SONGS_RESP = 'GET_SONGS_RESP',
    GET_FORECAST = 'GET_FORECAST',
    GET_FORECAST_RESP = 'GET_FORECAST_RESP',
}

export class GetSongs implements Action {
    readonly type = SongActionType.GET_SONGS;
    constructor(public payload: any) {};
}
export class GetSongsResp implements Action {
    readonly type = SongActionType.GET_SONGS_RESP;
    constructor(public payload: any, public error: any) {};
}

export class GetForecast implements Action {
    readonly type = SongActionType.GET_FORECAST;
    constructor(public payload: any) {};
}
export class GetForecastResp implements Action {
    readonly type = SongActionType.GET_FORECAST_RESP;
    constructor(public payload: any, public error: any) {};
}

export type Actions = 
    | GetSongs
    | GetSongsResp
    | GetForecast
    | GetForecastResp