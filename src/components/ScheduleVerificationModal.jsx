import React, { useState, useEffect } from "react";

const ScheduleVerificationModal = ({ isOpen, onClose, verificationId }) => {
  const [propertyId, setPropertyId] = useState("");
  const [date, setDate] = useState("");
  const [agent, setAgent] = useState("");

  useEffect(() => {
    if (isOpen && verificationId) {
      setPropertyId(verificationId);
    } else if (!isOpen) {
      setPropertyId("");
      setDate("");
      setAgent("");
    }
  }, [isOpen, verificationId]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ propertyId, date, agent });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Schedule Verification
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Property ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property ID
            </label>
            <input
              type="text"
              id="propertyId"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition shadow-sm placeholder:text-gray-400"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition shadow-sm"
            />
          </div>

          {/* Agent */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign Agent
            </label>
            <select
              id="agent"
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition shadow-sm"
            >
              <option value="">Select Agent</option>
              <option>Priya Singh</option>
              <option>Amit Kumar</option>
              <option>Rajesh Sharma</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 
                         text-gray-700 rounded-lg transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 
                         text-white rounded-lg shadow-md transition"
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
