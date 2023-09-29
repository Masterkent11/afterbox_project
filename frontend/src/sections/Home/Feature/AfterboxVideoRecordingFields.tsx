import React from "react";
import { Grid, Button, Stack } from "@mui/material";
import DateForm from "../../../common/dateForm/dateForm";
import EmailForm from "../../../common/emailForm/EmailForm";
import "react-multi-email/dist/style.css";

interface VideoRecordingFieldsProps {
  setDeliveryDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEmail: React.Dispatch<React.SetStateAction<string[]>>;
  recordWebcam: any;
  email: string[];
  deliveryDate: Date | null;
}

export const AfterboxVideoRecordingFields: React.FC<
  VideoRecordingFieldsProps
> = ({ setDeliveryDate, setEmail, recordWebcam, email, deliveryDate }) => (
  <Grid
    item
    lg={4}
    display={"flex"}
    alignItems={"center"}
    marginTop={{
      xs: "1rem",
    }}
  >
    {/* Fields */}
    <Stack
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      gap={5}
    >
      {/* Date Fields */}
      <Stack>
        <DateForm
          date={deliveryDate}
          setDate={setDeliveryDate}
        />
      </Stack>
      {/* Email Fields */}
      <Stack>
        <EmailForm
          email={email}
          setEmail={setEmail}
        />
      </Stack>

      {/* Submit Button */}
      <Stack>
        <Button
          variant="contained"
          disabled={recordWebcam.status !== "PREVIEW"}
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
          type="submit"
        >
          Send this video message for free
        </Button>
      </Stack>
    </Stack>
  </Grid>
);
