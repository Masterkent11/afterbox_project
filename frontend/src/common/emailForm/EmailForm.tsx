import React from "react";
import { TextField } from "@mui/material";

interface EmailFormProps {
  email: string[];
  setEmail: React.Dispatch<React.SetStateAction<string[]>>;
}

const EmailForm: React.FC<EmailFormProps> = ({ email, setEmail }) => (
  <TextField
    id="outlined-basic"
    label="Recipient Email(s), comma separated"
    variant="outlined"
    value={email.join(",")}
    onChange={(e) =>
      setEmail(e.target.value.split(",").map((email) => email.trim()))
    }
  />
);

export default EmailForm;
