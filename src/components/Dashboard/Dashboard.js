// Dashboard.js

import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Grid } from '@mui/material';
import { AddNewCardModal, ChartCard} from 'components';
import { api } from 'utils';
import config from 'config/config';

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
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    api.get(
      {
        endpoint: config.endpoint.testService,
        path: "todos",
        isTokenRequired : "false"
      }
    )
  },[])
  return (
    <Container>
      <Box sx={{textAlign:'right', p:2}}>
        <Button size="small" variant="contained" onClick={handleOpen}>Add New Card</Button>
        <AddNewCardModal open={modalOpen} handleOpen={handleOpen} handleClose={handleClose} />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <ChartCard
            title="Line Chart"
            description="A line chart showing data trends"
            memoryUsed="207MB"
            data={chartData}
            type="line"
            legend={true}
            cartesianGrid={true}
            tooltip={true}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <ChartCard
            title="Bar Chart"
            description="A bar chart showing data distribution"
            memoryUsed="5GB"
            data={chartData}
            type="bar"
            legend={false}
            cartesianGrid={true}
            tooltip={true}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <ChartCard
            title="Donut Chart"
            description="A donut chart showing data distribution"
            memoryUsed="5GB"
            data={chartData}
            type="donut"
            legend={true}
            cartesianGrid={false}
            tooltip={true}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <ChartCard
            title="Stacked Bar Chart"
            description="A stacked bar chart showing data distribution"
            memoryUsed="5GB"
            data={stackedBarData}
            type="stackedBar"
            legend={false}
            cartesianGrid={true}
            tooltip={true}
            handleOpen={handleOpen}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
