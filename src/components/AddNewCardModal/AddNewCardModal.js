import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Grid,
  Button,
  FormHelperText,
} from "@mui/material";
import {
  Close as CloseIcon,
  BarChart as BarChartIcon,
  BarChartOutlined as TrendBarChartIcon,
  ShowChart as LineChartIcon,
  PieChart as PieChartIcon,
  BarChartOutlined as StackedBarChart,
  StackedBarChart as ProgressBarChartIcon,
  DonutLargeOutlined as DonutChartIcon,
  DashboardOutlined as AnomalyIcon,
  CloudQueueOutlined as ServicesIcon,
  PersonOutlineOutlined as UsersIcon,
  CenterFocusWeakOutlined as ThreatsIcon,
  MonitorHeartOutlined as ActivityIcon,
  BugReportOutlined as WebMalwareIcon,
  LanguageOutlined as WebTrafficIcon,
  GridOnOutlined as ConnectedAppsIcon,
  SelectAllOutlined as ResourceIcon,
  
} from "@mui/icons-material";
import { useDispatch } from 'react-redux';
import "./AddNewCardModal.css";
import { useForm, Controller } from "react-hook-form";
import { useAddDashboardChart, useUpdateChart } from "hooks";
import { addChart,updateChart } from "store/chartsSlice";

const cardTypes = [
  { icon: <ServicesIcon sx={{ color: "#09e393" }} />, label: "Services" },
  { icon: <UsersIcon sx={{ color: "#14f7a4" }} />, label: "Users" },
  { icon: <WebMalwareIcon sx={{ color: "#ff5b24" }} />, label: "Web Malware" },
  { icon: <ProgressBarChartIcon sx={{ color: "#f71414" }} />,label: "Incidents" },
  { icon: <ThreatsIcon sx={{ color: "#ff5b24" }} />, label: "Threats" },
  { icon: <AnomalyIcon sx={{ color: "#f7af14" }} />, label: "Anomaly" },
  { icon: <ActivityIcon sx={{ color: "#0ecc86" }} />, label: "Activity" },
  { icon: <WebTrafficIcon sx={{ color: "#289fff" }} />, label: "Web Traffic" },
  { icon: <BarChartIcon sx={{ color: "#09e393" }} />, label: "Web User" },
  { icon: <ConnectedAppsIcon sx={{ color: "#0ecc86" }} />, label: "Connected Apps" },
  { icon: <ResourceIcon sx={{ color: "#f7af14" }} />, label: "Resource" },
];

const trendChart = [
  { icon: <LineChartIcon />, label: "Line Chart", name:'line' },
  { icon: <TrendBarChartIcon />, label: "Bar Chart", name:'bar' },
];
const breakdownChart = [
  {
    icon: <DonutChartIcon />,
    label: "Donut Chart",
    name:'donut'
  },
  { icon: <StackedBarChart sx={{transform:'rotate(90deg)'}} />, label: "Stacked Bar Chart" , name:'stackedBar'},
];

