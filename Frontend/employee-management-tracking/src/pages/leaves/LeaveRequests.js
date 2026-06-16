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
  Button,
} from "@mui/material";

function LeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchLeaves = async () => {
    try {
      setLoading(true);

      const res = await API.get("/leaves");
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

  const handleApprove = async (id) => {
    try {
      setActionLoading(id);

      await API.put(`/leaves/${id}/approve`);
      fetchLeaves();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setActionLoading(id);

      await API.put(`/leaves/${id}/reject`);
      fetchLeaves();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <DashboardLayout>
      <h2>Leave Requests</h2>

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
                <TableCell>Employee</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {leaves.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                    sx={{
                      py: 4,
                      color: "#6b7280",
                    }}
                  >
                    No leave requests found
                  </TableCell>
                </TableRow>
              ) : (
                leaves.map((leave) => (
                  <TableRow key={leave._id}>
                    <TableCell>{leave.employee?.name}</TableCell>

                    <TableCell>{leave.employee?.email}</TableCell>

                    <TableCell>{leave.leaveType}</TableCell>

                    <TableCell>
                      {new Date(leave.startDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      {new Date(leave.endDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>{leave.status}</TableCell>

                    <TableCell>
                      {leave.status === "Pending" && (
                        <>
                          <Button
                            size="small"
                            disabled={actionLoading === leave._id}
                            onClick={() => handleApprove(leave._id)}
                          >
                            {actionLoading === leave._id
                              ? "Processing..."
                              : "Approve"}
                          </Button>

                          <Button
                            size="small"
                            color="error"
                            disabled={actionLoading === leave._id}
                            onClick={() => handleReject(leave._id)}
                          >
                            {actionLoading === leave._id
                              ? "Processing..."
                              : "Reject"}
                          </Button>
                        </>
                      )}
                    </TableCell>
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

export default LeaveRequests;
