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
  MenuItem,
} from "@mui/material";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      await API.post("/auth/register", formData);

      toast.success("Registration Successful");

      navigate("/");
    } catch (error) {
      toast.error("Registration Failed");
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
              Join WorkSphere
            </Typography>

            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                opacity: 0.9,
                maxWidth: 400,
              }}
            >
              Create your account and start managing employees, attendance,
              payroll, and performance all in one place.
            </Typography>

            <Box
              component="img"
              src={LoginImage}
              alt="register"
              sx={{
                width: 320,
                mt: 5,
              }}
            />
          </Box>

          {/* Right Side */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#fff",
              p: 4,
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
                Create Account 🚀
              </Typography>

              <Typography color="text.secondary" sx={{ mb: 4 }}>
                Fill in your details to get started.
              </Typography>

              <TextField
                fullWidth
                margin="normal"
                label="Full Name"
                name="name"
                value={formData.name}
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

              {/* <TextField
                select
                fullWidth
                margin="normal"
                label="Select Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              >
                <MenuItem value="employee">👨‍💼 Employee</MenuItem>

                <MenuItem value="manager">👨‍💻 Manager</MenuItem>

                <MenuItem value="admin">🛡️ Admin</MenuItem>
              </TextField> */}

              <Button
                disabled={loading}
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  py: 1.6,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  boxShadow: "0 8px 20px rgba(79,70,229,0.3)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 25px rgba(79,70,229,0.4)",
                  },
                }}
                onClick={handleRegister}
              >
                {loading ? "Craeting Account..." : "Create Account"}{" "}
              </Button>

              <Typography textAlign="center" sx={{ mt: 3 }}>
                Already have an account?{" "}
                <Link
                  to="/"
                  style={{
                    color: "#4f46e5",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Register;
