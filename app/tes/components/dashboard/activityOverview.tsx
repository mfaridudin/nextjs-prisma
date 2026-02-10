"use client";

import React from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "@/app/tes/components/shared/DashboardCard";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ActivityOverview = () => {
  const [month, setMonth] = React.useState("1");

  const handleChange = (event: any) => {
    setMonth(event.target.value);
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const options: any = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: { show: false },
      height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "42%",
        borderRadius: 6,
        borderRadiusApplication: "end",
      },
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
    },
    xaxis: {
      categories: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
      ],
      axisBorder: { show: false },
    },
    yaxis: {
      tickAmount: 4,
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };

  const series: any = [
    {
      name: "Lessons Created",
      data: [12, 18, 15, 20],
    },
    {
      name: "Student Submissions",
      data: [40, 55, 48, 60],
    },
  ];

  return (
    <DashboardCard
      title="Activity Overview"
      action={
        <Select
          size="small"
          value={month}
          onChange={handleChange}
        >
          <MenuItem value={1}>March 2025</MenuItem>
          <MenuItem value={2}>April 2025</MenuItem>
          <MenuItem value={3}>May 2025</MenuItem>
        </Select>
      }
    >
      <Chart
        options={options}
        series={series}
        type="bar"
        height={370}
        width="100%"
      />
    </DashboardCard>
  );
};

export default ActivityOverview;
