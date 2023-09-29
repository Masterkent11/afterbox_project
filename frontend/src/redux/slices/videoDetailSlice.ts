import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface Video {
  [x: string]: any;
  emails: any;
  name: string;
  src: string;
  date: string;
  title: string;
  email: string;
  video: any;
  _id: string;
  deliveryDate: string;
}

export interface VideoState {
  videos: Video[];
  isPlaying: { [key: string]: boolean };
  isEditable: boolean;
  editedTitle: string;
  editedEmail: string;
  editedDate: string;
  error: string | undefined | null;
  status: "idle" | "loading" | "failed" | "succeeded";
}

// Define the initial state
export const initialState: VideoState = {
  videos: [],
  isPlaying: {},
  isEditable: false,
  editedTitle: "",
  editedEmail: "",
  editedDate: "",
  error: null,
  status: "idle",
};

// Define the slice
const videoDetailSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setIsPlaying: (
      state,
      action: PayloadAction<{ [key: string]: boolean }>
    ) => {
      state.isPlaying = action.payload;
    },
    deleteVideo: (state, action: PayloadAction<string>) => {
      state.videos = state.videos.filter(
        (video) => video.name !== action.payload
      );
    },
    setIsEditable: (state, action: PayloadAction<boolean>) => {
      state.isEditable = action.payload;
    },
    setEditedTitle: (state, action: PayloadAction<string>) => {
      state.editedTitle = action.payload;
    },
    setEditedEmail: (state, action: PayloadAction<string>) => {
      state.editedEmail = action.payload;
    },
    setEditedDate: (state, action: PayloadAction<string>) => {
      state.editedDate = action.payload;
    },
  },
});

export const {
  setIsPlaying,
  deleteVideo,
  setIsEditable,
  setEditedTitle,
  setEditedEmail,
  setEditedDate,
} = videoDetailSlice.actions;
