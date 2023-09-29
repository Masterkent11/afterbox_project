import React, { useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  Popover,
  IconButton,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { getInitials } from "../../utils/get-utils";
const Navbar = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn, setToken, firstName, lastName } =
    userContext;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleLogoutClick = () => {
    // Remove user ID and token from localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    localStorage.removeItem("userBoxId");

    // Reset context state
    setIsLoggedIn(false);
    setToken(null);

    // Optionally navigate to login page
    navigate("/login");
  };

  return (
    <Box>
      <Grid container display="flex" justifyContent="space-between">
        <Grid>
          <Typography
            variant="h5"
            sx={{ gap: "1rem", marginLeft: "3rem", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            AfterBox
          </Typography>
        </Grid>
        <Grid
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{ gap: "1rem", marginRight: "3rem" }}
        >
          {isLoggedIn ? (
            <IconButton
              onClick={handlePopoverOpen}
              aria-controls="avatar-popover"
              aria-haspopup="true"
              color="inherit"
            >
              <Avatar
                sx={{
                  padding: "0.3rem",
                  height: 32,
                  width: 32,
                }}
              >
                {getInitials(firstName || "", lastName || "")}
              </Avatar>
            </IconButton>
          ) : (
            <>
              <Typography
                variant="body2"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Typography>
              <Typography
                variant="body2"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                SignUp
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ p: 2 }}>
          {/* <Typography sx={{ mb: 1, cursor: "pointer" }}>My profile</Typography> */}
          {/* <Typography
            sx={{ mb: 1, cursor: "pointer" }}
            onClick={() => navigate("/afterbox-library")}
          >
            Afterbox Library
          </Typography> */}
          <Typography
            variant="body2"
            onClick={handleLogoutClick}
            sx={{ cursor: "pointer", color: "black" }}
          >
            Sign Out
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
};

export default Navbar;
