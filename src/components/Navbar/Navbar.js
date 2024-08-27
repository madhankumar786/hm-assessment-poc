import React, { useEffect, useState } from "react";
import {
  IconButton,
  Typography,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { rolesConfig } from "utils";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // const menus = rolesConfig[localStorage.getItem("userType")]?.canAccess;
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setMenus(rolesConfig[localStorage.getItem("userType")]?.canAccess|| rolesConfig['User'].canAccess);
  }, [localStorage.getItem("accessToken")]);

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
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
          <Drawer
            anchor="left"
            open={mobileMenuOpen}
            onClose={handleMobileMenuClose}
            sx={{ width: 250 }}
          >
            <div
              role="presentation"
              onClick={handleMobileMenuClose}
              onKeyDown={handleMobileMenuClose}
            >
              <Typography variant="h6" sx={{ padding: 2 }}>
                Menu
              </Typography>
              <Divider />
              <List>
                {menus?.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      onClick={() => handleNavigation(item)}
                      sx={{ minWidth: "calc(100% - 30%)" }}
                    >
                      <ListItemText
                        primary={item}
                        sx={{ textTransform: "capitalize" }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </Drawer>
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
                  "&:hover": {
                    backgroundColor: isActive(`/${item.toLowerCase()}`)
                      ? "#ececec"
                      : "#cde9fa",
                    color: isActive(`/${item.toLowerCase()}`)
                      ? "black"
                      : "#19762d",
                  },
                  transition: "0.5s ease",
                  cursor: "pointer",
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
