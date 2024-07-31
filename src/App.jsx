import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeGrid from "./components/employee/EmployeeGrid";
import Footer from "./components/ui/Footer";
import Navigation from "./components/ui/Navigation";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<EmployeeGrid />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
