import React from 'react';

const ViewAuditDetailsModal = ({ isOpen, onClose, auditDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Audit Details</h2>
        {auditDetails ? (
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Audit ID:</p>
              <p>{auditDetails['Audit ID']}</p>
            </div>
            <div>
              <p className="font-semibold">Department:</p>
              <p>{auditDetails['Department']}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p>{auditDetails['Status']}</p>
            </div>
            <div>
              <p className="font-semibold">Due Date:</p>
              <p>{auditDetails['Due Date']}</p>
            </div>
          </div>
        ) : (
          <p>No audit details available.</p>
        )}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAuditDetailsModal;
