import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import { toast } from "react-toastify";


import {
  Box,
  TextField,
  Button,
  MenuItem,
  Paper,
} from "@mui/material";

function ApplyLeave() {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
          setLoading(true);

      await API.post("/leaves", formData);

      toast.success("Leave Applied Successfully");


      setFormData({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to apply leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Paper sx={{ p: 3 }}>
        <h2>Apply Leave</h2>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 500,
          }}
        >
          <TextField
            select
            label="Leave Type"
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
          >
            <MenuItem value="Sick Leave">
              Sick Leave
            </MenuItem>

            <MenuItem value="Casual Leave">
              Casual Leave
            </MenuItem>

            <MenuItem value="Vacation">
              Vacation
            </MenuItem>
          </TextField>

          <TextField
            type="date"
            name="startDate"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={formData.startDate}
            onChange={handleChange}
          />

          <TextField
            type="date"
            name="endDate"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            value={formData.endDate}
            onChange={handleChange}
          />

          <TextField
            multiline
            rows={4}
            label="Reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
          >
                {loading ? "Submitting Leave..." : "Submit Leave"}{" "}
          </Button>
        </Box>
      </Paper>
    </DashboardLayout>
  );
}

export default ApplyLeave;