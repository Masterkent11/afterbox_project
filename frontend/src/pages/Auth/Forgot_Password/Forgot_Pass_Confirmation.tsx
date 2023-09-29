import React from "react";
import { Button, Typography, Container, Box, Divider } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
interface ForgotPasswordConfirmationProps {
  email: string;
}

const Forgot_Pass_Confirmation: React.FC = () => {
  // Navigate

  const location = useLocation();
  const state = location.state as ForgotPasswordConfirmationProps;

  const email = state.email; // Here we get the email passed from Forgot_Password

  const handleResendEmail = async () => {
    try {
      // Get user data
      const response = await axios.get("http://localhost:4000/users", {
        params: { email: email },
      });

      if (response.data.length === 0) {
        alert("User not found");
        return;
      }

      console.log(`Email would be sent to ${email}`);
      alert(`Reset password link would be resent to your email: ${email}`);
    } catch (err) {
      console.error(err);
      alert("Error occurred");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={{ marginTop: "20px" }}
        >
          Forgot your Password
        </Typography>
        <Typography
          component="h2"
          variant="body2"
          align="center"
          style={{ marginTop: "20px", marginBottom: "5px" }}
        >
          An email has been sent to {email}
        </Typography>
        <Typography
          component="h2"
          variant="body2"
          align="center"
          style={{ marginTop: "20px", marginBottom: "5px" }}
        >
          Please follow the instructions in the email to reset your password
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            mt: 3,
            mb: 2,
          }}
        >
          <Divider flexItem sx={{ flexGrow: 1 }} />
          <Typography sx={{ mx: 2 }} variant="body2">
            OR
          </Typography>
          <Divider flexItem sx={{ flexGrow: 1 }} />
        </Box>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            mt: 3,
            mb: 2,
            "&:hover": {
              backgroundColor: "black",
            },
          }}
          onClick={handleResendEmail}
        >
          Resend Email
        </Button>
      </Box>
    </Container>
  );
};

export default Forgot_Pass_Confirmation;
