import { ActionReducerMap } from "@ngrx/store";
import { SongsState } from "./stores/states/songs.state";
import { songsReducer } from "./stores/reducers/songs.reducer";

export interface AppState {
    SongsSlice: SongsState
}

export const appReducers: ActionReducerMap<AppState, any> = {
    SongsSlice: songsReducer
}