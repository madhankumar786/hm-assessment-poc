import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Info as dashboard,
  ContactMail as ContactMailIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { rolesConfig } from "utils";
import { hover } from "@testing-library/user-event/dist/hover";

const Navbar = ({ userData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const menus = rolesConfig[localStorage.getItem("userType")].canAccess;
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
    handleMobileMenuClose();
  };

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleMobileMenuOpen}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={mobileMenuOpen}
            onClose={handleMobileMenuClose}
            sx={{
              width: "100%",
            }}
          >
            <MenuItem onClick={() => handleNavigation("dashboard")}>
              <item sx={{ mr: 1 }} /> Dashboard
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("about")}>
              {/* <InfoIcon sx={{ mr: 1 }} /> */}
              About
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("contact")}>
              <ContactMailIcon sx={{ mr: 1 }} /> Contact
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleMobileMenuClose}
              >
                <CloseIcon />
              </IconButton>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <>
          {menus?.map((item) => {
            return (
              <MenuItem
                sx={{
                  display: "inline-block",
                  borderBottom: isActive(`/${item.toLowerCase()}`)
                    ? "2px solid white"
                    : "2px solid transparent",
                  color: isActive(`/${item.toLowerCase()}`)
                    ? "white"
                    : "inherit",
                  '&:hover':{
                      backgroundColor: isActive(`/${item.toLowerCase()}`)?  '#ececec' : '#cde9fa',
                      color: isActive(`/${item.toLowerCase()}`) ? 'white' : '#19762d'
                  },
                  transition:'0.5s ease',
                  cursor:'pointer'
                }}
                onClick={() => handleNavigation(item)}
              >
                <Typography sx={{ textTransform: "capitalize" }}>
                  {item}
                </Typography>
              </MenuItem>
            );
          })}
        </>
      )}
    </>
  );
};

export default Navbar;
