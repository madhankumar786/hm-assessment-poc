import React, { useEffect, useState } from "react";
import {
  Typography,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import rolesConfig from "config/rolesConfig";
import './Navbar.css';

const Navbar = ({drawerOpen,handleDrawerToggle}) => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setMenus(rolesConfig[localStorage.getItem("userType")]?.canAccess || rolesConfig['User'].canAccess);
  }, [localStorage.getItem("accessToken")]);
 
  const handleNavigation = (path) => {
    navigate(path);
    handleDrawerToggle();
  };

  return (
    <>
      {isMobile ? (
        <>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            className="navBarDrawerStyle"
          >
            <div
              role="presentation"
              onClick={handleDrawerToggle}
              onKeyDown={handleDrawerToggle}
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
          {menus?.map((item,index) => {
            return (
              <MenuItem
              key={index}
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
