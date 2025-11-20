
import React, { useState, useEffect } from 'react';

const ScheduleVerificationModal = ({ isOpen, onClose, verificationId }) => {
  const [propertyId, setPropertyId] = useState('');
  const [date, setDate] = useState('');
  const [agent, setAgent] = useState('');

  useEffect(() => {
    if (isOpen && verificationId) {
      setPropertyId(verificationId);
    } else if (!isOpen) {
      // Reset form when modal closes
      setPropertyId('');
      setDate('');
      setAgent('');
    }
  }, [isOpen, verificationId]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ propertyId, date, agent });
    // Add logic to schedule verification
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-xl shadow-2xl max-w-md mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700">Property ID</label>
            <input type="text" id="propertyId" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="mb-6">
            <label htmlFor="agent" className="block text-sm font-medium text-gray-700">Assign Agent</label>
            <select id="agent" value={agent} onChange={(e) => setAgent(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Agent</option>
              <option>Priya Singh</option>
              <option>Amit Kumar</option>
              <option>Rajesh Sharma</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleVerificationModal;
