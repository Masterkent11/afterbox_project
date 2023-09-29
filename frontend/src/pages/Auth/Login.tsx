import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

// custom styles for dividers
const CustomDivider = styled("div")(({ theme }) => ({
  borderLeft: "1px solid black",
  height: "80%",
  marginTop: "4.5rem",

  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

// custom styles for divider with text
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

const Login = () => {
  // single useState to handle all form data
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  // Checking fields validation
  const isFormValid = () => {
    return form.email.length > 0 && form.password.length > 0;
  };

  // Handle Submit
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://afterbox.io/api/auth/signin`, {
        email: form.email,
        password: form.password,
      });

      if (response.data) {
        const user = response.data;
        console.log(user, "Login Successfully");
        toast.success("Login Successfully");
        userContext?.setIsLoggedIn(true);
        userContext?.setToken(user.tokens.accessToken);
        const userId = user.user._id;

        userContext?.setFirstName(user.user.firstName);
        userContext?.setLastName(user.user.lastName);
        userContext?.setEmail(user.user.email);
        userContext?.setToken(user.token);

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", form.email);
        }

        // Store user ID
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", user.tokens.accessToken);

        // Navigate to home page
        navigate("/");
      } else {
        toast.error("Wrong Email or Password");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during login", { autoClose: 3000 });
    }
  };

  return (
    <Container maxWidth="md">
      <Typography
        component="h1"
        variant="h5"
        align="center"
        style={{ marginTop: "20px", marginBottom: "5px" }}
      >
        Login to
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 8,
            }}
          >
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{
                width: "100%",
                mt: 1,
              }}
              onSubmit={handleFormSubmit}
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
                autoFocus
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
              <Typography
                variant="body2"
                sx={{
                  fontStyle: "underline",
                  color: "blue",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/reset-password")}
              >
                Forgot Password
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <FormControlLabel
                    sx={{
                      mt: 3,
                      mb: 2,
                    }}
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                    }
                    label="Remember me"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!isFormValid()} // button will be disabled if form is not valid
                    // ... other props
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      mt: 3,
                      mb: 2,
                      "&:hover": {
                        backgroundColor: "black",
                      },
                    }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
              <DividerWithText>
                <Typography variant="body1">No Account?</Typography>
              </DividerWithText>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          marginTop={{ xl: "8", lg: "8", md: "5", sm: "1", xs: "1" }}
        >
          <CustomDivider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 8,
            }}
          >
            <Typography component="h2" variant="h5">
              Or
            </Typography>
            <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
              Continue with Google
            </Button>

            <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
              Continue with Facebook
            </Button>
            <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
              Continue with App
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
