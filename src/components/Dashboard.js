import React, { useState, useEffect } from "react";
import TowerVisualization from "./TowerVisualization";
import WindDirection from "./WindDirection";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Menggunakan min-height agar bisa menyesuaikan panjang konten */
  background-color: #111; /* Background lebih gelap mendekati hitam */
  justify-content: flex-start; /* Untuk menempatkan konten di atas */
  align-items: center; /* Center konten secara horizontal */
`;

const DashboardTitle = styled.h1`
  color: rgb(3, 206, 0);
  text-align: center;
  font-size: 32px;
  margin-top: 20px;
  font-weight: bold;
  margin-bottom: 60px; /* Menambahkan jarak antara judul dan dashboard */
`;

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start; /* Flex-start agar konten berada di atas */
  gap: 20px;
  width: 100%; /* Full width */
  margin-bottom: 20px; /* Memberikan ruang di bawah konten */
`;

const Sidebar = styled.div`
  width: 45%; /* Lebar sidebar */
`;

const MainContent = styled.div`
  width: 45%; /* Lebar konten utama */
`;

const ChartWrapper = styled.div`
  width: 80%; /* Lebar chart */
  max-width: 900px; /* Batasi lebar maksimal */
  height: 300px; /* Tentukan tinggi chart */
  margin: 20px auto; /* Agar berada di tengah dengan margin atas bawah */
  border: 2px solid #fff; /* Border putih */
  border-radius: 8px; /* Sudut melengkung */
  padding: 10px; /* Padding untuk jarak dalam chart */
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2); /* Efek bayangan untuk kedalaman */
  background-color: #222; /* Latar belakang chart */
`;

const Dashboard = () => {
  const [windSpeeds, setWindSpeeds] = useState([8, 12, 15]); // Simulasi kecepatan angin
  const [windDirection] = useState(90); // Simulasi arah angin (derajat)
  const armDirections = [0, 90, 180, 270]; // Arah lengan
  const [speedHistory, setSpeedHistory] = useState([]); // Menyimpan riwayat kecepatan angin untuk grafik
  const [labels, setLabels] = useState([]); // Menyimpan label untuk grafik (waktu)

  // Menambahkan data ke grafik setiap detik
  useEffect(() => {
    const interval = setInterval(() => {
      const newWindSpeeds = [
        Math.floor(Math.random() * 20), // Kecepatan angin acak 0-20 m/s untuk sensor pertama
        Math.floor(Math.random() * 20), // Kecepatan angin acak 0-20 m/s untuk sensor kedua
        Math.floor(Math.random() * 20), // Kecepatan angin acak 0-20 m/s untuk sensor ketiga
      ];

      setWindSpeeds(newWindSpeeds);

      // Simpan data kecepatan angin dalam riwayat dan buat label waktu
      setSpeedHistory((prevHistory) => {
        const newHistory = [
          ...prevHistory,
          newWindSpeeds.reduce((a, b) => a + b, 0) / newWindSpeeds.length, // Rata-rata kecepatan angin
        ];

        // Hanya simpan 10 data terbaru
        return newHistory.slice(-10);
      });

      setLabels((prevLabels) => {
        const newLabels = [...prevLabels, new Date().toLocaleTimeString()];

        // Hanya simpan 10 label terbaru
        return newLabels.slice(-10);
      });
    }, 1000); // Pembaruan data setiap 1 detik

    return () => clearInterval(interval); // Membersihkan interval ketika komponen di-unmount
  }, [windSpeeds]);

  // Data untuk grafik
  const chartData = {
    labels: labels, // Label waktu
    datasets: [
      {
        label: "Average Wind Speed (m/s)",
        data: speedHistory,
        fill: false,
        borderColor: "rgb(3, 206, 0)",
        tension: 0.1, // Membuat garis grafik lebih smooth
      },
    ],
  };

  // Opsi konfigurasi untuk chart
  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "white", // Mengubah warna teks legend menjadi putih
          font: {
            size: 14, // Ukuran font teks legend
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.23)", // Mengatur warna grid garis sumbu X
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.23)", // Mengatur warna grid garis sumbu Y
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2, // Ketebalan garis chart
      },
      point: {
        radius: 4, // Ukuran titik pada grafik
      },
    },
    responsive: true, // Membuat chart responsif terhadap ukuran layar
    maintainAspectRatio: false, // Menyesuaikan ukuran chart dengan wrapper
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

      {/* Tempat untuk grafik di bawah */}
      <ChartWrapper>
        <Line data={chartData} options={chartOptions} />
      </ChartWrapper>
    </PageWrapper>
  );
};

export default Dashboard;