const AddNewCardModal = ({ open, handleClose, selectedChart }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cardType: "",
      savedView: "",
      cardTitle: "",
      show: "",
      by: "",
      now: "",
      chartType: "",
    },
  });

  const cardTypeValue = watch("cardType");
  const chartTypeValue = watch("chartType");

  useEffect(() => {
    if (selectedChart) {
      reset(selectedChart); 
    }
  }, [selectedChart, reset]);

  const handleSuccess = (data) => {
    console.log('successfuly added dashboard',data)
    dispatch(addChart(data?.data))
  };

  const handleError = (error) => {
   console.log(error)
  };

  const { mutate: addDashboardChart, isLoading, isError, isSuccess, error } = useAddDashboardChart(handleSuccess,handleError);

 
     // update chart code starts here
   const handleUpdateSuccess = (data) => {
    dispatch(updateChart(data)); 
    handleClose();
  };
  
  const handleUpdateError = (error) => {
    console.error('Update failed:', error); 
  };

  const { mutate: updateDashboardChart } = useUpdateChart(handleUpdateSuccess, handleUpdateError);

  const handleSave = (data) => {
    console.log("Form Data:", data);
    if (selectedChart) {
      updateDashboardChart(data);
    } else {
      addDashboardChart(data); 
    }
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "relative",
          width: "90%",
          maxWidth: 1000,
          height: "90%",
          maxHeight: "90%",
          bgcolor: "background.paper",
          borderRadius: 2,
          m: "auto",
          mt: 5,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Modal Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            borderBottom: "1px solid grey",
            backgroundColor: "background.default",
          }}
        >
          <Typography sx={{fontSize:'16px',p:1}} variant="h6">{selectedChart? 'Update Card' : 'Add New Card'}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Modal Body */}
        <Box
          sx={{
            display: "flex",
            flex: "1",
            overflow: "hidden",
          }}
        >
          {/* Card Preview Section */}

          {/* Form Section */}
          <Box
            sx={{
              flex: "2",
              overflowY: "auto",
              p: 2,
            }}
          >
            {/* Card Type */}
            <Typography variant="subtitle1" gutterBottom sx={{fontSize:'16px', color:'#9c9898'}}>
              What kind of card do you want to add to your dashboard
            </Typography>
            <Grid
              container
              className="cardTypesHolder"
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alighItems: "center",
                p: 1,
                backgound:'#f7f7f7',
                my:1
              }}
            >
              {cardTypes.map((type) => (
                <Box
                  sx={{
                    cursor: "pointer",
                    flexBasis: "5%",
                    background:"#ffffff",
                    border:
                      cardTypeValue === type.label
                        ? "2px solid #289fff"
                        : "1px solid grey",
                    borderRadius: "2px",
                    p: 1,
                    mx: 1,
                    "&:hover": {
                      borderColor: "#289fff",
                      boxShadow: "0 0 10px rgba(0, 0, 255, 0.3)",
                    },
                    textAlign: "center",
                  }}
                  className="itemsTesting"
                  onClick={() => setValue("cardType", type.label)}
                >
                  {type.icon}
                  <Typography sx={{ m: 0, p: 0, fontSize: "10px" }}>
                    {type.label}
                  </Typography>
                </Box>
              ))}
            </Grid>

            {/* Saved View */}
            <Grid container>
              <Grid md={3}>
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.savedView}
                >
                  <InputLabel sx={{ fontSize: "12px" }}>Saved View</InputLabel>
                  <Controller
                    name="savedView"
                    control={control}
                    rules={{ required: "Saved View is required" }}
                    render={({ field }) => (
                      <>
                        <Select {...field} size="small" label="Saved View">
                          <MenuItem value="view1">View 1</MenuItem>
                          <MenuItem value="view2">View 2</MenuItem>
                          <MenuItem value="view3">View 3</MenuItem>
                        </Select>
                        {errors.savedView && (
                          <FormHelperText>
                            {errors.savedView.message}
                          </FormHelperText>
                        )}
                      </>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid md={9}></Grid>
              <Grid md={7}>
                <Typography sx={{ fontSize: "16px", color: "#9c9898", py: 1 }}>
                  Customize the Dashboard Card
                </Typography>
                <Box
                  sx={{
                    flex: "1",
                    mr: 3,
                    maxHeight: "100%",
                    overflowY: "auto",
                    border: "1px solid grey",
                    borderRadius: "2px",
                    minHeight:'250px',
                    p: 2,
                  }}
                >
                  <Box elevation={3} sx={{ p: 0, textAlign: "left" }}>
                    <Typography variant="h6" sx={{fontSize:'14px', fontWeight:'500',color:'#000000'}}>
                      {watch("cardTitle") || "Card Title"}
                    </Typography>
                    <Typography variant="h6" sx={{fontSize:'14px', fontWeight:'400',color:'#9c9898'}}>
                      Total data volume for 6 services - Last 7 days
                    </Typography>
                    <Box sx={{display:'block',py:1}}>
                      <Typography sx={{display:'inline-block', verticalAlign:'bottom'}} variant="h3">22.6</Typography>
                      <Typography sx={{display:'inline-block', verticalAlign:'bottom'}} variant="h6">GB</Typography>
                    </Box>
                    <Typography variant="body2" sx={{fontSize:'14px', fontWeight:'400',color:'#9c9898',pb:0.5}}>
                      {watch("cardType") || "Card Type"}
                    </Typography>
                    <Typography variant="body2" sx={{fontSize:'14px', fontWeight:'400',color:'#9c9898',pb:0.5}}>
                      {watch("show") || "Show: Summary"}
                    </Typography>
                    <Typography variant="body2" sx={{fontSize:'14px', fontWeight:'400',color:'#9c9898',pb:0.5}}>
                      {watch("by") || "By: Date"}
                    </Typography>
                    <Typography variant="body2" sx={{fontSize:'14px', fontWeight:'400',color:'#9c9898',pb:0.5}}>
                      {watch("now") || "Now: Last 24 Hours"}
                    </Typography>
                    <Typography variant="body2" sx={{fontSize:'14px', fontWeight:'400',color:'#9c9898',pb:0.5}}>
                      {watch("chartType") || "Chart Type: Bar Chart"}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid md={4} sx={{ p: 2 }}>
                {/* Card Title */}
                <Controller
                  name="cardTitle"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      sx={{ color: "red", borderRadius: "none" }}
                      fullWidth
                      margin="normal"
                      label="Card Title"
                      size="small"
                      InputProps={{
                        style: { fontSize: 14 },
                      }}
                      {...field}
                      autoFocus
                      error={!!errors.cardTitle}
                      helperText={
                        errors.cardTitle ? errors.cardTitle.message : ""
                      }
                    />
                  )}
                />

                {/* Show */}
                <FormControl fullWidth margin="normal" error={!!errors.show}>
                  <InputLabel sx={{ fontSize: "14px" }}>Show</InputLabel>
                  <Controller
                    name="show"
                    control={control}
                    rules={{ required: "Show option is required" }}
                    render={({ field }) => (
                      <>
                        <Select {...field} size="small" label="Show">
                          <MenuItem value="summary">Summary</MenuItem>
                          <MenuItem value="detailed">Detailed</MenuItem>
                        </Select>
                        {errors.show && (
                          <FormHelperText>{errors.show.message}</FormHelperText>
                        )}
                      </>
                    )}
                  />
                </FormControl>

                {/* By */}
                <FormControl fullWidth margin="normal" error={!!errors.by}>
                  <InputLabel sx={{ fontSize: "14px" }}>By</InputLabel>
                  <Controller
                    name="by"
                    control={control}
                    rules={{ required: "By option is required" }}
                    render={({ field }) => (
                      <>
                        <Select {...field} size="small" label="By">
                          <MenuItem value="date">Date</MenuItem>
                          <MenuItem value="category">Category</MenuItem>
                        </Select>
                        {errors.by && (
                          <FormHelperText>{errors.by.message}</FormHelperText>
                        )}
                      </>
                    )}
                  />
                </FormControl>

                {/* Now */}
                <FormControl fullWidth margin="normal" error={!!errors.now}>
                  <InputLabel sx={{ fontSize: "14px" }}>Now</InputLabel>
                  <Controller
                    name="now"
                    control={control}
                    rules={{ required: "Now option is required" }}
                    render={({ field }) => (
                      <>
                        <Select {...field} size="small" label="Now">
                          <MenuItem value="last24hours">Last 24 Hours</MenuItem>
                          <MenuItem value="last7days">Last 7 Days</MenuItem>
                          <MenuItem value="last30days">Last 30 Days</MenuItem>
                        </Select>
                        {errors.now && (
                          <FormHelperText>{errors.now.message}</FormHelperText>
                        )}
                      </>
                    )}
                  />
                </FormControl>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    pt:1
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontSize: "14px", color: "grey" }}
                      gutterBottom
                    >
                      Trend
                    </Typography>
                    {trendChart?.map((type) => (
                      <Box
                        key={type.label}
                        sx={{
                          display: "inline-block",
                          verticalAlign: "middle",
                          p: 0.5,
                        }}
                      >
                        <IconButton
                          sx={{
                            background:
                              chartTypeValue === type.name
                                ? "#ededed"
                                : "transparent",
                            color:
                              chartTypeValue === type.name
                                ? "#289fff"
                                : "#000000",
                            opacity:
                              chartTypeValue === type.name ? "1" : "0.5",
                            borderRadius: "50%",
                            p: 1,
                            "&:hover": {
                              borderColor: "#289fff",
                              boxShadow: "0 0 10px rgba(0, 0, 255, 0.3)",
                            },
                          }}
                          onClick={() => setValue("chartType", type.name)}
                        >
                          {type.icon}
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontSize: "14px", color: "grey" }}
                      gutterBottom
                    >
                      Breakdown
                    </Typography>
                    {breakdownChart?.map((type) => (
                      <Box
                        key={type.name}
                        sx={{
                          display: "inline-block",
                          verticalAlign: "middle",
                          p: 0.5,
                        }}
                      >
                        <IconButton
                          sx={{
                            background:
                              chartTypeValue === type.name
                                ? "#ededed"
                                : "transparent",
                            color:
                              chartTypeValue === type.name
                                ? "#289fff"
                                : "#000000",
                            opacity:
                              chartTypeValue === type.name ? "1" : "0.5",
                            borderRadius: "50%",
                            p: 1,
                            "&:hover": {
                              borderColor: "#289fff",
                              boxShadow: "0 0 10px rgba(0, 0, 255, 0.3)",
                            },
                          }}
                          onClick={() => setValue("chartType", type.name)}
                        >
                          {type.icon}
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
              {/* Footer Buttons */}
              <Grid
                md={12}
                sx={{ display: "block", textAlign: "right", mt: 3 }}
              >
                <Button variant="outlined" onClick={handleClose} sx={{ mr: 1 }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit(handleSave)}>
                  {selectedChart ? 'Update' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddNewCardModal;
