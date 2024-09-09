import React from "react";
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

const chartData = [
  { name: "DISK", value: 4000 },
  { name: "Files", value: 3000 },
  { name: "Blog", value: 2000 },
  { name: "Weibo", value: 2780 },
];
const stackedBarData = [
  {
    name: "DISK",
    System: 4000,
    Network: 2400,
    amt: 2400,
  },
  {
    name: "Files",
    System: 3000,
    Network: 1398,
    amt: 2210,
  },
  {
    name: "Blog",
    System: 2000,
    Network: 9800,
    amt: 2290,
  },
  {
    name: "Weibo",
    System: 2780,
    Network: 3908,
    amt: 2000,
  }
];
export const ChartPreview = ({ chartType }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </>
        );
      case "bar":
        return (
          <>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={chartData} cx={50} cy={70}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
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
                data={stackedBarData}
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
                <Bar dataKey="System" stackId="a" barSize={10} fill="#413ea0" />
                <Bar dataKey="Network" stackId="a" barSize={10} fill="#289fff" />
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
                  data={chartData}
                  cx={80}
                  cy={70}
                  innerRadius={70}
                  outerRadius={75}
                  fill="#8884d8"
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                (
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ width: "80px", top: "0px", right: "10px" }}
                />
                )
              </PieChart>
            </ResponsiveContainer>
          </>
        );
      default:
        return null;
    }
  };
  return <>{renderChart()}</>;
};

export default ChartPreview;
