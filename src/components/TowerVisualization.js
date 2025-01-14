import React, { useState, useEffect } from "react";
import styled from "styled-components";
import towerImage from "../assets/jump-tower.png";

const TowerWrapper = styled.div`
  position: relative;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  perspective: 1000px; /* Perspektif untuk efek 3D */
`;

const TowerImage = styled.img`
  width: auto;
  height: 100%;
  max-height: 700px; /* Batas tinggi */
  display: block;
  margin: 0 auto;
`;

const Sensor = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px; /* Jarak antara garis dan keterangan */
`;

const SensorDot = styled.div`
  background-color: ${({ color }) => color || "green"};
  width: ${({ size }) => size || "20px"};
  height: ${({ size }) => size || "20px"};
  border-radius: 50%;
  position: relative;
  top: -17px; /* Mengangkat titik sensor sedikit lebih tinggi */
  transition: background-color 0.5s, width 0.5s, height 0.5s; /* Transisi halus */
`;

const SensorInfo = styled.div`
  font-size: ${({ fontSize }) => fontSize || "12px"};
  color: ${({ color }) => color || "rgb(3, 206, 0)"};
  background-color: rgba(163, 163, 163, 0.31); /* Background abu-abu */
  padding: 0px 10px;
  border-radius: 4px;
  border: 2px solid ${({ borderColor }) => borderColor || "#02B300"};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  top: -17px; /* Menyesuaikan posisi lebih dekat dengan titik sensor */
  transition: all 0.5s ease-out; /* Transisi halus */
`;

const DottedLine = styled.div`
  position: absolute;
  height: 1px;
  border-top: 3px dashed #dbdbdb;
  width: calc(17% + 100px); /* Garis berhenti di tengah tower, ditambah jarak ke kanan */
  left: calc(64% - 100px); /* Mulai dari tengah gambar */
`;

const TowerVisualization = () => {
  const [windSpeeds, setWindSpeeds] = useState([0, 0, 0]);

  const sensorPositions = [
    { level: 25, top: "80%" },
    { level: 45, top: "55%" },
    { level: 73, top: "20%" },
  ];

  // Menghasilkan kecepatan angin acak setiap detik
  useEffect(() => {
    const interval = setInterval(() => {
      setWindSpeeds([
        Math.floor(Math.random() * 20), // Kecepatan angin acak 0-20 m/s untuk sensor pertama
        Math.floor(Math.random() * 20), // Kecepatan angin acak 0-20 m/s untuk sensor kedua
        Math.floor(Math.random() * 20), // Kecepatan angin acak 0-20 m/s untuk sensor ketiga
      ]);
    }, 1000); // Pembaruan data setiap 1 detik

    // Membersihkan interval ketika komponen di-unmount
    return () => clearInterval(interval);
  }, []);

  const getDotColor = (speed) => (speed > 10 ? "red" : "green");
  const getFontSize = (speed) => (speed > 10 ? "14px" : "12px");
  const getBorderColor = (speed) => (speed > 10 ? "red" : "#02B300");
  const getDotSize = (speed) => (speed > 10 ? "30px" : "20px");

  return (
    <TowerWrapper>
      <TowerImage src={towerImage} alt="Jump Tower" />
      {sensorPositions.map((pos, index) => (
        <React.Fragment key={index}>
          <DottedLine style={{ top: pos.top }} />
          <Sensor style={{ top: pos.top, right: "0px", transform: "none" }}>
            <SensorDot
              color={getDotColor(windSpeeds[index])}
              size={getDotSize(windSpeeds[index])}
            />
            <SensorInfo
              fontSize={getFontSize(windSpeeds[index])}
              color={getBorderColor(windSpeeds[index])}
              borderColor={getBorderColor(windSpeeds[index])}
            >
              <div>Speed: {windSpeeds[index]} m/s</div>
              <div>Height: {pos.level} m</div>
            </SensorInfo>
          </Sensor>
        </React.Fragment>
      ))}
    </TowerWrapper>
  );
};

export default TowerVisualization;
