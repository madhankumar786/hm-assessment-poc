import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  Box,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";
import logo from "../../assets/jpg/logo.jpg";
import backgroundImage from "../../assets/jpg/loginbg.jpg";
import { useAuthenticateUser } from "hooks";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = ({ handleLoginWithGithub }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const handleSuccess = (user) => {
    localStorage.setItem("userType", user.userType);
    localStorage.setItem("email", user.email);
    localStorage.setItem("userName", user.name);
    navigate("/dashboard");
    setSnackbarMessage("Logged in Successfully!");
    setOpenSnackbar(true);
  };

  const handleError = (error) => {
    setSnackbarMessage(error.message);
    setOpenSnackbar(true);
  };

  const { mutate: authenticateUser } = useAuthenticateUser(
    handleSuccess,
    handleError
  );

  const onSubmit = (data) => {
    console.log(data);
    authenticateUser(data);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          opacity: "0.9",
          borderRadius: 2,
          py: 3,
          px: isMobile ? 1 : 2,
          boxShadow: 3,
          width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Company Logo"
          sx={{
            width: "65px",
            height: "65px",
            display: "block",
            margin: "0 auto",
            mb: 2,
          }}
        />
        <Typography variant="h6" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
            sx={{ p: 0 }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                placeholder="Enter your email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                size="small"
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "0.875rem",
                  },
                  p: 0,
                }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value: /(?=.*\d)(?=.*[!@#$%^&*])/,
                message:
                  "Password must include at least one digit and one special character",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                margin="normal"
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                size="small"
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "0.875rem",
                  },
                }}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
            startIcon={<GitHubIcon />}
            onClick={handleLoginWithGithub}
          >
            Login with GitHub
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don’t have an account?{" "}
            <Link to="/signup" underline="hover">
              Create one
            </Link>
          </Typography>
        </form>
        <Snackbar
          open={openSnackbar}
          anchorOrigin={{vertical:'top', horizontal:'center'}}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="error">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default LoginPage;
