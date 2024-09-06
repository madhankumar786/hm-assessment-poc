// Dashboard.js

import React, { useCallback, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { AddNewCardModal, ChartCard, ConfirmationModal } from "components";
import { useSelector, useDispatch } from "react-redux";
import { useGetDashboardCharts, useChartDelete } from "hooks";
import { setCharts, removeChart } from "store/chartsSlice";
import { Addchart } from "@mui/icons-material";

const chartData = [
  { name: "DISK", value: 4000 },
  { name: "Files", value: 3000 },
  { name: "Blog", value: 2000 },
  { name: "Weibo", value: 2780 },
];

const stackedBarData = [
  {
    name: "DISK",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Files",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Blog",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Weibo",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  }
];

const Dashboard = () => {
  const { charts } = useSelector((state) => state.dashboard);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const dispatch = useDispatch();
  const [selectedChart, setSelectedChart] = useState(null);
  const [resetForm, setResetForm] = useState(() => () => {});

  const handleOpen = () => {
    setModalOpen(true);
  }

  const handleClose = (resetForm) => {
    console.log(typeof resetForm, resetForm, "type of reset form");
    setModalOpen(false);
    if (resetForm) {
      resetForm();
    }
  };
  
  const handleSuccess = (data) => {
    console.log("Data fetched successfully:", data);
    dispatch(setCharts(data?.data));
  };

  const handleError = (error) => {
    console.error("Error fetching data:", error);
    // dispatch(setError(error.message));
  };

  useGetDashboardCharts({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  console.log(charts, "charts from redux-toolkit");
  console.log(isDeleteModalOpen, "isDeleteModalOpen");

  const { mutate: deleteChart } = useChartDelete(
    () => {
      dispatch(removeChart(selectedId));
      setIsDeleteModalOpen(!isDeleteModalOpen);
    },
    (error) => {
      console.error("Error deleting chart:", error);
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
    setSelectedChart(null);
    handleOpen();
  };
  const handleEditCard = useCallback((chart) => {
    setSelectedChart(chart);
    handleOpen();
  }, []);

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ textAlign: "right" }}>
        <Button
          size="small"
          variant="contained"
          onClick={handleAddNewCard}
          sx={{ textTransform: "capitalize", mb: 2 }}
          endIcon={<Addchart />}
        >
          Add new
        </Button>
        <AddNewCardModal
          open={modalOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          selectedChart={selectedChart}
          setResetForm={setResetForm}
        />
      </Box>
      <Grid container spacing={2}>
        {charts?.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={3} lg={4} key={item?.id}>
              <ChartCard
                title={item?.cardTitle}
                description="Chart showing data trends"
                memoryUsed="207MB"
                data= {item?.chartType !== 'stackedBar' ? chartData : stackedBarData}
                type={item?.chartType}
                legend={true}
                cartesianGrid={true}
                tooltip={true}
                handleOpen={() => handleOpen(item)}
                chartData={item}
                onEdit={() => handleEditCard(item)}
                handleClose={() => handleClose(resetForm)}
                id={item?.id}
                handleDeleteClick={(id) => handleDeleteChart(id)}
              />
            </Grid>
          );
        })}
      </Grid>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={cancelDelete}
      />
    </Box>
  );
};

export default Dashboard;
