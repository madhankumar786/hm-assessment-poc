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
import PersonIcon from "@mui/icons-material/Person";
import { Navbar } from "components";

const Logo = styled("img")({
  height: "40px",
  marginRight: "16px",
});

function Header({ getUserData, userData }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // getUserData()
    async function getUserData() {
      await fetch("http://localhost:4000/getUserData", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("name", data.login);
          localStorage.setItem("profilePic", data.avatar_url);
          console.log(data);
        })
        .catch((error) => console.log(error, "error from getUserData api"));
    }
    getUserData();
  }, []);

  const handleLogoutConfirm = () => {
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
            sx={{ cursor: "pointer" }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={handleOnClickAppTitle}
          >
            Company
          </Typography>
          <Box sx={{ flexBasis:'850px', textAlign:'center' }}>
            <Navbar userData={userData} />
          </Box>
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={() => setOpenModal(true)}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
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
