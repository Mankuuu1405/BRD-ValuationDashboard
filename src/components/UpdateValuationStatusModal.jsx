
import React, { useState, useEffect } from 'react';

const UpdateValuationStatusModal = ({ isOpen, onClose, currentStatus, onUpdateStatus }) => {
  const [status, setStatus] = useState(currentStatus);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(status);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Update Valuation Status</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">New Status</label>
            <select 
              id="status" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Verified</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateValuationStatusModal;
