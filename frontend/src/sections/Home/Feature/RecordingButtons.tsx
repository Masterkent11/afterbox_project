// RecordButton.tsx
import React from "react";
import { Button, Grid } from "@mui/material";

interface RecordButtonProps {
  recordWebcam: any;
  handleStart: () => void;
  handleStopRecording: () => void;
}

export const RecordingButtons: React.FC<RecordButtonProps> = ({
  recordWebcam,
  handleStart,
  handleStopRecording,
}) => (
  <Grid
    sx={{
      marginTop: "2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {recordWebcam.status === "OPEN" && (
      <Button
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
        onClick={handleStart}
      >
        Start recording
      </Button>
    )}

    {recordWebcam.status === "RECORDING" && (
      <Button
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
        onClick={handleStopRecording}
      >
        Stop recording
      </Button>
    )}
  </Grid>
);
