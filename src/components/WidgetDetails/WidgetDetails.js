// WidgetDetails.jsx
import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  IconButton,
  Typography,
  TextField,
  Drawer,
  Button,
  AppBar,
  Toolbar,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TableChartIcon from "@mui/icons-material/TableChart";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import "./WidgetDetails.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetWidgetTableData } from "hooks";
import { setWidgetDetaildTable } from "store/widgetDetailsTableSlice";

const columns = [
  { field: "severity", headerName: "Sev", width: 100, sortable: true },
  { field: "itemName", headerName: "Item Name", width: 200, sortable: true },
  { field: "userName", headerName: "User Name", width: 150, sortable: true },
  {
    field: "incidentCreatedOn",
    headerName: "Incident Created On",
    width: 200,
    sortable: true,
  },
  {
    field: "incidentResponse",
    headerName: "Incident Response",
    width: 150,
    sortable: true,
  },
  {
    field: "incidentStatus",
    headerName: "Incident Status",
    width: 130,
    sortable: true,
  },
  {
    field: "serviceName",
    headerName: "Service Name",
    width: 150,
    sortable: true,
  },
  {
    field: "instanceName",
    headerName: "Instance Name",
    width: 150,
    sortable: true,
  },
];

const rows = [
  {
    id: 1,
    severity: "Critical",
    itemName: "Testfire_CCN_5_records.xls",
    userName: "admin@testfire.me",
    incidentCreatedOn: "Feb 13, 2023 2:07 AM UTC",
    incidentResponse: "Deleted",
    incidentStatus: "New",
    serviceName: "Google Drive",
    instanceName: "GoogleDrive Testfire",
  },
  {
    id: 2,
    severity: "Low",
    itemName: "Testfire_CCN_5_records.xls",
    userName: "admin@testfire.me",
    incidentCreatedOn: "Feb 13, 2023 2:07 AM UTC",
    incidentResponse: "Deleted",
    incidentStatus: "New",
    serviceName: "Google Drive",
    instanceName: "GoogleDrive Testfire",
  },
   {
    id: 3,
    severity: "High",
    itemName: "Testfire_CCN_5_records.xls",
    userName: "admin@testfire.me",
    incidentCreatedOn: "Feb 13, 2023 2:07 AM UTC",
    incidentResponse: "Deleted",
    incidentStatus: "New",
    serviceName: "Google Drive",
    instanceName: "GoogleDrive Testfire",
  },
  {
    id: 4,
    severity: "Medium",
    itemName: "Testfire_CCN_5_records.xls",
    userName: "admin@testfire.me",
    incidentCreatedOn: "Feb 13, 2023 2:07 AM UTC",
    incidentResponse: "Deleted",
    incidentStatus: "New",
    serviceName: "Google Drive",
    instanceName: "GoogleDrive Testfire",
  },
  {
    id: 5,
    severity: "Low",
    itemName: "Testfire_CCN_5_records.xls",
    userName: "admin@testfire.me",
    incidentCreatedOn: "Feb 13, 2023 2:07 AM UTC",
    incidentResponse: "Deleted",
    incidentStatus: "New",
    serviceName: "Google Drive",
    instanceName: "GoogleDrive Testfire",
  }
];

