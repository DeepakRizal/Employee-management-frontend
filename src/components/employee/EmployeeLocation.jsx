/* eslint-disable react/prop-types */
// src/components/EmployeeLocation.js

import Map from "./Map";

const EmployeeLocation = ({ employee }) => {
  return (
    <div>
      <h3 className="text-lg mb-2">Employee Location</h3>
      <Map location={employee.address} />
    </div>
  );
};

export default EmployeeLocation;
