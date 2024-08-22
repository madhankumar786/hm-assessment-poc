import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const ChartCard = ({ title, description, memoryUsed, data, type, legend, cartesianGrid, tooltip }) => {
  // Function to render the chart based on type and props
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart width={400} height={200} data={data}>
            {cartesianGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="name" />
            <YAxis />
            {tooltip && <Tooltip />}
            {legend && <Legend />}
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart width={400} height={200} data={data}>
            {cartesianGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="name" />
            <YAxis />
            {tooltip && <Tooltip />}
            {legend && <Legend />}
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h3" color="text.primary" fontWeight="bold" fontSize="14px" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontSize="12px">
          {description}
        </Typography>
        <Typography variant="h5" color="text.primary" fontWeight="bold" marginTop={2}>
          {memoryUsed}
        </Typography>
        <div style={{ marginTop: '20px' }}>
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
