import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Box, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Home as HomeIcon, Info as InfoIcon, ContactMail as ContactMailIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({userData}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 

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
              
                sx= {{
                  width: '100%',
                }}
            
            >
              <MenuItem onClick={() => handleNavigation('/dashboard')}>
                <HomeIcon sx={{ mr: 1 }} /> Dashboard
              </MenuItem>
              <MenuItem onClick={() => handleNavigation('/about')}>
                <InfoIcon sx={{ mr: 1 }} /> About
              </MenuItem>
              <MenuItem onClick={() => handleNavigation('/contact')}>
                <ContactMailIcon sx={{ mr: 1 }} /> Contact
              </MenuItem>
              <MenuItem onClick={handleMobileMenuClose}>
                <IconButton edge="end" color="inherit" onClick={handleMobileMenuClose}>
                  <CloseIcon />
                </IconButton>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => handleNavigation('/dashboard')}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={() => handleNavigation('/about')}>
              About
            </Button>
            <Button color="inherit" onClick={() => handleNavigation('/contact')}>
              Contact
            </Button>
          </>
        )}
      </>
  );
};

export default Navbar;
