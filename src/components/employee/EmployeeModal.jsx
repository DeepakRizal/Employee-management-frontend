/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateEmployee,
  deleteEmployee,
} from "../../redux/actions/employeeActions";
import EmployeeDetails from "./EmployeeDetails";
import EmployeeLocation from "./EmployeeLocation";
import EmployeeAuditTrail from "./EmployeeAuditTrail";

const EmployeeModal = ({ auditTrial, employee, onClose }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState({
    name: employee.name || "",
    address: employee.address || "",
    age: employee.age || "",
    department: employee.department || "",
    status: employee.status || "",
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const updatedFields = {};
    for (const key in formData) {
      if (formData[key] !== employee[key]) {
        updatedFields[key] = formData[key];
      }
    }

    if (Object.keys(updatedFields).length > 0) {
      dispatch(updateEmployee({ data: updatedFields, id: employee._id })).then(
        onClose
      );
    } else {
      alert("No changes detected.");
    }
  };

  const handleDelete = () => {
    dispatch(deleteEmployee(employee._id)).then(onClose);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto px-10 md:px-20 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-4 rounded w-full max-w-3xl mx-auto overflow-hidden shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Employee Details</h2>
          <button className="text-red-500 hover:text-red-700" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="flex flex-wrap mb-4">
          <button
            className={`flex-1 px-4 py-2 mb-2 md:mb-0 md:mr-2 ${
              activeTab === "details" ? "bg-gray-800 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`flex-1 px-4 py-2 mb-2 md:mb-0 md:mr-2 ${
              activeTab === "location"
                ? "bg-gray-800 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("location")}
          >
            Location
          </button>
          <button
            className={`flex-1 px-4 py-2 mb-2 md:mb-0 ${
              activeTab === "audit" ? "bg-gray-800 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("audit")}
          >
            Audit Trail
          </button>
        </div>
        <div className="overflow-y-auto max-h-[60vh]">
          {activeTab === "details" && (
            <div>
              <EmployeeDetails employee={employee} />
              <div className="mt-4">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
                <label className="block text-sm font-medium mt-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
                <label className="block text-sm font-medium mt-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
                <label className="block text-sm font-medium mt-2">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
                <label className="block text-sm font-medium mt-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                >
                  <option value="Remote Location">Remote Location</option>
                  <option value="Contract Employee">Contract Employee</option>
                  <option value="Full-Time">Full-Time</option>
                </select>
                <div className="flex justify-between mt-4 space-x-2">
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "location" && <EmployeeLocation employee={employee} />}
          {activeTab === "audit" && (
            <EmployeeAuditTrail auditTrial={auditTrial} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
