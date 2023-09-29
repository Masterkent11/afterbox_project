import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const submitForm = createAsyncThunk<void, FormData>(
  "video/submitForm",
  async (data, { getState }): Promise<void> => {
    try {
      const response = await fetch("https://afterbox.io/api/boxes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      const responseData = await response.json();
      console.log(responseData);

      // Access the current state if needed
      const currentState = getState() as RootState;
      console.log(currentState);
    } catch (error) {
      // Handle error here
      console.error("Error", error);
      throw new Error("Failed to submit form");
    }
  }
);
