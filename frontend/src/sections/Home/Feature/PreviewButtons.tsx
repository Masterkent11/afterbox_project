// PreviewButtons.tsx
import React from "react";
import { Button, Stack } from "@mui/material";

interface PreviewButtonsProps {
  recordWebcam: any;
  handleRetake: () => void;
}

export const PreviewButtons: React.FC<PreviewButtonsProps> = ({
  recordWebcam,
  handleRetake,
}) => {
  if (recordWebcam.status !== "PREVIEW") {
    return null;
  }

  return (
    <Stack
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"row"}
      gap={5}
    >
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        Submit
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
        onClick={handleRetake}
      >
        Retake
      </Button>
    </Stack>
  );
};


