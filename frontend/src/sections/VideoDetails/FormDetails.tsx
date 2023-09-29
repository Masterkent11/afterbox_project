import React from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Delete as DeleteIcon } from "@mui/icons-material";

interface FormDetailsProps {
  videoId: string;
  handleDeleteVideoDetails: (videoName: string) => void;
  handleSave: () => void;
  handleEdit: () => void;
  handleBack: () => void;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditedEmail: React.Dispatch<React.SetStateAction<string[]>>;
  setEditedDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  isEditable: boolean;
  editedTitle: string;
  editedEmail: string[];
  editedDate: dayjs.Dayjs;
  videoSrc: string;
}

const FormDetails: React.FC<FormDetailsProps> = ({
  videoId,
  handleDeleteVideoDetails,
  handleSave,
  setIsEditable,
  setEditedTitle,
  setEditedEmail,
  setEditedDate,
  isEditable,
  editedTitle,
  editedEmail,
  editedDate,
}) => {
  return (
    <>
      <Grid
        item
        xl={4}
        lg={4}
        sm={12}
        xs={12}
        display={"flex"}
        gap={2}
        flexDirection={"column"}
        justifyContent={"space-around"}
        sx={{ order: { xs: 2, md: 2, lg: 0 } }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          gap={5}
          component="form"
          sx={{
            width: "100%",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="AfterBox Name"
            variant="outlined"
            value={editedTitle}
            disabled={!isEditable}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Recipient Email(s), comma separated"
            variant="outlined"
            value={editedEmail.join(",")}
            onChange={(e) =>
              setEditedEmail(
                e.target.value.split(",").map((email: string) => email)
              )
            }
            disabled={!isEditable}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Release Date"
                sx={{ width: "100%" }}
                value={editedDate}
                onChange={(e) => setEditedDate(dayjs(e))}
                disabled={!isEditable}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        {isEditable && (
          <Box display={"flex"} justifyContent={"center"} gap={4}>
            <Button
              sx={{ cursor: "pointer" }}
              onClick={() => {
                handleDeleteVideoDetails(videoId);
              }}
            >
              <DeleteIcon sx={{ color: "black", fontSize: "1.8rem" }} />
            </Button>

            <Button
              variant="outlined"
              sx={{
                color: "black",
                "&:hover": {
                  color: "black",
                  borderColor: "black",
                },
                borderColor: "black",
              }}
              onClick={() => setIsEditable(false)}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default FormDetails;
