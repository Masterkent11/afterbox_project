import React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DateFormProps {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const DateForm: React.FC<DateFormProps> = ({ date, setDate }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label="Delivery Date"
      sx={{ width: "100%" }}
      value={date}
      onChange={setDate}
    />
  </LocalizationProvider>
);

export default DateForm;
