import React from 'react';
import Modal from 'react-modal';

const ViewReportModal = ({ isOpen, onRequestClose, report }) => {
  if (!report) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="View Report"
      className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-xl font-bold mb-4">Report Details</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Report ID:</h3>
          <p>{report.id}</p>
        </div>
        <div>
          <h3 className="font-semibold">Title:</h3>
          <p>{report.title}</p>
        </div>
        <div>
          <h3 className="font-semibold">Date:</h3>
          <p>{report.date}</p>
        </div>
        <div>
          <h3 className="font-semibold">Type:</h3>
          <p>{report.type}</p>
        </div>
        <div>
          <h3 className="font-semibold">Content:</h3>
          <p className="prose">{report.content || 'No additional content available.'}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onRequestClose}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ViewReportModal;