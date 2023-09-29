import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface VideoPlayingState {
    videoPlaying: boolean;
}

export const initialState: VideoPlayingState = {
    videoPlaying: false,

}


export const videoPlayingSlice = createSlice({
    name: "videoPlaying",
    initialState,
    reducers: {
        setVideoPlaying: (state, action: PayloadAction<boolean>) => {
            state.videoPlaying = action.payload;

        }

    }
});

export const {setVideoPlaying} = videoPlayingSlice.actions;

