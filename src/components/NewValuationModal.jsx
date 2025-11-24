import React from "react";

const NewValuationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl border border-gray-200">
        
        <h2 className="text-xl font-semibold text-gray-900 mb-5 text-center">
          New Valuation Request
        </h2>

        <form className="space-y-5">

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <input
              type="text"
              placeholder="Apartment, Office, Land..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition shadow-sm placeholder:text-gray-400"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="City / Area / Street"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition shadow-sm placeholder:text-gray-400"
            />
          </div>

          {/* Request Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Request Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition shadow-sm"
            />
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
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NewValuationModal;
