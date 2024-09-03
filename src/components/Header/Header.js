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
  useTheme,
  useMediaQuery
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AppLogo from "../../assets/jpg/logo.jpg";
import { Navbar } from "components";
import axios from "axios";

const Logo = styled("img")({
  height: "25px",
  marginRight: "16px",
});

function Header() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

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
          localStorage.setItem('userType', response.data.type);
          localStorage.setItem('name', response.data.login);
          localStorage.setItem('profilePic', response.data.avatar_url);
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

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              margin: theme.spacing(1) 
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{flex:3, textAlign: isMobile ? 'center' : 'left', pl: isMobile ? '20px':'16px', minWidth: isMobile ? '115px' : 'none'}}>
          <Box sx={{display:'inline-block',verticalAlign:'middle', maxWidth:'30px'}}>
            <Logo
              onClick={handleOnClickAppTitle}
              src={AppLogo}
              alt="App Logo"
              sx={{display:'inline-block',verticalAlign:'middle',cursor:'pointer', m:0}}
            />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{display:'inline-block',verticalAlign:'middle',cursor:'pointer', fontSize: isMobile ? '14px' : '16px', pl:1 }}
            onClick={handleOnClickAppTitle}
          >
            Company
          </Typography>

        </Box>
          <Box sx={{ pr:'7rem', textAlign: "center", flex: 20 }}>
            <Navbar drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
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