// Dashboard.js

import React from 'react';
import { Container, Grid } from '@mui/material';
import {ChartCard} from 'components';

const chartData = [
  { name: 'Page A', value: 4000 },
  { name: 'Page B', value: 3000 },
  { name: 'Page C', value: 2000 },
  { name: 'Page D', value: 2780 },
  { name: 'Page E', value: 1890 },
  { name: 'Page F', value: 2390 },
  { name: 'Page G', value: 3490 },
];

const Dashboard = () => {
  return (
    <Container>
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
          />
        </Grid>
        {/* Add more Grid items as needed */}
      </Grid>
    </Container>
  );
};

export default Dashboard;
