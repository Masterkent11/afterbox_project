// hooks/useButtonVisibility.ts
import { useEffect, useRef } from "react";
import useVideoPlayback from "../hooks/useVideoPlayback";
import { setShowButton } from "../redux/slices/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store/store";

const useButtonVisibility = () => {
  const buttonTimeout = useRef<number | null>(null);

  const showButton = useSelector((state: RootState) => state.video.showButton);
  const dispatch: AppDispatch = useDispatch();
  const { handleVideoPlayPause } = useVideoPlayback();

  // Icon Click
  const handleIconButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    handleVideoPlayPause(); 
  };

  // Show the button, but don't hide it after 2 seconds
  const handleVideoClick = () => {
    dispatch(setShowButton(true));
  };

  // Cleanup function to clear any timer when the component is unmounted
  useEffect(() => {
    return () => {
      if (buttonTimeout.current !== null) {
        clearTimeout(buttonTimeout.current);
      }
    };
  }, []);

  return { handleIconButtonClick, handleVideoClick, showButton };
};

export default useButtonVisibility;
