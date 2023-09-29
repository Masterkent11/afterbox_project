import { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteVideo } from "../../redux/slices/videoDetailSlice";
import {
  deleteVideoAsync,
  fetchVideos,
} from "../../redux/actions/videoDetailAction";
import { AppDispatch } from "../../redux/store/store";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { updateVideoAsync } from "../../redux/actions/videoDetailAction";
import FormDetails from "../../sections/VideoDetails/FormDetails";
import VideoDetails from "../../sections/VideoDetails/VideoDetails";
import ButtonDetails from "../../sections/VideoDetails/ButtonDetails";

const VideoDetailsIndex = () => {
  const location = useLocation();
  const { videoSrc, deliveryDate, name, email, _id } = location.state || {};
  const [submitted, setSubmitted] = useState(false);

  // Textfields
  const [isEditable, setIsEditable] = useState(false);
  const [editedTitle, setEditedTitle] = useState(name || "");
  const [editedEmail, setEditedEmail] = useState(email || []);
  const [editedDate, setEditedDate] = useState(dayjs(deliveryDate || null));

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  // Delete video
  const handleDeleteVideoDetails = async (videoId: string) => {
    try {
      const response = await dispatch(deleteVideoAsync(videoId));

      if (deleteVideoAsync.fulfilled.match(response)) {
        console.log("response payload", response);

        const deletedVideoId = response.payload;
        dispatch(deleteVideo(deletedVideoId));
        setSubmitted(true);
      }
      toast.success("Video deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error in dispatching deleteVideoAsync:", error);
    }
  };

  useEffect(() => {
    if (submitted) {
      dispatch(fetchVideos());
      setSubmitted(false);
    }
  }, [submitted, dispatch]);

  // Save details
  const handleEdit = () => {
    setIsEditable(true);
  };

  // Back icon functionality
  const handleBack = () => {
    navigate(-1);
  };

  const handleSave = async () => {
    const videoDetailsToUpdate = {
      name: editedTitle,
      emails: editedEmail,
      video: videoSrc,
      deliveryDate: editedDate.toISOString(),
    };

    // Retrieving the video's ID from location.state
    const videoID = location.state?._id;
    console.log("videoID", videoID);

    if (!videoID) {
      console.error("No video ID available for updating.");
      return;
    }

    try {
      const response = await dispatch(
        updateVideoAsync({ video: videoDetailsToUpdate, videoID })
      );

      if (updateVideoAsync.fulfilled.match(response)) {
        // The update was successful
        console.log("Video details updated successfully");
      }

      setIsEditable(false);

      toast.success("Video details updated successfully!");

      // navigate("/");
    } catch (error) {
      console.error("Failed to update video:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ButtonDetails
        handleEdit={handleEdit}
        handleBack={handleBack}
        isEditable={isEditable}
      />

      <Container maxWidth="xl">
        <Grid container>
          <FormDetails
            videoId={_id}
            handleDeleteVideoDetails={handleDeleteVideoDetails}
            handleSave={handleSave}
            handleEdit={handleEdit}
            handleBack={handleBack}
            setIsEditable={setIsEditable}
            setEditedTitle={setEditedTitle}
            setEditedEmail={setEditedEmail}
            setEditedDate={setEditedDate}
            isEditable={isEditable}
            editedTitle={editedTitle}
            editedEmail={editedEmail}
            editedDate={editedDate}
            videoSrc={videoSrc}
          />
          <VideoDetails videoSrc={videoSrc} />
        </Grid>
      </Container>
    </Box>
  );
};

export default VideoDetailsIndex;
