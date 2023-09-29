import React, { useEffect, useState, useRef } from "react";
import { Box, Grid, Typography, Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { formatTime } from "../../../utils/formatTime";

interface Video {
  _id: string;
  name: string;
  src: string;
  video: string;
}

interface LibraryProps {
  videos: Video[];
  handleDelete: (fileName: string) => void;
  handleVideo: (videoName: string) => void;
  handleVideoClick: (fileName: string) => void;
  videoRefs: React.MutableRefObject<{ [key: string]: HTMLVideoElement | null }>;
  isPlaying: { [key: string]: boolean };
}

const Library: React.FC<LibraryProps> = ({
  videos,
  handleDelete,
  handleVideo,
  videoRefs,
  isPlaying,
  handleVideoClick,
}) => {
  const [, setVideoDuration] = useState<{ [key: string]: string }>({});
  const previewTimeout = useRef<number | null>(null);

  useEffect(() => {
    videos.forEach((video) => {
      if (videoRefs.current[video.name]) {
        videoRefs.current[video.name]?.addEventListener(
          "loadedmetadata",
          (e) => {
            const target = e.target as HTMLVideoElement;
            setVideoDuration((prev) => ({
              ...prev,
              [video.name]: formatTime(target.duration),
            }));
          }
        );
      }
    });
  }, [videos, videoRefs]);

  return (
    <Box sx={{ maxWidth: "xl", margin: "0 auto" }}>
      <Typography variant="h3">Recent Videos</Typography>
      <Grid
        container
        spacing={2}
      >
        {videos.map((video) => (
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            key={video._id}
          >
            <Box
              onClick={() => handleVideoClick(video.name)}
              sx={{
                position: "relative",
                width: "100%",
                paddingTop: "56.25%",
                cursor: "pointer",
              }}
            >
              <video
                ref={(el) => (videoRefs.current[video.name] = el)}
                src={video.video}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (!isPlaying[video.name]) {
                    e.currentTarget.play();
                    previewTimeout.current = window.setTimeout(() => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }, 3000);
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isPlaying[video.name]) {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                    if (previewTimeout.current) {
                      window.clearTimeout(previewTimeout.current);
                    }
                  }
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "3rem",
                  cursor: "pointer",
                }}
                onClick={() => handleVideo(video.name)}
              >
                {isPlaying[video.name] ? (
                  <PauseIcon sx={{ fontSize: "14vmin" }} />
                ) : (
                  <PlayArrowIcon sx={{ fontSize: "14vmin" }} />
                )}
              </Box>
              {/* <Box
                sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  color: "white",
                  background: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "5px",
                  padding: "2px 5px",
                }}
              >
                <Typography variant="body2">
                  {parseFloat(videoDuration[video.name]) > 60
                    ? `${videoDuration[video.name]} mins`
                    : `${videoDuration[video.name]} secs`}
                </Typography>
              </Box> */}
            </Box>
            <Stack
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
              alignItems="center"
              mt={1}
            >
              <Typography variant="body1">{video.name}</Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  width: "15vmin",
                  fontSize: "2vmin",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(video._id)}
              >
                Delete
              </Button>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Library;
