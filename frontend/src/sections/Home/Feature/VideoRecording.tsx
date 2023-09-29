import { Box } from "@mui/material";
// import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import { Typography } from "@mui/material";

interface VideoRecordingProps {
  countdown: number | null;
  // handleCameraFlip: () => void;
  timer: number;
  recordWebcam: any; // Change the type to the appropriate type of 'recordWebcam'
}

export const VideoRecording: React.FC<VideoRecordingProps> = ({
  countdown,
  // handleCameraFlip,
  timer,
  recordWebcam,
}) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      remainingSeconds.toString().padStart(2, "0"),
    ].join(":");
  };

  return (
    <Box position="relative" sx={{ display: "flex", justifyContent: "center" }}>
      <video
        ref={recordWebcam.webcamRef}
        style={{
          display: `${
            recordWebcam.status === "OPEN" ||
            recordWebcam.status === "RECORDING"
              ? "block"
              : "none"
          }`,
          width: "100%",
        }}
        autoPlay
        muted
      />
      {/* {recordWebcam.status !== "PREVIEW" && (
        <IconButton
          aria-label="zoom-in"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "white",
          }}
          onClick={handleCameraFlip}
        >
          <CameraswitchIcon />
        </IconButton>
      )} */}
      {countdown !== null && countdown > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "darkRed",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            height: "120px",
            width: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            fontSize: "5em",
          }}
        >
          {countdown}
        </Box>
      )}

      {recordWebcam.status === "RECORDING" && (
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1">Afterbox recording:</Typography>
            <Typography
              variant="body1"
              style={{
                color: "rgba(255, 0, 0, 0.9)",
                textShadow: "2px 2px 4px rgba(0, 0, 0.5, 0.6)",
              }}
            >
              {formatTime(timer)}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default VideoRecording;
