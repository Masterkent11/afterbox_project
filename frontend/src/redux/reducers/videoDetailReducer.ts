import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchVideos,
  deleteVideoAsync,
  updateVideoAsync,
} from "../actions/videoDetailAction";
import {
  initialState,
  VideoState,
  setIsPlaying,
  deleteVideo,
} from "../slices/videoDetailSlice";

// Define the reducer
const videoDetailReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      setIsPlaying,
      (state, action: PayloadAction<{ [key: string]: boolean }>) => {
        state.isPlaying = action.payload;
      }
    )
    .addCase(deleteVideo, (state, action: PayloadAction<string>) => {
      state.videos = state.videos.filter(
        (video) => video._id !== action.payload
      );
    })
    .addCase(
      fetchVideos.fulfilled,
      (state, action: PayloadAction<VideoState["videos"]>) => {
        state.videos = action.payload;
      }
    )
    .addCase(
      deleteVideoAsync.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.videos = state.videos.filter(
          (video) => video._id !== action.payload
        );
      }
    )
    .addCase(updateVideoAsync.pending, (state) => {
      state.status = "loading";
    })
    .addCase(
      updateVideoAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        const index = state.videos.findIndex(
          (video) => video._id === action.payload._id
        );
        if (index !== -1) {
          state.videos[index] = action.payload;
        }
      }
    )
    .addCase(updateVideoAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
});

export default videoDetailReducer;
