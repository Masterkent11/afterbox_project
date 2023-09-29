import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ForgotPasswordFormState {
  email: string;
}

const Forgot_Password: React.FC = () => {
  const [form, setForm] = useState<ForgotPasswordFormState>({ email: "" });

  // Navigate
  const navigate = useNavigate();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ email: event.target.value });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Modify the endpoint and request body according to your backend API
      const response = await axios.post(
        "http://localhost:4000/forgot-password",
        {
          email: form.email,
        }
      );

      console.log("Success", response.data);
      alert("Reset password link has been sent to your email");

      // Navigate and pass state
      navigate("/reset-confirmation", { state: { email: form.email } });
    } catch (err) {
      console.error(err);
      alert("Error in sending reset password link");
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
        <IconButton
          onClick={() => navigate(-1)} // go back to the previous page
          sx={{
            position: "absolute",
            left: 10,
            top: 10,
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer", fontWeight: "bolder" }}
        >
          {"afterb"}
          <ArrowRightIcon
            sx={{
              fontSize: "2.5rem",
              verticalAlign: "middle",
              marginLeft: "-0.38em",
              marginRight: "-0.38em",
            }}
          />
          {"x"}
        </Typography>

        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={{ marginTop: "20px" }}
        >
          Forgot Password
        </Typography>
        <Typography
          component="h1"
          variant="body2"
          align="left"
          // style={{ marginTop: "20px", marginBottom: "5px" }}
        >
          Enter your email address and we'll send you an email to reset your
          password
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleFormSubmit}
          sx={{
            width: "100%",
            mt: 1,
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={handleInputChange}
          />
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
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Forgot_Password;
