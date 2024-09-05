import React, { useState} from "react";
import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
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
  ResponsiveContainer,
} from "recharts";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./ChartCard.css";
import { Link, useNavigate } from "react-router-dom";

const ChartCard = React.memo(
  ({
    title,
    description,
    memoryUsed,
    data,
    type,
    legend,
    cartesianGrid,
    tooltip,
    handleOpen,
    onEdit,
    chartData,
    id,
    handleDeleteClick,
  }) => {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const renderChart = () => {
      switch (type) {
        case "line":
          return (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                  {cartesianGrid && <CartesianGrid strokeDasharray="3 3" />}
                  <XAxis dataKey="name" />
                  <YAxis />
                  {tooltip && <Tooltip />}
                  {legend && <Legend />}
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </>
          );
        case "bar":
          return (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data} cx={50} cy={70}>
                  {cartesianGrid && <CartesianGrid strokeDasharray="3 3" />}
                  <XAxis dataKey="name" />
                  <YAxis />
                  {tooltip && <Tooltip />}
                  {legend && <Legend />}
                  <Bar dataKey="value" barSize={15} fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </>
          );
        case "stackedBar":
          return (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  layout="vertical"
                  data={data}
                  cx={80}
                  cy={70}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" scale="band" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" stackId="a" barSize={10} fill="#413ea0" />
                  <Bar dataKey="uv" stackId="a" barSize={10} fill="#289fff" />
                </BarChart>
              </ResponsiveContainer>
            </>
          );
        case "donut":
          return (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={data}
                    cx={80}
                    cy={70}
                    innerRadius={70}
                    outerRadius={75}
                    fill="#8884d8"
                    paddingAngle={4}
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
                      wrapperStyle={{
                        width: "80px",
                        top: "0px",
                        right: "10px",
                      }}
                    />
                  )}
                </PieChart>
              </ResponsiveContainer>
            </>
          );
        default:
          return null;
      }
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = (resetForm) => {
      resetForm();
      setAnchorEl(null);
    };
    const handleDelete = (id) => {
      console.log("executing handleDelete");
      handleDeleteClick(id);
    };
    const handleEdit = () => {
      setAnchorEl(null);
      // handleOpen();
      if (onEdit) {
        onEdit(chartData); // Ensure onEdit is called with chartData
      } else {
        console.error("onEdit is not a function"); // Add an error message for clarity
      }
    };

    const handleCardTitleClick = () => {
      navigate('/widgetDetails')
    }

    return (
      <>
        <Card className="chart-card">
          <IconButton className="more-icon" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={() => handleDelete(id)}>Delete</MenuItem>
          </Menu>
          <CardContent>
           
            {/* <Link to="/widgetDetails" > */}
              <Typography
                variant="h3"
                color="text.primary"
                fontWeight="bold"
                fontSize="14px"
                gutterBottom
                sx={{textDecoration:'none',cursor:'pointer'}}
                onClick={handleCardTitleClick}
              >
                {title}
              </Typography>
            {/* </Link> */}
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
      </>
    );
  }
);

export default ChartCard;
