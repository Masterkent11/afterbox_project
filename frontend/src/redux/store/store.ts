import { configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import videoReducer from "../slices/videoSlice";
import videoDetailReducer from "../reducers/videoDetailReducer";
import videoPlayingReducer from "../reducers/videoPlayingReducer";
export const store = configureStore({
  reducer: {
    video: videoReducer,
    videos: videoDetailReducer,
    videoPlaying: videoPlayingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
