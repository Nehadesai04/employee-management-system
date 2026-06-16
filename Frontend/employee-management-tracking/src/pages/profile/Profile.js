import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import  { useState, useEffect } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

import {
  Button,
  TextField,
  Paper,
  Box,
  Typography,
  Avatar,
} from "@mui/material";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await API.get("/auth/me");

      setUser(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
    } catch (error) {
      toast.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const res = await API.put("/auth/profile", {
        name,
      });

      setUser(res.data);

      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <DashboardLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 600,
            p: 4,
            borderRadius: 4,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Avatar
              sx={{
                width: 90,
                height: 90,
                fontSize: "2rem",
                fontWeight: "bold",
                background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}{" "}
            </Avatar>

            <Typography variant="h5" fontWeight="bold" mt={2}>
              My Profile
            </Typography>

            <Typography color="text.secondary">
              Manage your personal information
            </Typography>
          </Box>

          {/* User Info */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />

            <TextField label="Email Address" value={email} fullWidth disabled />

            <TextField
              label="Role"
              value={user?.role || ""}
              fullWidth
              disabled
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleUpdateProfile}
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
              }}
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </DashboardLayout>
  );
}

export default Profile;
