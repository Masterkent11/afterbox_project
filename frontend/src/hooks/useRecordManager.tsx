// hooks/useRecordManager.ts
import { useState, useEffect } from "react";
import { useRecordWebcam } from "react-record-webcam";
import useVideoPlayback from "./useVideoPlayback";

const OPTIONS = {
  fileName: "test-filename",
  mimeType: "video/x-matroska;codecs=avc1",
  width: 1920,
  height: 1080,
  disableLogs: true,
} as const;

const useRecordManager = () => {
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const recordWebcam = useRecordWebcam(OPTIONS);
  const videoPlayback = useVideoPlayback();

  // Record
  const getRecordingFile = async () => {
    const blob = recordWebcam.getRecording();
    return blob;
  };

  // Open the camera once after the initial render
  useEffect(() => {
    recordWebcam.open();
  }, []);

  return {
    ...videoPlayback,
    getRecordingFile,
    recordWebcam,
    setIsFrontCamera,
    isFrontCamera,
  };
};

export default useRecordManager;
