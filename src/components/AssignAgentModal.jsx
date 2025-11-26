import React, { useState, useEffect } from "react";

const AssignAgentModal = ({ isOpen, onClose, verificationId }) => {
  const [currentVerificationId, setCurrentVerificationId] = useState("");
  const [agent, setAgent] = useState("");

  useEffect(() => {
    if (isOpen && verificationId) {
      setCurrentVerificationId(verificationId);
    } else if (!isOpen) {
      setCurrentVerificationId("");
      setAgent("");
    }
  }, [isOpen, verificationId]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ currentVerificationId, agent });
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
          Assign Agent
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Verification ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification ID
            </label>
            <input
              type="text"
              value={currentVerificationId}
              onChange={(e) => setCurrentVerificationId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white 
                         shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 transition placeholder:text-gray-400"
            />
          </div>

          {/* Select Agent */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Agent
            </label>
            <select
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white 
                         shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 transition"
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
              Assign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignAgentModal;
