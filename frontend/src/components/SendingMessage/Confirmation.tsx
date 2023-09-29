import { Container, Box, Typography, Button } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useNavigate } from "react-router-dom";

function ConfirmationMessage() {
  const navigate = useNavigate();
  const email = "xxxemail.com"; // replace with your actual email variable

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100vh",
          gap: 2,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer", fontWeight: "bolder", mt: 2 }}
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
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            flex: 1,
            p: 2,
            position: "relative", // added relative positioning for the box
          }}
        >
          <MailOutlineIcon
            sx={{
              position: "absolute",
              left: 0,
              top: "35%",
              color: "#dbc300",
              fontSize: "2rem",
            }}
          />
          <MailOutlineIcon
            sx={{
              position: "absolute",
              right: 0,
              bottom: "65%",
              color: "#dbc300",
              fontSize: "4rem",
            }}
          />
          <Typography variant="h5" component="h2" align="center">
            Afterbox Staged
          </Typography>
          <Typography variant="body1" component="p" align="center">
            Your Afterbox is ready to be sent to {email}
          </Typography>
          <Typography variant="body1" component="p" align="center">
            An email confirmation has been sent to you with details
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              /* navigate to another page */
            }}
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ConfirmationMessage;
