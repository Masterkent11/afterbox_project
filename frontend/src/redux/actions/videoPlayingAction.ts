import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { VideoPlayingState } from "../slices/videoPlayingSlice";

// export const fetchVideoPlaying = createAsyncThunk(
//   "videoPlaying/fetchVideoPlaying",
//   async ({ formData }: { formData: FormData }, thunkAPI) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       return thunkAPI.rejectWithValue("No token found");
//     }
//     try {
//       const response = await axios.post(
//         "https://afterbox.io/api/boxes",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log([...formData.entries()]);
//       return response.data as VideoPlayingState["videoPlaying"];
//     } catch (Error) {
//       const axiosError = Error as AxiosError;
//       console.error(axiosError);
//       return thunkAPI.rejectWithValue(axiosError?.response?.data);
//     }
//   }
// );

export const fetchVideoPlaying = createAsyncThunk(
  "videoPlaying/fetchVideoPlaying",
  async (
    {
      formData,
      shouldSubmitPending,
    }: { formData: FormData; shouldSubmitPending: boolean },
    thunkAPI
  ) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    // Check for pending video in local storage and if shouldSubmitPending is true
    if (shouldSubmitPending) {
      const pendingVideoJson = localStorage.getItem("pendingVideo");
      if (pendingVideoJson) {
        try {
          // Parse pending video data
          const pendingVideoData = JSON.parse(pendingVideoJson);

          // Attach pending video data to the formData
          formData.append("userVideoData", JSON.stringify(pendingVideoData));

          // Remove the pending video data from local storage
          localStorage.removeItem("pendingVideo");
        } catch (error) {
          console.error("Error parsing pending video data:", error);
        }
      }
    }

    try {
      const response = await axios.post(
        "https://afterbox.io/api/boxes",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log([...formData.entries()]);
      return response.data as VideoPlayingState["videoPlaying"];
    } catch (Error) {
      const axiosError = Error as AxiosError;
      console.error(axiosError);
      return thunkAPI.rejectWithValue(axiosError?.response?.data);
    }
  }
);
