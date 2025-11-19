
import React, { useState, useEffect } from 'react';

const StartVisitModal = ({ isOpen, onClose, verificationId }) => {
  const [visitNotes, setVisitNotes] = useState('');
  const [status, setStatus] = useState('In Progress');

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setVisitNotes('');
      setStatus('In Progress');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Starting visit for ${verificationId} with notes: ${visitNotes} and status: ${status}`);
    // Add logic to update visit status and notes
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Start Visit for {verificationId}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="visitNotes" className="block text-sm font-medium text-gray-700">Visit Notes</label>
            <textarea id="visitNotes" value={visitNotes} onChange={(e) => setVisitNotes(e.target.value)} rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
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
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save Visit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartVisitModal;
