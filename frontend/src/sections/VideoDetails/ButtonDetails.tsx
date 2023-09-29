import React from "react";
import { Stack, Button, Box } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

interface ButtonDetailsProps {
  handleEdit: () => void;
  handleBack: () => void;
  isEditable: boolean;
}

const ButtonDetails: React.FC<ButtonDetailsProps> = ({
  handleEdit,
  handleBack,
  isEditable,
}) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      marginTop={{
        sm: "1rem",
        xs: "1rem",
      }}
    >
      {/* Back Icon */}
      <Stack sx={{ marginLeft: "3rem" }}>
        <Button
          onClick={handleBack}
          sx={{
            width: "5rem",
            color: "black",
            borderColor: "black",
            "&:hover": {
              borderColor: "black",
            },
          }}
          startIcon={<ArrowBackIcon />}
          // disabled={isEditable}
        >
          back
        </Button>
      </Stack>
      {/* Edit Icon */}
      <Stack
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignSelf: "end",
          flexDirection: "column",

          marginRight: "3rem",
        }}
      >
        <Button
          onClick={handleEdit}
          sx={{
            width: "5rem",
            color: "black",
            borderColor: "black",
            "&:hover": {
              borderColor: "black",
            },
          }}
          variant="outlined"
          endIcon={<EditIcon />}
          disabled={isEditable}
        >
          Edit
        </Button>
      </Stack>
    </Box>
  );
};

export default ButtonDetails;
