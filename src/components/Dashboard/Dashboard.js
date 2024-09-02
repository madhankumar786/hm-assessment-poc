// Dashboard.js

import React, { useCallback, useState } from 'react';
import { Box, Button, Container, Grid } from '@mui/material';
import { AddNewCardModal, ChartCard, ConfirmationModal } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { useGetDashboardCharts, useChartDelete, useUpdateChart } from 'hooks';
import { setCharts, removeChart} from 'store/chartsSlice';

const chartData = [
  { name: 'Page A', value: 4000 },
  { name: 'Page B', value: 3000 },
  { name: 'Page C', value: 2000 },
  { name: 'Page D', value: 2780 },
  { name: 'Page E', value: 1890 },
  { name: 'Page F', value: 2390 },
  { name: 'Page G', value: 3490 },
];

const stackedBarData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Dashboard = () => {
  const { charts } = useSelector((state) => state.dashboard);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId,setSelectedId]= useState();
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const dispatch = useDispatch();
  const [selectedChart, setSelectedChart] = useState(null);

  const handleSuccess = (data) => {
    console.log('Data fetched successfully:', data);
    dispatch(setCharts(data?.data));
  };

  const handleError = (error) => {
    console.error('Error fetching data:', error);
    // dispatch(setError(error.message));
  };

  // Call the custom hook
  const { data, isLoading, isError, error } = useGetDashboardCharts({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  console.log(charts, 'charts from redux-toolkit')
  console.log(isDeleteModalOpen, 'isDeleteModalOpen')

  const { mutate: deleteChart } = useChartDelete(
    () => {
      dispatch(removeChart(selectedId));
      setIsDeleteModalOpen(!isDeleteModalOpen);
    },
    (error) => {
      console.error('Error deleting chart:', error);
    }
  );

  const handleConfirmDelete = () => {
    if (selectedId) {
      deleteChart(selectedId);
    }
  };
 
  const handleDeleteChart = (chartId) => {
    setSelectedId(chartId); 
    setIsDeleteModalOpen(!isDeleteModalOpen);        
  };

  // Cancel deletion and close the modal
  const cancelDelete = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleAddNewCard = () => {
    setSelectedChart(null)
    handleOpen()
  }
  const handleEditCard = useCallback((chart) => {
    setSelectedChart(chart)
    handleOpen()
  },[]);
  
  return (
    <Container>
      <Box sx={{textAlign:'right', p:2}}>
        <Button size="small" variant="contained" onClick={handleAddNewCard}>Add New Card</Button>
        <AddNewCardModal open={modalOpen} handleOpen={handleOpen} handleClose={handleClose}  selectedChart={selectedChart}/>
      </Box>
      <Grid container spacing={2}>
        {charts?.map((item) => {
          return(
            <Grid item xs={12} sm={6} md={6} lg={6} key={item?.id} >
              <ChartCard
                title={item?.cardTitle}
                description="Chart showing data trends"
                memoryUsed="207MB"
                data={chartData}
                type={item?.chartType}
                legend={true}
                cartesianGrid={true}
                tooltip={true}
                handleOpen={() => handleOpen(item)}
                chartData = {item}
                onEdit = {() => handleEditCard(item)}
                handleClose={handleClose}
                id={item?.id}
                handleDeleteClick={(id) => handleDeleteChart(id)}
                handleConfirmDelete={handleConfirmDelete}
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            </Grid>
          )
        })}
      </Grid>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={cancelDelete}
      />
    </Container>
  );
};

export default Dashboard;
