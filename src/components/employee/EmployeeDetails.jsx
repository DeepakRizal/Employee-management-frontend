/* eslint-disable react/prop-types */
const EmployeeDetails = ({ employee }) => {
  return (
    <div>
      <p>
        <strong>Name:</strong> {employee.name}
      </p>
      <p>
        <strong>Address:</strong> {employee.address}
      </p>
      <p>
        <strong>Age:</strong> {employee.age}
      </p>
      <p>
        <strong>Department:</strong> {employee.department}
      </p>
      <p>
        <strong>Status:</strong> {employee.status}
      </p>
    </div>
  );
};

export default EmployeeDetails;
