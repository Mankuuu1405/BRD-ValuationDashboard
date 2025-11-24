import React, { useState } from 'react';

const NewPropertyCheckModal = ({ isOpen, onClose }) => {
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ propertyName, propertyType, location, assignedTo });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          New Property Check
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Property Name */}
          <div>
            <label
              htmlFor="propertyName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Name
            </label>
            <input
              type="text"
              id="propertyName"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter property name"
            />
          </div>

          {/* Property Type */}
          <div>
            <label
              htmlFor="propertyType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Type
            </label>
            <input
              type="text"
              id="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Example: Residential, Commercial"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter location"
            />
          </div>

          {/* Assigned To */}
          <div>
            <label
              htmlFor="assignedTo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Assigned To
            </label>
            <select
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="">Select Agent</option>
              <option>Vikram Mehta</option>
              <option>Priya Sharma</option>
              <option>Rajesh Kumar</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
            >
              Create Check
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPropertyCheckModal;
