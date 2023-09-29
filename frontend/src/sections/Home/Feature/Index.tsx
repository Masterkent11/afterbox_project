import React from "react";
import { Grid, Stack, Typography, Container, Card } from "@mui/material";
import "../../../App.css";
import { VideoPreview } from "./VideoPreview";
import { VideoRecording } from "./VideoRecording";
import { AfterboxVideoRecordingFields } from "./AfterboxVideoRecordingFields";
import { RecordingButtons } from "./RecordingButtons";
import { PreviewButtons } from "./PreviewButtons";

interface FeatureProps {
  handleIconButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  // handleCameraFlip: () => void;
  handleVideoClick: () => void;
  handleVideoPlayPause: () => void;
  handleStart: () => void;
  handleStopRecording: () => void;
  handleNext: () => void;
  recordingActive: boolean;
  handleRetake: () => void;
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setDeliveryDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEmail: React.Dispatch<React.SetStateAction<string[]>>;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  videoPlaying: boolean;
  recordWebcam: any;
  timer: number;
  countdown: number | null;
  showButton: boolean;
  email: string[];
  deliveryDate: Date | null;
}

export const Index: React.FC<FeatureProps> = ({
  handleIconButtonClick,
  // handleCameraFlip,
  handleVideoClick,
  handleStart,
  handleStopRecording,
  handleFormSubmit,
  setDeliveryDate,
  setEmail,
  videoPlaying,
  recordWebcam,
  timer,
  countdown,
  showButton,
  handleRetake,
  deliveryDate,
  email,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <Container
        sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}
      >
        <Grid container sx={{ padding: "1rem" }}>
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="demo-section"
          >
            <Card
              sx={{
                margin: "2rem 0",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",

                gap: "1rem",
                border: "none",
                boxShadow: "none",
              }}
            >
              {/* <Typography variant="h4">AfterBox</Typography> */}

              <Grid container>
                <Grid item lg={11}>
                  <Typography variant="h4">
                    Send a video message in the future
                  </Typography>
                </Grid>
              </Grid>
            </Card>
            {/* <p>Camera status: {recordWebcam.status}</p> */}
            <Grid container display={"flex"} justifyContent={"center"}>
              <Grid
                item
                xl={recordWebcam.status === "RECORDING" ? 12 : 8}
                lg={recordWebcam.status === "RECORDING" ? 12 : 8}
                md={recordWebcam.status === "RECORDING" ? 12 : 8}
                sm={recordWebcam.status === "RECORDING" ? 12 : 12}
                xs={recordWebcam.status === "RECORDING" ? 12 : 12}
                display={recordWebcam.status === "RECORDING" ? "flex" : "flex"}
                flexDirection={
                  recordWebcam.status === "RECORDING" ? "column" : "column"
                }
                justifyContent={
                  recordWebcam.status === "RECORDING" ? "center" : "center"
                }
                alignItems={
                  recordWebcam.status === "RECORDING" ? "center" : "center"
                }
              >
                <Stack>
                  <VideoRecording
                    countdown={countdown}
                    // handleCameraFlip={handleCameraFlip}
                    timer={timer}
                    recordWebcam={recordWebcam}
                  />

                  <VideoPreview
                    videoPlaying={videoPlaying}
                    handleIconButtonClick={handleIconButtonClick}
                    handleVideoClick={handleVideoClick}
                    showButton={showButton}
                    recordWebcam={recordWebcam}
                    handleRetake={handleRetake}
                  />
                </Stack>

                <RecordingButtons
                  handleStart={handleStart}
                  handleStopRecording={handleStopRecording}
                  recordWebcam={recordWebcam}
                />

                <PreviewButtons
                  recordWebcam={recordWebcam}
                  handleRetake={handleRetake}
                />
              </Grid>

              {recordWebcam.status !== "RECORDING" && (
                <AfterboxVideoRecordingFields
                  email={email}
                  deliveryDate={deliveryDate}
                  setDeliveryDate={setDeliveryDate}
                  setEmail={setEmail}
                  recordWebcam={recordWebcam}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};

export default Index;
