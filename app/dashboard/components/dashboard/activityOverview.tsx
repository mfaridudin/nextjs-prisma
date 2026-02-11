"use client";

import React from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ActivityOverview = () => {
  const [month, setMonth] = React.useState("2");

  const [series, setSeries] = React.useState<any>([
    {
      name: "Lessons Created",
      data: [],
    },
    {
      name: "Student Submissions",
      data: [],
    },
  ]);

  const handleChange = (event: any) => {
    setMonth(event.target.value);
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  async function fetchActivity() {
    try {
      const res = await fetch(
        `/api/admin/activity-overview?month=${month}`
      );

      const data = await res.json();

      setSeries([
        {
          name: "Lessons Created",
          data: data.lessons,
        },
        {
          name: "Student Submissions",
          data: data.submissions,
        },
      ]);
    } catch (error) {
      console.error("Error fetch activity:", error);
    }
  }

  React.useEffect(() => {
    fetchActivity();
  }, [month]);

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
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      axisBorder: { show: false },
    },
    yaxis: {
      tickAmount: 4,
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };

  return (
    <DashboardCard
      title="Activity Overview"
      action={
        <Select size="small" value={month} onChange={handleChange}>
          <MenuItem value={2}>February 2026</MenuItem>
          <MenuItem value={3}>March 2026</MenuItem>
          <MenuItem value={4}>April 2026</MenuItem>
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
