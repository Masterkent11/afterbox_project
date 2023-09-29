import React from "react";
import { Grid, Box } from "@mui/material";

interface VideoDetailsProps {
  videoSrc: string;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({ videoSrc }) => {
  return (
    <Grid
      item
      xl={8}
      lg={8}
      sm={12}
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={"100%"}
      flexDirection={"column"}
      sx={{ order: { xs: 1, md: 0 } }}
    >
      <Box
        sx={{
          width: "50vmax",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {videoSrc && <video src={videoSrc} controls />}
      </Box>
    </Grid>
  );
};

export default VideoDetails;
