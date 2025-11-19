import React from 'react';

const AuditDetailsModal = ({ isOpen, onClose, audit }) => {
  if (!isOpen || !audit) return null;

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'green',
      'In Progress': 'blue',
      'Scheduled': 'yellow',
      'Delayed': 'red'
    };
    return colors[status] || 'gray';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Critical': 'red',
      'High': 'orange',
      'Medium': 'yellow',
      'Low': 'green'
    };
    return colors[priority] || 'gray';
  };
  
  const getSeverityColor = (severity) => {
    const colors = {
      'High': 'red',
      'Medium': 'yellow',
      'Low': 'green'
    };
    return colors[severity] || 'gray';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{audit.department} Department Audit</h2>
            <p className="text-sm text-gray-500">{audit.id} - {audit.type} Audit</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Auditor</p>
            <p className="font-medium text-gray-900">{audit.auditor}</p>
          </div>
          <div>
            <p className="text-gray-600">Timeline</p>
            <p className="font-medium text-gray-900">{audit.startDate} - {audit.endDate}</p>
          </div>
          <div>
            <p className="text-gray-600">Status</p>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-${getStatusColor(audit.status)}-100 text-${getStatusColor(audit.status)}-800`}>
              {audit.status}
            </span>
          </div>
          <div>
            <p className="text-gray-600">Priority</p>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-${getPriorityColor(audit.priority)}-100 text-${getPriorityColor(audit.priority)}-800`}>
              {audit.priority}
            </span>
          </div>
          <div>
            <p className="text-gray-600">Findings</p>
            <p className="font-medium text-gray-900">{audit.findings} issues</p>
          </div>
          <div>
            <p className="text-gray-600">Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className={`bg-blue-600 h-2.5 rounded-full`} style={{ width: `${audit.completion}%` }}></div>
            </div>
            <p className="text-right text-xs text-gray-500">{audit.completion}%</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Documents Under Review</h3>
          <div className="flex flex-wrap gap-2">
            {audit.documents.map((doc, index) => (
              <span key={index} className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                {doc}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Observations</h3>
          <div className="space-y-3">
            {audit.observations.map((obs) => (
              <div key={obs.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-${getSeverityColor(obs.severity)}-100 text-${getSeverityColor(obs.severity)}-800`}>
                  {obs.severity}
                </span>
                <p className="text-sm text-gray-700">{obs.description}</p>
              </div>
            ))}
            {audit.observations.length === 0 && (
              <p className="text-sm text-gray-500">No observations recorded yet.</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
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

export default AuditDetailsModal;
