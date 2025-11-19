import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NewLeadModal from '../../components/NewLeadModal';
import ChangeStatusModal from '../../components/ChangeStatusModal';

const LeadDetails = () => {
  const { id } = useParams();
  const [isNewLeadModalOpen, setNewLeadModalOpen] = useState(false);
  const [isChangeStatusModalOpen, setChangeStatusModalOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  const openNewLeadModal = () => setNewLeadModalOpen(true);
  const closeNewLeadModal = () => setNewLeadModalOpen(false);

  const openChangeStatusModal = () => setChangeStatusModalOpen(true);
  const closeChangeStatusModal = () => setChangeStatusModalOpen(false);

  // Fetch lead data based on id
  const [lead, setLead] = useState({
    id: id,
    name: 'Acme Corporation',
    contact: 'John Smith',
    email: 'john.smith@acme.com',
    phone: '+1-555-123-4567',
    source: 'Website',
    status: 'New',
    value: '₹250,000',
    lastContact: '2 hours ago',
    notes: [
      { id: 1, user: 'Jane Doe', note: 'Initial contact made. Sent introductory email.', timestamp: '2025-11-05T10:30:00Z' },
      { id: 2, user: 'Jane Doe', note: 'Follow-up call scheduled for tomorrow.', timestamp: '2025-11-05T14:00:00Z' },
    ],
  });

  const handleAddNote = () => {
    if (newNoteText.trim() === '') return;
    const newNote = {
      id: lead.notes.length + 1, // Simple ID generation
      user: 'Current User', // Placeholder for current user
      note: newNoteText,
      timestamp: new Date().toISOString(),
    };
    setLead({ ...lead, notes: [...lead.notes, newNote] });
    setNewNoteText('');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
        <div className="flex gap-4">
          <button onClick={openNewLeadModal} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Edit Lead</button>
          <button onClick={openChangeStatusModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Change Status</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Lead Information</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Contact Person</h4>
              <p className="text-lg text-gray-900">{lead.contact}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Email</h4>
              <p className="text-lg text-gray-900">{lead.email}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Phone</h4>
              <p className="text-lg text-gray-900">{lead.phone}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Source</h4>
              <p className="text-lg text-gray-900">{lead.source}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Lead Status</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Current Status</h4>
              <p className="text-lg font-bold text-blue-600">{lead.status}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Lead Value</h4>
              <p className="text-lg font-bold text-green-600">{lead.value}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Last Contact</h4>
              <p className="text-lg text-gray-900">{lead.lastContact}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Notes & Activity</h3>
        <div className="space-y-4">
          {lead.notes.map((note) => (
            <div key={note.id} className="border-b pb-4">
              <p className="text-gray-800">{note.note}</p>
              <p className="text-sm text-gray-500 mt-2">- {note.user} on {new Date(note.timestamp).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            placeholder="Add a new note..."
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
          ></textarea>
          <button onClick={handleAddNote} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Note</button>
        </div>
      </div>

      <NewLeadModal
        isOpen={isNewLeadModalOpen}
        onClose={closeNewLeadModal}
        lead={lead} // Pass the lead object for editing
        onSave={(updatedLead) => {
          setLead((prevLead) => ({ ...prevLead, ...updatedLead }));
          closeNewLeadModal();
        }}
      />
      <ChangeStatusModal
        isOpen={isChangeStatusModalOpen}
        onClose={closeChangeStatusModal}
        currentStatus={lead.status}
        onChangeStatus={(newStatus) => {
          setLead((prevLead) => ({ ...prevLead, status: newStatus }));
          closeChangeStatusModal();
        }}
      />
    </div>
  );
};

export default LeadDetails;
