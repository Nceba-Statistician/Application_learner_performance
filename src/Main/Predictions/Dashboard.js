import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // Register necessary components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {

    fetch("http://127.0.0.1:8000/items_get")
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json()
    }) // Process and set data for the chart
    .then(data => {
        console.log("Able to fetch data from an API", data);
        const processedData = {
            labels: data.map((item) => item.Age),
            datasets: [{
                label: "Y-axis",
                data: data.map((items) => items.GPA),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        }

        setChartData(processedData);
    })
    .catch(error => {
        console.log("Data not received: ", error)
    })

  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="chart-container">
        <Line data={chartData} options={{ responsive: true }} />
      </div>
      <div className="chart-container">
        <Bar data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Dashboard;