const WidgetDetails = () => {
  const { widgetTable } = useSelector((state) => state.WidgetDetails);
  const [leftTab, setLeftTab] = useState(0);
  const [viewTab, setViewTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLeftTabChange = (event, newValue) => {
    setLeftTab(newValue);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleBack = () => {
    navigate(-1); // Goes back one step in the browser history
  };

  const handleSuccess = (data) => {
    console.log("Table Data fetched successfully:", data);
    dispatch(setWidgetDetaildTable(data));
  };

  const handleError = (error) => {
    console.error("Error fetching data:", error);
    // dispatch(setError(error.message));
  };

  // Call the custom hook
   useGetWidgetTableData({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return (
    <Box display="flex" height="100%" flexDirection="column">
      {/* AppBar for mobile drawer toggle */}
      {isMobile && (
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Policy Incidents</Typography>
          </Toolbar>
        </AppBar>
      )}

      {!isMobile && (
        <Box sx={{marginLeft:'215px'}} p={2}>
          <Typography variant="h6" sx={{color:'#969696'}} gutterBottom>
            Policy Incidents
          </Typography>
        </Box>
      )}

      {/* Left Section as Drawer for Filters */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        variant={isMobile ? "temporary" : "permanent"}
        sx={{ "& .MuiDrawer-paper": { width: isMobile ? "100%" : "215px" } }}
        className="widgetDetailsLeftContainer"
      >
        <Box role="presentation" p={2} height="100%">
          {/* Tabs for Filters and Views */}
          <Tabs
            value={leftTab}
            onChange={handleLeftTabChange}
            aria-label="left section tabs"
          >
            <Tab label="Filters" />
            <Tab label="Views" />
          </Tabs>

          {leftTab === 0 && (
            <Box p={1}>
              {/* Incident Type Filters */}
              <Typography
                variant="h6"
                sx={{ fontSize: "14px", fontWeight: "600", py: 1 }}
              >
                Incident Type
              </Typography>
              <FormControlLabel
                control={<Checkbox size="small" sx={{color: "#d4d3d2"}}/>}
                sx={{ color: "#969696"}}
                label={<Typography sx={{fontSize:'14px'}}>Audit Violation</Typography>}
              />
              <FormControlLabel
                control={<Checkbox size="small" sx={{color: "#d4d3d2"}}/>}
                sx={{ color: "#969696", fontSize: "12px" }}
                label={<Typography sx={{fontSize:'14px'}}>Sanctioned DLP</Typography>}
              />
              <FormControlLabel
                control={<Checkbox size="small" sx={{color: "#d4d3d2"}} />}
                sx={{ color: "#969696"}}
                label={<Typography sx={{fontSize:'14px'}}>Shadow/Web DLP</Typography>}
              />

              {/* Service Name Filters */}
              <Typography
                variant="h6"
                sx={{ fontSize: "14px", fontWeight: "600", py: 1 }}
                mt={2}
              >
                Service Name
              </Typography>
              <FormControlLabel
                control={<Checkbox size="small" sx={{color: "#d4d3d2"}} />}
                sx={{ color: "#969696"}}
                label={<Typography sx={{fontSize:'14px'}}>SharePoint</Typography>}
              />
              <FormControlLabel
                control={<Checkbox size="small" sx={{color: "#d4d3d2"}} />}
                sx={{ color: "#969696"}}
                label={<Typography sx={{fontSize:'14px'}}>Google Drive</Typography>}
              />
              <FormControlLabel
                control={<Checkbox size="small" sx={{color: "#d4d3d2"}} />}
                sx={{ color: "#969696"}}
                label={<Typography sx={{fontSize:'14px'}}>Amazon S3</Typography>}
              />

              {/* Severity Filters */}
              <Typography
                variant="h6"
                sx={{ fontSize: "14px", fontWeight: "600", py: 1 }}
                mt={2}
              >
                Severity
              </Typography>
              <FormControlLabel
                control={<Checkbox size="small" sx={{color: "#d4d3d2"}}/>}
                sx={{ color: "#969696"}}
                label={<Typography sx={{fontSize:'14px'}}>Major</Typography>}
              />
              <FormControlLabel
                control={<Checkbox size="small" sx={{color: "#d4d3d2"}}/>}
                sx={{ color: "#969696"}}
                label={<Typography sx={{fontSize:'14px'}}>Critical</Typography>}
              />
              <FormControlLabel
                control={<Checkbox size="small" sx={{color: "#d4d3d2"}} />}
                sx={{ color: "#969696"}}
                label={<Typography sx={{fontSize:'14px'}}>Minor</Typography>}
              />
            </Box>
          )}

          {leftTab === 1 && (
            <Box p={2}>
              <Typography variant="h6">Saved Views</Typography>
              <Typography>Saved View 1</Typography>
              <Typography>Saved View 2</Typography>
            </Box>
          )}

          {/* Drawer Buttons */}
          <Box display="flex" justifyContent="right" my={2} className="widgetDetailsBtn">
            <Button variant="outlined" onClick={toggleDrawer(false)} size="small" sx={{mr:1}}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" size="small">
              Apply
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Right Section - Chart and Table View */}
      
      <Box className="tableHolderStyles" flex={1} p={2} ml={isMobile ? 0 : 0} overflow="hidden">
        {/* Action button and Table Info */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="body1" sx={{color:'#969696'}}>{widgetTable?.length} Incidents</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              variant="outlined"
              placeholder="Search"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={() => {}}
            />
            <Button variant="outlined">Actions</Button>
          </Box>
        </Box>

        {/* Tabs for table and chart view */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Box className="testing786" sx={{backgroundcolor:"#ffffff", textAlign:'left',margin:'0px !important'}}>
            <Button onClick={handleBack} size="small" variant="outlined" startIcon={<ArrowBackIcon />}>Back</Button>
          </Box>
          <Box sx={{backgroundcolor:"#ffffff"}}>
            <IconButton
              color={viewTab === 0 ? "primary" : "default"}
              onClick={() => setViewTab(0)}
            >
              <TableChartIcon />
            </IconButton>
            <IconButton
              color={viewTab === 1 ? "primary" : "default"}
              onClick={() => setViewTab(1)}
            >
              <InsertChartIcon />
            </IconButton>
          </Box>
        </Box>

        {viewTab === 0 && widgetTable && (
          // DataGrid table view
        
            
            <Box sx={{ overflowX: "auto", height: 335 }}>
              <DataGrid
                rows={widgetTable}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                autoHeight
                sx={{
                  "& .MuiDataGrid-root": {
                    overflowX: "auto",
                  },
                }}
              />
            </Box>
          
        )}

        {viewTab === 1 && (
          // Chart view - placeholder content
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={400}
          >
            <Typography variant="h5">Chart View (Placeholder)</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WidgetDetails;
