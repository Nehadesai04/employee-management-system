import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaves = async () => {
    try {
      setLoading(true);

      const res = await API.get("/leaves/my");
      setLeaves(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <DashboardLayout>
      <h2>My Leaves</h2>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {leaves.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                    sx={{
                      py: 4,
                      color: "#6b7280",
                    }}
                  >
                    No leave applications found
                  </TableCell>
                </TableRow>
              ) : (
                leaves.map((leave) => (
                  <TableRow key={leave._id}>
                    <TableCell>{leave.leaveType}</TableCell>

                    <TableCell>
                      {new Date(leave.startDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      {new Date(leave.endDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>{leave.reason}</TableCell>

                    <TableCell>{leave.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DashboardLayout>
  );
}

export default MyLeaves;
