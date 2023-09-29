import { useEffect } from "react";
import { useRecordWebcam } from "react-record-webcam";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { AppDispatch } from "../redux/store/store";
import { setVideoPlaying } from "../redux/slices/videoSlice";

const useVideoPlayback = () => {
  const recordWebcam = useRecordWebcam();

  // Redux
  const dispatch: AppDispatch = useDispatch();
  const videoPlaying = useSelector(
    (state: RootState) => state.video.videoPlaying
  );

  // Play and Pause
  const handleVideoPlayPause = () => {
    const video = recordWebcam.previewRef.current;
    if (video) {
      if (videoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      dispatch(setVideoPlaying(!videoPlaying));
    }
  };

  // Video playback review
  useEffect(() => {
    const video = recordWebcam.previewRef.current;
    if (video) {
      video.addEventListener("ended", () => dispatch(setVideoPlaying(false)));
      return () => {
        video.removeEventListener("ended", () =>
          dispatch(setVideoPlaying(false))
        );
      };
    }
  }, [recordWebcam.previewRef, dispatch]);

  return {
    handleVideoPlayPause,
    videoPlaying,
  };
};

export default useVideoPlayback;
