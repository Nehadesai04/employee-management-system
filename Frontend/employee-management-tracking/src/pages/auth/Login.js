import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import LoginImage from "../../assets/image1.png";
import { toast } from "react-toastify";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;

      if (role === "employee") {
        navigate("/employee/EmployeeDashboard");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        <Paper
          elevation={10}
          sx={{
            overflow: "hidden",
            borderRadius: 5,
            display: "flex",
            minHeight: { xs: "auto", md: "650px" },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left Side */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 6,
              background: "linear-gradient(135deg, #5542D9, #7c3aed)",
              color: "white",
            }}
          >
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              WorkSphere
            </Typography>

            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                opacity: 0.9,
                maxWidth: 400,
              }}
            >
              Smart Employee Management System for Workforce, Attendance,
              Payroll, and Team Collaboration.
            </Typography>

            <Box
              component="img"
              src={LoginImage}
              alt="team"
              sx={{
                width: 300,
                mt: 5,
              }}
            />
          </Box>

          {/* Right Side */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: {
                xs: 3,
                sm: 4,
              },
              bgcolor: "#fff",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: {
                  xs: "100%",
                  sm: 400,
                },
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{
                  fontSize: {
                    xs: "2rem",
                    md: "2.5rem",
                  },
                }}
              >
                Welcome Back 👋
              </Typography>

              <Typography color="text.secondary" sx={{ mb: 4 }}>
                Sign in to continue managing your workforce.
              </Typography>

              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />

              <Button
                disabled={loading}
                fullWidth
                variant="contained"
                size="large"
                onClick={handleLogin}
                sx={{
                  mt: 3,
                  py: 1.6,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  boxShadow: "0 8px 20px rgba(79,70,229,0.3)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 25px rgba(79,70,229,0.4)",
                  },
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Typography textAlign="center" sx={{ mt: 3 }}>
                Don't have an account?{" "}
                <Link
                  to="/auth/Register"
                  style={{
                    color: "#4f46e5",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Register
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
