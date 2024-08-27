import React from "react";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  LineChart,
  Cell,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './ChartCard.css';

const ChartCard = ({
  title,
  description,
  memoryUsed,
  data,
  type,
  legend,
  cartesianGrid,
  tooltip,
  handleOpen
}) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  

  const renderChart = () => {
    switch (type) {
      case "line":
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
      case "bar":
        return (
          <BarChart width={500} height={200} data={data}>
            {cartesianGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="name" />
            <YAxis />
            {tooltip && <Tooltip />}
            {legend && <Legend />}
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        );
      case "stackedBar":
        return (
          <BarChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
            <Bar dataKey="amt" stackId="a" fill="#289fff" />
          </BarChart>
        );
      case "donut":
        return (
          <PieChart width={500} height={200}>
            <Pie
              data={data}
              cx={120}
              cy={70}
              innerRadius={70}
              outerRadius={75}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            {tooltip && <Tooltip />}
            {legend && (
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ width: "150px", right: "10px" }}
              />
            )}

            {cartesianGrid && <CartesianGrid strokeDasharray="3 3" />}
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      // sx={{
      //   "&:hover": {
      //     borderColor: "blue",
      //     boxShadow: "0 0 10px rgba(0, 0, 255, 0.3)",
      //   },
      // }}
      className="chart-card"
    >
      <IconButton 
          className="more-icon" 
          onClick={handleOpen}
        >
          <MoreVertIcon />
        </IconButton>
      <CardContent>
        <Typography
          variant="h3"
          color="text.primary"
          fontWeight="bold"
          fontSize="14px"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontSize="12px">
          {description}
        </Typography>
        <Typography
          variant="h5"
          color="text.primary"
          fontWeight="bold"
          marginTop={2}
        >
          {memoryUsed}
        </Typography>
        <div style={{ marginTop: "20px" }}>{renderChart()}</div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
