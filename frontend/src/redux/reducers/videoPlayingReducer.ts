import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { fetchVideoPlaying } from "../actions/videoPlayingAction";
import { initialState, VideoPlayingState } from "../slices/videoPlayingSlice";

// Define the reducer
const videoPlayingReducer = createReducer(initialState, (builder) => {
  builder.addCase(
    fetchVideoPlaying.fulfilled,
    (state, action: PayloadAction<VideoPlayingState["videoPlaying"]>) => {
      state.videoPlaying = action.payload;
    }
  );
});

export default videoPlayingReducer;
