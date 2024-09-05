// WidgetDetails.jsx
import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  IconButton,
  Typography,
  TextField,
  MenuItem,
  Drawer,
  Button,
  AppBar,
  Toolbar,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import TableChartIcon from '@mui/icons-material/TableChart';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

const columns = [
  { field: 'severity', headerName: 'Sev', width: 100, sortable: true },
  { field: 'itemName', headerName: 'Item Name', width: 200, sortable: true },
  { field: 'userName', headerName: 'User Name', width: 150, sortable: true },
  { field: 'incidentCreatedOn', headerName: 'Incident Created On', width: 200, sortable: true },
  { field: 'incidentResponse', headerName: 'Incident Response', width: 150, sortable: true },
  { field: 'incidentStatus', headerName: 'Incident Status', width: 130, sortable: true },
  { field: 'serviceName', headerName: 'Service Name', width: 150, sortable: true },
  { field: 'instanceName', headerName: 'Instance Name', width: 150, sortable: true },
];

const rows = [
  {
    id: 1,
    severity: 'Critical',
    itemName: 'Testfire_CCN_5_records.xls',
    userName: 'admin@testfire.me',
    incidentCreatedOn: 'Feb 13, 2023 2:07 AM UTC',
    incidentResponse: 'Deleted',
    incidentStatus: 'New',
    serviceName: 'Google Drive',
    instanceName: 'GoogleDrive Testfire',
  },
  // Add more sample rows as needed
];

const WidgetDetails = () => {
  const [leftTab, setLeftTab] = useState(0);
  const [viewTab, setViewTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLeftTabChange = (event, newValue) => {
    setLeftTab(newValue);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box display="flex" height="100%" flexDirection="column">
      {/* AppBar for mobile drawer toggle */}
      {isMobile && (
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Policy Incidents</Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Policy Incidents Heading */}
      {!isMobile && (
        <Box p={2}>
          <Typography variant="h4" gutterBottom>
            Policy Incidents
          </Typography>
        </Box>
      )}

      {/* Left Section as Drawer for Filters */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        variant={isMobile ? 'temporary' : 'permanent'}
        sx={{ '& .MuiDrawer-paper': { width: isMobile ? '100%' : '300px' } }}
      >
        <Box role="presentation" p={2} height="100%">
          {/* Tabs for Filters and Views */}
          <Tabs value={leftTab} onChange={handleLeftTabChange} aria-label="left section tabs">
            <Tab label="Filters" />
            <Tab label="Views" />
          </Tabs>

          {leftTab === 0 && (
            <Box p={2}>
              {/* Incident Type Filters */}
              <Typography variant="h6">Incident Type</Typography>
              <FormControlLabel control={<Checkbox />} label="Audit Violation" />
              <FormControlLabel control={<Checkbox />} label="Sanctioned DLP" />
              <FormControlLabel control={<Checkbox />} label="Shadow/Web DLP" />

              {/* Service Name Filters */}
              <Typography variant="h6" mt={2}>
                Service Name
              </Typography>
              <FormControlLabel control={<Checkbox />} label="SharePoint" />
              <FormControlLabel control={<Checkbox />} label="Google Drive" />
              <FormControlLabel control={<Checkbox />} label="Amazon S3" />

              {/* Severity Filters */}
              <Typography variant="h6" mt={2}>
                Severity
              </Typography>
              <FormControlLabel control={<Checkbox />} label="Major" />
              <FormControlLabel control={<Checkbox />} label="Critical" />
              <FormControlLabel control={<Checkbox />} label="Minor" />
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
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={toggleDrawer(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Apply
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Right Section - Chart and Table View */}
      <Box flex={1} p={2} ml={isMobile ? 0 : 0} overflow="hidden">
        {/* Action button and Table Info */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="body1">Total Rows: {rows.length}</Typography>
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
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <IconButton
            color={viewTab === 0 ? 'primary' : 'default'}
            onClick={() => setViewTab(0)}
          >
            <TableChartIcon />
          </IconButton>
          <IconButton
            color={viewTab === 1 ? 'primary' : 'default'}
            onClick={() => setViewTab(1)}
          >
            <InsertChartIcon />
          </IconButton>
        </Box>

        {viewTab === 0 && (
          // DataGrid table view
          <Box sx={{ overflowX: 'auto', height: 400 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              autoHeight
              sx={{
                '& .MuiDataGrid-root': {
                  overflowX: 'auto',
                },
              }}
            />
          </Box>
        )}

        {viewTab === 1 && (
          // Chart view - placeholder content
          <Box display="flex" justifyContent="center" alignItems="center" height={400}>
            <Typography variant="h5">Chart View (Placeholder)</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WidgetDetails;
