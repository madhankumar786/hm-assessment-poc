import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAddUser } from "hooks/useAddUser";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
  Box,
  Link,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
 
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  AccountCircle as AccountCircleIcon,
  Lock,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; 
import signupBg from "../../assets/jpg/signup3.jpg";

const Signup = () => {
  const [openModal, setOpenModal] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      userType: "",
    },
    mode: "onBlur",
  });

  const handleSuccess = (data) => {
    setOpenModal(true)
    console.log('User added successfully:', data);
  };
  
  const handleConfirmation = () => {
    navigate('/'); 
  }
 
  const handleError = (error) => {
    console.error('Error adding user:', error);
  };

  const navigate = useNavigate();
  const { mutate: addUser, isLoading, isError, isSuccess, error } = useAddUser(handleSuccess,handleError);

  
  const onSubmit = (data) => {
    addUser(data);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${signupBg})`,
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
          borderRadius: 2,
          opacity: "0.9",
          padding: 4,
          boxShadow: 3,
          width: { xs: "90%", sm: "80%", md: "60%", lg: "30%" },
          maxWidth: "500px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <Link
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Typography variant="body1" sx={{ ml: 1, fontSize: "0.75rem" }}>
            &lt; Back
          </Typography>
        </Link>
        <Typography variant="h6" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Name must only contain characters",
              },
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters long",
              },
              maxLength: {
                value: 50,
                message: "Name must be at most 50 characters long",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                placeholder="Enter your name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
                size="small"
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "0.875rem", 
                  },
                }}
              />
            )}
          />
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
                }}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Phone number must be 10 digits",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Phone"
                variant="outlined"
                margin="normal"
                placeholder="Enter your phone number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ""}
                size="small"
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "0.875rem", 
                  },
                }}
              />
            )}
          />
          {/* password field new */}
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              pattern: {
                value: /(?=.*\d)(?=.*[!@#$%^&*])/,
                message: "Password must include at least 1 digit and 1 special character ",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock fontSize="small" />
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
          {/* password field new */}
         
          <Controller
            name="userType"
            control={control}
            rules={{ required: "User Type is required" }}
            render={({ field }) => (
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>User Type</InputLabel>
                <Select
                  {...field}
                  label="User Type"
                  size="small"
                  sx={{ textAlign: "left" }}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircleIcon fontSize="small" />
                    </InputAdornment>
                  }
                  error={!!errors.userType}
                >
                  <MenuItem value="Internal">Internal</MenuItem>
                  <MenuItem value="External">External</MenuItem>
                </Select>
                {errors.userType && (
                  <Typography
                    sx={{
                      fontSize: "0.75rem", 
                      textAlign: "left",
                      fontWeight: 400,
                      marginTop: "4px",
                      marginRight: "14px",
                      marginBottom: "0",
                      marginLeft: "14px",
                    }}
                    color="error"
                  >
                    {errors.userType.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6} sx={{ px: 2 }}>
              <Button type="submit" fullWidth variant="contained" size="small">
                Register
              </Button>
            </Grid>
            <Grid item xs={6} sx={{ px: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={() => reset()}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already a partner?{" "}
            <Link href="/" underline="hover">
              Click here to login
            </Link>
          </Typography>
        </form>
      </Box>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="confirm-logout-dialog-title"
      >
        <DialogTitle id="confirm-logout-dialog-title">
          Signup status
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ p: 2 }}>
            Signup is successful !
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, textAlign: "center" }}>
          <Button onClick={handleConfirmation} variant="contained">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Signup;
