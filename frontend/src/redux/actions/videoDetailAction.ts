import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface UpdateVideoPayload {
  video: any;
  videoID: string;
}

// Fetch videos
export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://afterbox.io/api/boxes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data, "video data from fetchVideos");
      const userBoxId = response.data[0]._id;

      localStorage.setItem("userBoxId", userBoxId);

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      return thunkAPI.rejectWithValue(axiosError?.response?.data);
    }
  }
);
// Delete video
export const deleteVideoAsync = createAsyncThunk(
  "videos/deleteVideoAsync",
  async (videoId: string, thunkAPI) => {
    const token = localStorage.getItem("token");

    if (!videoId) {
      return thunkAPI.rejectWithValue("No video ID found");
    }

    try {
      const response = await axios.delete(
        `https://afterbox.io/api/boxes/${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to delete video");
      }

      return videoId;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.message);
    }
  }
);

// Update video
export const updateVideoAsync = createAsyncThunk(
  "videos/updateVideoAsync",
  async ({ video, videoID }: UpdateVideoPayload, thunkAPI) => {
    const userVideoID = videoID;

    const token = localStorage.getItem("token");

    if (!userVideoID) {
      return thunkAPI.rejectWithValue("No video ID found");
    }

    try {
      const response = await axios.patch(
        `https://afterbox.io/api/boxes/${userVideoID}`,
        video,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to update video");
      }
      console.log(userVideoID, "userVideoID from updateVideoAsync");

      return video;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.message);
    }
  }
);
