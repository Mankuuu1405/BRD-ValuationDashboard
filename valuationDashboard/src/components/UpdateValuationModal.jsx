import React from 'react';

const UpdateValuationModal = ({ isOpen, onClose, valuation }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-lg font-bold mb-4">Update Valuation</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select defaultValue={valuation.status} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Verified</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateValuationModal;