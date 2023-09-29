import React, { useRef, useEffect, useState } from "react";
import Library from "../../../sections/Home/Library/Library";
import DataTable from "../../../sections/Home/Library/DataTable";
import { Box, Grid, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../../redux/store/store";
import {
  fetchVideos,
  deleteVideoAsync,
} from "../../../redux/actions/videoDetailAction";
import {
  deleteVideo,
  setIsPlaying,
} from "../../../redux/slices/videoDetailSlice";
import { toast } from "react-toastify";

const AfterboxLibrary: React.FC = () => {
  const rows = [
    { name: "John Doe", date: "2023-06-22" },
    { name: "Jane Doe", date: "2023-06-21" },
  ];
  const dispatch: AppDispatch = useDispatch();

  const videoClips = useSelector((state: RootState) => state.videos.videos);
  const isPlaying = useSelector((state: RootState) => state.videos.isPlaying);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");

    if (userIdFromLocalStorage) {
      dispatch(fetchVideos());
    }
  }, [dispatch]);

  const handleVideoClick = (videoName: string) => {
    const clickedVideo = videoClips.find((video) => video.name === videoName);
    if (clickedVideo) {
      navigate(`/video-details/${videoName}`, {
        state: {
          videoSrc: clickedVideo.video,
          _id: clickedVideo._id,
          name: clickedVideo.name,
          email: clickedVideo.emails,
          deliveryDate: clickedVideo.deliveryDate,
        },
      });
    } else {
      console.error(`No video found with the name: ${videoName}`);
    }
  };

  // Handles playing and pausing of video
  const handleVideo = (videoName: string) => {
    if (videoRefs.current[videoName]) {
      if (isPlaying[videoName]) {
        videoRefs.current[videoName]!.pause();
      } else {
        videoRefs.current[videoName]!.currentTime = 0; // Resets video time to 0
        videoRefs.current[videoName]!.play();
      }
    }

    dispatch(
      setIsPlaying({ ...isPlaying, [videoName]: !isPlaying[videoName] })
    );
  };

  const handleDelete = async (videoId: string) => {
    try {
      const response = await dispatch(deleteVideoAsync(videoId));
      if (deleteVideoAsync.fulfilled.match(response)) {
        console.log("Video deleted successfully");

        dispatch(deleteVideo(response.payload));
        setSubmitted(true);
      }
      toast.success("Video deleted successfully");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 5000);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting video");
    }
  };

  useEffect(() => {
    if (submitted) {
      dispatch(fetchVideos());
      setSubmitted(false);
    }
  }, [dispatch, submitted]);

  return (
    <Box>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Child - Library */}
            <Library
              videos={videoClips}
              handleDelete={handleDelete}
              handleVideo={handleVideo}
              handleVideoClick={handleVideoClick}
              videoRefs={videoRefs}
              isPlaying={isPlaying}
            />
          </Grid>
          {/* Child - DataTable */}
          <Grid item xs={12}>
            <DataTable
              rows={rows}
              videos={videoClips}
              handleVideoClick={handleVideoClick}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AfterboxLibrary;
