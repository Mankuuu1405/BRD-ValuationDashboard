import React from 'react';

const ViewPropertyDetailsModal = ({ isOpen, onClose, property }) => {
  if (!isOpen || !property) return null;

  const statusClasses = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Not Started': 'bg-gray-100 text-gray-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'not-started': 'bg-gray-100 text-gray-800'
  };

  const getStatusClass = (status) => statusClasses[status] || 'bg-gray-100 text-gray-800';

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b pb-3">{property.name}</h2>
        
        {/* Property Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <p className="text-gray-700"><span className="font-medium">Property ID:</span> {property.id}</p>
            <p className="text-gray-700"><span className="font-medium">Type:</span> {property.type}</p>
            <p className="text-gray-700"><span className="font-medium">Location:</span> {property.location}</p>
            <p className="text-gray-700"><span className="font-medium">Assigned To:</span> {property.assignedTo}</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Status:</span>{' '}
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(property.status)}`}>
                {property.status}
              </span>
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Priority:</span>{' '}
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(property.priority)}`}>
                {property.priority}
              </span>
            </p>
            <p className="text-gray-700"><span className="font-medium">Last Check:</span> {property.lastCheck}</p>
          </div>
        </div>

        {/* Check Items */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Check Items</h3>
          <ul className="space-y-2">
            {property.checkItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <span className="text-gray-700">{item.item}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(item.status)}`}>
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPropertyDetailsModal;
