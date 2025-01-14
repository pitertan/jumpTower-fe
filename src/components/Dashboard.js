import React, { useState, useEffect } from "react";
import TowerVisualization from "./TowerVisualization";
import WindDirection from "./WindDirection";
import WindSpeedChart from "./WindSpeedChart"; // Import komponen chart
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #111;
  justify-content: flex-start;
  align-items: center;
`;

const DashboardTitle = styled.h1`
  color: rgb(3, 206, 0);
  text-align: center;
  font-size: 32px;
  margin-top: 20px;
  font-weight: bold;
  margin-bottom: 60px;
`;

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
`;

const Sidebar = styled.div`
  width: 45%;
`;

const MainContent = styled.div`
  width: 45%;
`;

const ChartWrapper = styled.div`
  width: 80%;
  max-width: 900px;
  height: 300px;
  margin: 20px auto;
  border: 2px solid #fff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
  background-color: #222;
`;

const Dashboard = () => {
  const [windSpeeds, setWindSpeeds] = useState([8, 12, 15]);
  const [windDirection] = useState(90);
  const armDirections = [0, 90, 180, 270];
  const [speedHistory, setSpeedHistory] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newWindSpeeds = [
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
      ];

      setWindSpeeds(newWindSpeeds);

      setSpeedHistory((prevHistory) => {
        const newHistory = [
          ...prevHistory,
          newWindSpeeds.reduce((a, b) => a + b, 0) / newWindSpeeds.length,
        ];
        return newHistory.slice(-10);
      });

      setLabels((prevLabels) => {
        const newLabels = [...prevLabels, new Date().toLocaleTimeString()];
        return newLabels.slice(-10);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Average Wind Speed (m/s)",
        data: speedHistory,
        fill: false,
        borderColor: "rgb(3, 206, 0)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      x: { grid: { color: "rgba(255, 255, 255, 0.23)" } },
      y: { grid: { color: "rgba(255, 255, 255, 0.23)" } },
    },
    elements: {
      line: { borderWidth: 2 },
      point: { radius: 4 },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <PageWrapper>
      <DashboardTitle>Wind Monitoring System Jump Tower SEPARA</DashboardTitle>
      <DashboardWrapper>
        <Sidebar>
          <TowerVisualization windSpeeds={windSpeeds} />
        </Sidebar>
        <MainContent>
          <WindDirection windDirection={windDirection} armDirections={armDirections} />
        </MainContent>
      </DashboardWrapper>
      <ChartWrapper>
        <WindSpeedChart chartData={chartData} chartOptions={chartOptions} />
      </ChartWrapper>
    </PageWrapper>
  );
};

export default Dashboard;
