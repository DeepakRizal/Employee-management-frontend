/* eslint-disable react/prop-types */

const EmployeeAuditTrail = ({ auditTrial }) => {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderChanges = (previousData, newData) => {
    const changes = [];
    for (const key in newData) {
      changes.push(
        <div key={key}>
          <p>
            <strong>{key}:</strong> {previousData[key]} &#x2192; {newData[key]}
          </p>
        </div>
      );
    }
    return changes;
  };

  return (
    <div className=" overflow-auto">
      <h3 className="text-lg font-bold underline mb-2">Audit Trail</h3>
      {auditTrial.length === 0 ? (
        <p>No audit trail available.</p>
      ) : (
        <ul>
          {auditTrial.map((record, index) => (
            <li key={index} className="mb-4">
              <p>
                <strong>Date:</strong> {formatDate(record.chnagedAt)}
              </p>
              <p>
                <strong>Changes:</strong>
              </p>
              <div className="ml-4">
                {renderChanges(record.previousData, record.newData)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeAuditTrail;
