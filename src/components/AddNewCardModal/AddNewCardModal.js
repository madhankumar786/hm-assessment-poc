import React from 'react';
import { Modal, Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel, IconButton, Grid, Button, Paper, FormHelperText } from '@mui/material';
import { Close as CloseIcon, BarChart as BarChartIcon, ShowChart as LineChartIcon, PieChart as PieChartIcon, StackedBarChart as ProgressBarChartIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';

const cardTypes = [
  { icon: <BarChartIcon sx={{color: "#Ff0000"}}/>, label: 'Services' },
  { icon: <LineChartIcon sx={{color: "#FC0"}} />, label: 'Users' },
  { icon: <PieChartIcon sx={{color: "#00ff00"}}/>, label: 'Web Malware' },
  { icon: <ProgressBarChartIcon sx={{color: "0000ff"}} />, label: 'Incidents' },
  { icon: <BarChartIcon sx={{color: "#289222"}}/>, label: 'Threats' },
  { icon: <LineChartIcon sx={{color: "#4568ff"}} />, label: 'Anomaly' },
  { icon: <PieChartIcon sx={{color: "#efefef"}}/>, label: 'Activity' },
  { icon: <ProgressBarChartIcon sx={{color: "#889955"}} />, label: 'Web Traffic' },
  { icon: <BarChartIcon sx={{color: "#456789"}} />, label: 'Web User' },
  { icon: <LineChartIcon sx={{color: "#ff1111"}} />, label: 'Connected Apps' },
  { icon: <PieChartIcon sx={{color: "#779988"}} />, label: 'Resource' }
];

const chartTypes = [
  { icon: <BarChartIcon sx={{color: "#289fff"}}/>, label: 'Bar Chart' },
  { icon: <LineChartIcon sx={{color: "#00ff00"}} />, label: 'Line Chart' },
  { icon: <PieChartIcon sx={{color: "#0000ff"}} />, label: 'Pie Chart' },
  { icon: <ProgressBarChartIcon sx={{color: "#ff0000"}} />, label: 'Progress Bar' }
];

const AddNewCardModal = ({ open, handleClose }) => {
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      cardType: '',
      savedView: '',
      cardTitle: '',
      show: '',
      by: '',
      now: '',
      chartType: ''
    }
  });

  const cardTypeValue = watch('cardType');
  const chartTypeValue = watch('chartType');

  const handleSave = (data) => {
    console.log('Form Data:', data);
    handleClose(); 
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'relative',
          width: '90%',
          maxWidth: 1000,
          height: '90%',
          maxHeight: '90%',
          bgcolor: 'background.paper',
          borderRadius: 2,
          m: 'auto',
          mt: 5,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Modal Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
            borderBottom: '1px solid grey',
            backgroundColor: 'background.default',
          }}
        >
          <Typography variant="h6">Add New Card</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Modal Body */}
        <Box
          sx={{
            display: 'flex',
            flex: '1',
            overflow: 'hidden',
          }}
        >
          {/* Card Preview Section */}
          <Box
            sx={{
              flex: '1',
              mr: 3,
              maxHeight: '100%',
              overflowY: 'auto',
              border: '1px solid grey',
              borderRadius: 1,
              p: 2,
            }}
          >
            <Typography variant="subtitle1" gutterBottom>Card Preview</Typography>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'left' }}>
              <Typography variant="h6">{watch('cardTitle') || 'Card Title'}</Typography>
              <Typography variant="body2">{watch('cardType') || 'Card Type'}</Typography>
              <Typography variant="body2">{watch('show') || 'Show: Summary'}</Typography>
              <Typography variant="body2">{watch('by') || 'By: Date'}</Typography>
              <Typography variant="body2">{watch('now') || 'Now: Last 24 Hours'}</Typography>
              <Typography variant="body2">{watch('chartType') || 'Chart Type: Bar Chart'}</Typography>
            </Paper>
          </Box>

          {/* Form Section */}
          <Box
            sx={{
              flex: '2',
              overflowY: 'auto',
              p: 2,
            }}
          >
            {/* Card Type */}
            <Typography variant="subtitle1" gutterBottom>Card Type</Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {cardTypes.map((type) => (
                <Grid item xs={2.4} key={type.label} sx={{flexBasis:'16%'}}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      flexBasis: '16%',
                      border: cardTypeValue === type.label ? '2px solid blue' : '1px solid grey',
                      borderRadius: 1,
                      p: 1,
                      '&:hover': {
                        borderColor: 'blue',
                        boxShadow: '0 0 10px rgba(0, 0, 255, 0.3)',
                      },
                    }}
                    onClick={() => setValue('cardType', type.label)}
                  >
                    {type.icon}
                    <Typography sx={{ fontSize: '10px', mt: 1 }}>{type.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Saved View */}
            <FormControl fullWidth margin="normal" error={!!errors.savedView}>
              <InputLabel sx={{fontSize:'14px'}}>Saved View</InputLabel>
              <Controller
                name="savedView"
                control={control}
                rules={{ required: 'Saved View is required' }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      size="small"
                      label="Saved View"
                    >
                      <MenuItem value="view1">View 1</MenuItem>
                      <MenuItem value="view2">View 2</MenuItem>
                      <MenuItem value="view3">View 3</MenuItem>
                    </Select>
                    {errors.savedView && <FormHelperText>{errors.savedView.message}</FormHelperText>}
                  </>
                )}
              />
            </FormControl>

            {/* Card Title */}
            <Controller
              name="cardTitle"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Card Title"
                  size="small"
                  InputProps={{
                    style: { fontSize: 12 }, 
                  }}
                  {...field}
                  autoFocus
                  error={!!errors.cardTitle}
                  helperText={errors.cardTitle ? errors.cardTitle.message : ""}
                />
              )}
            />

            {/* Show */}
            <FormControl fullWidth margin="normal" error={!!errors.show}>
              <InputLabel sx={{fontSize:'14px'}}>Show</InputLabel>
              <Controller
                name="show"
                control={control}
                rules={{ required: 'Show option is required' }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      size="small"
                      label="Show"
                    >
                      <MenuItem value="summary">Summary</MenuItem>
                      <MenuItem value="detailed">Detailed</MenuItem>
                    </Select>
                    {errors.show && <FormHelperText>{errors.show.message}</FormHelperText>}
                  </>
                )}
              />
            </FormControl>

            {/* By */}
            <FormControl fullWidth margin="normal" error={!!errors.by}>
              <InputLabel sx={{fontSize:'14px'}}>By</InputLabel>
              <Controller
                name="by"
                control={control}
                rules={{ required: 'By option is required' }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      size="small"
                      label="By"
                    >
                      <MenuItem value="date">Date</MenuItem>
                      <MenuItem value="category">Category</MenuItem>
                    </Select>
                    {errors.by && <FormHelperText>{errors.by.message}</FormHelperText>}
                  </>
                )}
              />
            </FormControl>

            {/* Now */}
            <FormControl fullWidth margin="normal" error={!!errors.now}>
              <InputLabel sx={{fontSize:'14px'}}>Now</InputLabel>
              <Controller
                name="now"
                control={control}
                rules={{ required: 'Now option is required' }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      size="small"
                      label="Now"
                    >
                      <MenuItem value="last24hours">Last 24 Hours</MenuItem>
                      <MenuItem value="last7days">Last 7 Days</MenuItem>
                      <MenuItem value="last30days">Last 30 Days</MenuItem>
                    </Select>
                    {errors.now && <FormHelperText>{errors.now.message}</FormHelperText>}
                  </>
                )}
              />
            </FormControl>

            {/* Chart Type */}
            <Typography variant="subtitle1" gutterBottom>Chart Type</Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {chartTypes.map((type) => (
                <Grid item xs={3} key={type.label}>
                  <IconButton
                    sx={{
                      border: chartTypeValue === type.label ? '2px solid blue' : '1px solid grey',
                      borderRadius: '50%',
                      p: 1,
                      '&:hover': {
                        borderColor: 'blue',
                        boxShadow: '0 0 10px rgba(0, 0, 255, 0.3)',
                      },
                    }}
                    onClick={() => setValue('chartType', type.label)}
                  >
                    {type.icon}
                  </IconButton>
                  <Typography sx={{ fontSize: '14px', mt: 1, textAlign: 'left' }}>{type.label}</Typography>
                </Grid>
              ))}
            </Grid>

            {/* Footer Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button variant="outlined" onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
              <Button variant="contained" onClick={handleSubmit(handleSave)}>Save</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddNewCardModal;
