import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AppLogo from "../../assets/jpg/logo.jpg";
import { Navbar } from "components";
import axios from "axios";

const Logo = styled("img")({
  height: "40px",
  marginRight: "16px",
});

function Header() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      axios
        .get("http://localhost:4000/getUserData", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          localStorage.setItem("userType", response.data.type);
          localStorage.setItem("name", response.data.login);
          localStorage.setItem("profilePic", response.data.avatar_url);
          console.log(response.data, "getUserData api response");
        })
        .catch((error) => {
          console.log(error, "error from login get call");
        });
    };
    getUserData();
  }, [localStorage.getItem('accessToken')]);

  const handleLogoutConfirm = () => {
    console.log("handleLogoutConfirm");
    setOpenModal(false);
    localStorage.removeItem("userName");
    localStorage.removeItem("name");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("userType");
    localStorage.removeItem("profilePic");
    navigate("/login", { replace: true });
  };

  const handleOnClickAppTitle = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Logo
            onClick={handleOnClickAppTitle}
            src={AppLogo}
            alt="App Logo"
            sx={{ cursor: "pointer", flex: 1 }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer", flex: 1 }}
            onClick={handleOnClickAppTitle}
          >
            Company
          </Typography>
          <Box sx={{ flexBasis: "850px", textAlign: "center", flex: 16 }}>
            <Navbar />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Tooltip title="Logout">
              <IconButton color="inherit" onClick={() => setOpenModal(true)}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="confirm-logout-dialog-title"
      >
        <DialogTitle id="confirm-logout-dialog-title">
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ p: 2 }}>
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, textAlign: "center" }}>
          <Button variant="outlined" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Header;