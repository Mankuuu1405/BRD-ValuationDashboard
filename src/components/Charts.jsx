import React from 'react';
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
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import Chart from 'react-google-charts';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Line Chart Component
export const LineChart = ({ data, title, height = 300 }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: !!title, text: title },
    },
  };

  return (
    <div style={{ height }}>
      <Line options={options} data={data} />
    </div>
  );
};

// Bar Chart Component
export const BarChart = ({ data, title, height = 300 }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: !!title, text: title },
    },
  };

  return (
    <div style={{ height }}>
      <Bar options={options} data={data} />
    </div>
  );
};

// Pie Chart Component (solid chart)
export const PieChart = ({ data, title, height = 300 }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
      title: { display: !!title, text: title },
    },
  };

  return (
    <div style={{ height }}>
      <Pie options={options} data={data} />
    </div>
  );
};

// ⭐ NEW: GeoChart Component (Google Charts)
// export const GeoChart = ({ data, title, height = 300 }) => {
//   const chartData = [
//     ["City", "Count"],
//     ...data.map((item) => [`${item.place}, India`, item.count]),
//   ];

//   const options = {
//     region: "IN",
//     resolution: "provinces",
//     displayMode: "markers",
//     colorAxis: { colors: ["#93c5fd", "#2563eb"] },
//     backgroundColor: "#ffffff",
//     datalessRegionColor: "#e5e7eb",
//     defaultColor: "#2563eb",
//     markerOpacity: 0.9,
//   };

//   return (
//     <div style={{ height }}>
//       {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
//       <Chart
//         chartType="GeoChart"
//         width="100%"
//         height="100%"
//         data={chartData}
//         options={options}
//       />
//     </div>
//   );
// };

