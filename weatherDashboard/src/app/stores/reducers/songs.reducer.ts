import { SongsState } from "../states/songs.state";
import * as actionSongs from '../actions/songs.action'

export function songsReducer(state = new SongsState(), action: actionSongs.Actions) {
    switch(action.type) {
        case actionSongs.SongActionType.GET_SONGS_RESP:
            return { ...state, getSongs: action};

        case actionSongs.SongActionType.GET_FORECAST_RESP:
            return { ...state, getForecast: action};

        default:
            return state;
    }
}