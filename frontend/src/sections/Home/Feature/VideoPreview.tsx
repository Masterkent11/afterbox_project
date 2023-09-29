import React from "react";
import { IconButton, Grid, useMediaQuery, useTheme } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseIcon from "@mui/icons-material/Pause";

interface VideoPreviewProps {
  videoPlaying: boolean;
  handleIconButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleVideoClick: () => void;
  showButton: boolean;
  recordWebcam: any;
  handleRetake: () => void;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  videoPlaying,
  handleIconButtonClick,
  handleVideoClick,
  showButton,
  recordWebcam,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      position="relative"
      style={{
        display: `${recordWebcam.status === "PREVIEW" ? "block" : "none"}`,
      }}
    >
      <video
        controls
        controlsList="nodownload  noremoteplayback disablePictureInPicture"
        disablePictureInPicture
        ref={recordWebcam.previewRef}
        onClick={handleVideoClick}
      />
      <IconButton
        aria-label="play/pause"
        onClick={handleIconButtonClick}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "rgba(255, 255, 255, 0.8)",
          display: isMobile ? "none" : showButton ? "block" : "none",
        }}
      >
        {videoPlaying ? (
          <PauseIcon style={{ fontSize: 120 }} />
        ) : (
          <PlayCircleIcon style={{ fontSize: 120 }} />
        )}
      </IconButton>
    </Grid>
  );
};
