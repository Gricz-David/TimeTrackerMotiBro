import React from "react";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Diagrams = ({ timecards }) => {
  // const barChartData = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       label: "Total Hours Worked",
  //       data: data,
  //       backgroundColor: "rgba(75, 192, 192, 0.2)",
  //       borderColor: "rgba(75, 192, 192, 1)",
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const pieChartData = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       data: data,
  //       backgroundColor: [
  //         "#FF6384",
  //         "#36A2EB",
  //         "#FFCE56",
  //         "#4BC0C0",
  //         "#FF9F40",
  //       ],
  //     },
  //   ],
  // };

  return (
    <div>
      <h3>Busiest Days</h3>
      {/* <Bar data={barChartData} /> */}

      <h3>Timecard Tag Distribution</h3>
      {/* <Pie data={pieChartData} /> */}
    </div>
  );
};

export default Diagrams;
