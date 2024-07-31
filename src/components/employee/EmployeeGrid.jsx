/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchEmployees } from "../../redux/actions/employeeActions";
import EmployeeModal from "./EmployeeModal";
import AddEmployeeModal from "./AddEmployeeModal";

const EmployeeGrid = () => {
  const dispatch = useDispatch();

  const { employees, loading, error, auditTrial } = useSelector(
    (state) => state.employeeList
  );

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
  };

  const handleAddEmployeeClick = () => {
    setShowAddEmployeeModal(true);
  };

  const closeAddEmployeeModal = () => {
    setShowAddEmployeeModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/4 px-4 py-2">Name</th>
                <th className="w-1/4 px-4 py-2">Department</th>
                <th className="w-1/4 px-4 py-2">Status</th>
                <th className="w-1/4 px-4 py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((employee) => (
                <tr
                  key={employee._id}
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => handleRowClick(employee)}
                >
                  <td className="border px-4 py-2">{employee.name}</td>
                  <td className="border px-4 py-2">{employee.department}</td>
                  <td className="border px-4 py-2">{employee.status}</td>
                  <td className="border px-4 py-2">{employee.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleAddEmployeeClick}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Add Employee
          </button>
          {selectedEmployee && (
            <EmployeeModal
              auditTrial={auditTrial}
              employee={selectedEmployee}
              onClose={closeModal}
            />
          )}
          {showAddEmployeeModal && (
            <AddEmployeeModal onClose={closeAddEmployeeModal} />
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeGrid;
