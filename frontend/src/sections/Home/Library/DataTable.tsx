import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import { convertToMMDDYY } from "../../../utils/dateUtils";

interface Video {
  name: string;
  deliveryDate: string;
  _id: string;
  video: any;
}

interface RowData {
  name: string;
  date: string;
}

interface DataTableProps {
  rows: RowData[];
  videos: Video[];
  handleVideoClick: (videoName: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({ videos, handleVideoClick }) => {
  return (
    <React.Fragment>
      <h1 style={{ marginTop: "50px" }}>Table</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                Names
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videos.map((video: Video) => {
              const formattedDeliveredDate = video.deliveryDate
                ? convertToMMDDYY(video.deliveryDate)
                : undefined;
              return (
                <TableRow
                  key={video._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "1rem",
                        cursor: "pointer",
                      }}
                      onClick={() => handleVideoClick(video.name)}
                    >
                      <video style={{ width: "4rem" }} src={video.video} />
                      {video.name}
                    </Stack>
                  </TableCell>
                  <TableCell>{formattedDeliveredDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default DataTable;
