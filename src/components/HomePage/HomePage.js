import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "components";
import { Box } from "@mui/material";

const HomePage = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default HomePage;
