import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../redux/actions/dashBoardActions";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Employee Data",
        data: data.map((item) => item.value),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="flex items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-6 mx-4 sm:mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center sm:text-left">
          Employee Dashboard
        </h1>
        {loading ? (
          <p className="text-gray-600 text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-600 text-center">Error: {error}</p>
        ) : (
          <div className="relative ">
            <Bar data={chartData} options={options} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
