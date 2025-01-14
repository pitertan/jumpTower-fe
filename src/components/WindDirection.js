import React, { useState, useEffect } from "react";
import styled from "styled-components";
import windDirectionImage from "../assets/wind-direction.PNG"; // Pastikan gambar ini diimpor

// Wrapper untuk gambar latar belakang dan kompas (disusun secara vertikal)
const WindWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  margin: 0 auto;
`;

// Desain kompas dengan gaya minimalis dan indikator arah mata angin
const CompassWrapper = styled.div`
  width: 200px;
  height: 200px;
  border: 4px solid #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  position: relative;
  margin-bottom: 20px;
  transition: transform 1s ease-out; /* Animasi halus untuk perubahan arah kompas */
`;

// Menambahkan indikator arah mata angin
const DirectionLabel = styled.div`
  position: absolute;
  font-size: 16px;
  font-weight: bold;
  color: ${({ direction }) => direction};
`;

const North = styled(DirectionLabel)`
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #ff7043;
`;

const East = styled(DirectionLabel)`
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #64b5f6;
`;

const South = styled(DirectionLabel)`
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #81c784;
`;

const West = styled(DirectionLabel)`
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ffeb3b;
`;

// Jarum kompas dengan transisi smooth
const Arrow = styled.div`
  position: absolute;
  width: 4px;
  height: 60px;
  background-color: rgb(255, 0, 0);
  transform-origin: bottom;
  transform: rotate(${({ angle }) => angle}deg);
  top: 42px;
  left: 50%;
  margin-left: -2px;
  border-radius: 2px;
  transition: transform 1s ease-out; /* Transisi halus untuk arah jarum kompas */
`;

// Dot indikator pada posisi tertentu berdasarkan koordinat spesifik
const DotWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ position }) => {
    switch (position) {
      case "north":
        return `
          top: 230px;
          left: -55%;
        `;
      case "east":
        return `
          top: 115%;
          right: -95px;
        `;
      case "south":
        return `
          top: 220%;
          left: 265px;
        `;
      case "west":
        return `
          top: 440px;
          left: -50%;
        `;
      default:
        return "";
    }
  }}
`;

const Dot = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ isSafe }) => (isSafe ? "green" : "red")};
  border-radius: 50%;
  margin-bottom: 5px;
  transition: background-color 0.5s ease-out; /* Transisi halus untuk perubahan warna */
`;

const DotLabel = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #fff;
`;

// Wrapper untuk gambar latar belakang
const ImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${windDirectionImage});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const calculateSafety = (windDirection, armDirection, tolerance = 20) => {
  // Menghitung perbedaan arah angin dan arah lengan
  const difference = Math.abs(windDirection - armDirection) % 360;
  
  // Rentang aman adalah 180 derajat ± tolerance (misalnya 160 - 200 derajat)
  return !(difference >= 180 - tolerance && difference <= 180 + tolerance);
};

const WindDirection = () => {
  const [windDirection, setWindDirection] = useState(0); // State untuk arah angin

  // Fungsi untuk memperbarui arah angin secara acak
  useEffect(() => {
    const interval = setInterval(() => {
      setWindDirection((prevDirection) => (prevDirection + Math.floor(Math.random() * 45)) % 360);
    }, 1000); // Perbarui setiap 1 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, []);

  return (
    <WindWrapper>
      <CompassWrapper>
        <North>N</North>
        <East>E</East>
        <South>S</South>
        <West>W</West>
        <Arrow angle={windDirection} />

        {/* Dot indikator dengan logika warna */}
        <DotWrapper position="north">
          <Dot
            isSafe={calculateSafety(windDirection, 0)} // 0 derajat untuk utara
          />
          <DotLabel>North</DotLabel>
        </DotWrapper>
        <DotWrapper position="east">
          <Dot
            isSafe={calculateSafety(windDirection, 90)} // 90 derajat untuk timur
          />
          <DotLabel>East</DotLabel>
        </DotWrapper>
        <DotWrapper position="south">
          <Dot
            isSafe={calculateSafety(windDirection, 180)} // 180 derajat untuk selatan
          />
          <DotLabel>South</DotLabel>
        </DotWrapper>
        <DotWrapper position="west">
          <Dot
            isSafe={calculateSafety(windDirection, 270)} // 270 derajat untuk barat
          />
          <DotLabel>West</DotLabel>
        </DotWrapper>
      </CompassWrapper>

      {/* Gambar visualisasi */}
      <ImageWrapper />
    </WindWrapper>
  );
};

export default WindDirection;
