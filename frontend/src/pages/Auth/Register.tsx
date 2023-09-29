import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Grid,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { VideoRecordingContext } from "../../context/VideoRecordingContext";

//  Divider with text
const DividerWithText = styled("div")({
  display: "flex",
  alignItems: "center",
  color: "#000",
  "&::before": {
    content: '""',
    flex: 1,
    borderBottom: "1px solid #000",
    marginRight: "0.5rem",
  },
  "&::after": {
    content: '""',
    flex: 1,
    borderBottom: "1px solid #000",
    marginLeft: "0.5rem",
  },
});
interface ExtendedUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  videoData?: FormData; // Add this property for video data
}

const Register = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const isLoggedIn = userContext.isLoggedIn;

  // single useState to handle all form data
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Get the VideoRecordingContext
  const videoRecordingContext = useContext(VideoRecordingContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // handler for input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));
  };

  // Check if there's a "pendingVideo" in localStorage
  // const pendingVideoJson = localStorage.getItem("pendingVideo");
  // if (pendingVideoJson) {
  //   // Parse the JSON and recreate the FormData object
  //   const pendingVideoFormData = new FormData();
  //   const pendingVideoData = JSON.parse(pendingVideoJson);
  //   for (const key in pendingVideoData) {
  //     if (Object.prototype.hasOwnProperty.call(pendingVideoData, key)) {
  //       pendingVideoFormData.append(key, pendingVideoData[key]);
  //     }
  //   }

  //   // Now you have the FormData object and can submit it
  //   try {
  //     // Submit pendingVideoFormData here as needed

  //     // Remove the "pendingVideo" from localStorage after submission
  //     localStorage.removeItem("pendingVideo");
  //   } catch (error) {
  //     console.error("Error in submitting pending video:", error);
  //   }
  // }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password does not match with confirm password");
      return;
    }

    const user: ExtendedUser = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
    };

    const pendingVideoJson = localStorage.getItem("pendingVideo");

    try {
      const response = await axios.post(
        "https://afterbox.io/api/auth/signup",
        user
      );

      const statusCode = response.status;
      switch (statusCode) {
        case 201: {
          const newUser = response.data;
          userContext?.setIsLoggedIn(true);
          userContext.setToken(newUser.tokens.accessToken);
          userContext.setFirstName(newUser.user.firstName);
          userContext.setLastName(newUser.user.lastName);
          userContext.setEmail(newUser.user.email);

          toast.success("Login Successfully");

          const newUserId = newUser.user._id;
          console.log(newUserId, "this is the user ID");

          if (pendingVideoJson && isLoggedIn) {
            const token = localStorage.getItem("token");
            try {
              // Send the pending video data to the server here
              const videoResponse = await axios.post(
                "https://afterbox.io/api/boxes",
                JSON.parse(pendingVideoJson),
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              // Handle the video submission response as needed
              if (videoResponse.status === 200) {
                // Video submission was successful
                // You can perform any additional actions here
              }
            } catch (error) {
              console.error("Error submitting pending video:", error);
            }
          }

          videoRecordingContext.updatePendingVideos(newUserId);

          // Store user ID
          localStorage.setItem("userId", newUserId);
          localStorage.setItem("token", newUser.tokens.accessToken);

          // Navigate to the home page
          navigate("/");
          break;
        }
        case 400:
          toast.error("Bad Request");
          break;
        case 401:
          toast.error("Unauthorized");
          break;
        default:
          toast.error("An error occurred", { autoClose: 3000 });
          break;
      }
    } catch (err) {
      console.error("Error during registration:", err);
      // You can display a user-friendly error message here
      toast.error("An error occurred during registration", { autoClose: 3000 });
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
          style={{ marginTop: "20px", marginBottom: "5px" }}
        >
          Sign Up With
        </Typography>
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
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="name"
            autoFocus
            value={form.firstName}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="name"
            autoFocus
            value={form.lastName}
            onChange={handleInputChange}
          />
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Re-type Password"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Grid container>
            <Grid
              item
              xs={6}
            >
              <FormControlLabel
                sx={{
                  mt: 3,
                  mb: 2,
                }}
                control={
                  <Checkbox
                    value={setIsChecked}
                    color="primary"
                    onChange={() => setIsChecked(!isChecked)}
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to Afterbox's{" "}
                    <Link
                      href="#"
                      color="primary"
                      underline="hover"
                      style={{ cursor: "pointer" }}
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      color="primary"
                      underline="hover"
                      style={{ cursor: "pointer" }}
                    >
                      Terms of Conditions
                    </Link>
                  </Typography>
                }
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
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
                disabled={!isChecked}
              >
                Create account
              </Button>
            </Grid>
          </Grid>
          <DividerWithText>
            <Typography variant="body1">Have an Account?</Typography>
          </DividerWithText>
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
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
