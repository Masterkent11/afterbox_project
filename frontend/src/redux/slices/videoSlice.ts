import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoState {
  videoPlaying: boolean;
  isFrontCamera: boolean;
  email: string[];
  deliveredDate: Date | null;
  timer: number;
  countdown: number;
  countdownActive: boolean;
  recordingActive: boolean;
  showButton: boolean;
  videoClips: string[];
  submittedData: any[];
  duration: number;
  video: any;
}

const initialState: VideoState = {
  videoPlaying: false,
  submittedData: [],
  isFrontCamera: false,
  email: [],
  deliveredDate: null,
  timer: 0,
  countdown: 0,
  countdownActive: false,
  recordingActive: false,
  showButton: false,
  videoClips: [],
  video: null,
  duration: 0,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoPlaying: (state: VideoState, action: PayloadAction<boolean>) => {
      state.videoPlaying = action.payload;
    },
    setIsFrontCamera: (state, action: PayloadAction<boolean>) => {
      state.isFrontCamera = action.payload;
    },
    setEmail: (state, action: PayloadAction<string[]>) => {
      state.email = action.payload;
    },
    setDeliveryDate: (state, action: PayloadAction<Date | null>) => {
      state.deliveredDate = action.payload;
    },
    setTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
    },
    setCountdown: (state, action: PayloadAction<number>) => {
      state.countdown = action.payload;
    },
    setCountdownActive: (state, action: PayloadAction<boolean>) => {
      state.countdownActive = action.payload;
    },
    setRecordingActive: (state, action: PayloadAction<boolean>) => {
      state.recordingActive = action.payload;
    },
    setShowButton: (state, action: PayloadAction<boolean>) => {
      state.showButton = action.payload;
    },
    setSubmittedData: (state, action: PayloadAction<any>) => {
      state.submittedData.push(action.payload);
    },
    deleteVideoClip: (state, action: PayloadAction<string>) => {
      state.videoClips = state.videoClips.filter(
        (video) => video !== action.payload
      );
    },
  },
});

export const {
  setVideoPlaying,
  setIsFrontCamera,
  setEmail,
  setDeliveryDate,
  setTimer,
  setCountdown,
  setCountdownActive,
  setRecordingActive,
  setShowButton,
  setSubmittedData,
  deleteVideoClip,
} = videoSlice.actions;

export default videoSlice.reducer;
