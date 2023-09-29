// hooks/useCamera.ts
import { useEffect } from "react";

const useCamera = (isFrontCamera: boolean) => {
  // Camera Flip
  const handleCameraFlip = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: isFrontCamera ? "user" : "environment" },
      })
      .then((stream) => {
        const video = document.querySelector("video");
        if (video) {
          video.srcObject = stream;
        }
      })
      .catch((err) => {
        console.log("An error occurred: " + err);
      });
  };

  useEffect(() => {
    handleCameraFlip();
  }, [isFrontCamera]);

  return { handleCameraFlip };
};

export default useCamera;
