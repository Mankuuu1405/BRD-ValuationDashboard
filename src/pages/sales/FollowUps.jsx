import React, { useState } from 'react';
import FollowUpModal from '../../components/FollowUpModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';

const FollowUps = () => {
  const [query, setQuery] = useState('');
  const [isFollowUpModalOpen, setFollowUpModalOpen] = useState(false);
  const [selectedFollowUp, setSelectedFollowUp] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [followUpToDelete, setFollowUpToDelete] = useState(null);

  const openDeleteModal = (followUp) => {
    setFollowUpToDelete(followUp);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setFollowUpToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleDeleteFollowUp = () => {
    setFollowUps(followUps.filter((f) => f.id !== followUpToDelete.id));
    closeDeleteModal();
  };

  const handleCompleteFollowUp = (id) => {
    setFollowUps(
      followUps.map((f) =>
        f.id === id ? { ...f, status: 'Completed', nextFollowUp: 'N/A' } : f
      )
    );
  };


  const openFollowUpModal = (followUp) => {
    setSelectedFollowUp(followUp);
    setFollowUpModalOpen(true);
  };

  const closeFollowUpModal = () => {
    setSelectedFollowUp(null);
    setFollowUpModalOpen(false);
  };

  const handleSaveFollowUp = (followUpData) => {
    if (followUpData.id) {
      // Update existing follow-up
      setFollowUps(followUps.map((f) => (f.id === followUpData.id ? { ...f, ...followUpData } : f)));
    } else {
      // Create new follow-up
      const newId = Math.max(...followUps.map(f => f.id)) + 1; // Simple ID generation
      setFollowUps([...followUps, { ...followUpData, id: newId }]);
    }
    closeFollowUpModal();
  };

  const [followUps, setFollowUps] = useState([
    {
      id: 1,
      customer: 'Aman Shah',
      leadId: 'LD-1001',
      nextFollowUp: '2025-11-06',
      owner: 'Rohit',
      channel: 'Call',
      status: 'Pending',
      notes: 'Discussed eligibility, awaiting documents',
    },
    {
      id: 2,
      customer: 'Priya Mehta',
      leadId: 'LD-1005',
      nextFollowUp: '2025-11-05',
      owner: 'Anita',
      channel: 'Email',
      status: 'Completed',
      notes: 'Sent follow-up email with application form',
    },
    {
      id: 3,
      customer: 'Rahul Verma',
      leadId: 'LD-1012',
      nextFollowUp: '2025-11-10',
      owner: 'Rohit',
      channel: 'WhatsApp',
      status: 'Pending',
      notes: 'Confirm income proof during next call',
    },
    {
      id: 4,
      customer: 'Sneha Kapoor',
      leadId: 'LD-1020',
      nextFollowUp: '2025-11-04',
      owner: 'Anita',
      channel: 'Call',
      status: 'Overdue',
      notes: 'Customer missed scheduled call',
    },
  ]);

  const filtered = followUps.filter(f =>
    `${f.customer} ${f.leadId} ${f.owner} ${f.channel} ${f.status}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Follow-ups</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track next follow-up actions for leads.</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, lead, owner or status"
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button onClick={() => openFollowUpModal(null)} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">New Follow-up</button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Total Follow-ups</div>
          <div className="text-2xl font-bold text-gray-900 mt-2">{followUps.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-2xl font-bold text-yellow-600 mt-2">{followUps.filter(f => f.status==='Pending').length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Completed</div>
          <div className="text-2xl font-bold text-green-600 mt-2">{followUps.filter(f => f.status==='Completed').length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Overdue</div>
          <div className="text-2xl font-bold text-red-600 mt-2">{followUps.filter(f => f.status==='Overdue').length}</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold">Follow-up List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Follow-up</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.leadId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nextFollowUp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.channel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${item.status==='Pending' ? 'bg-yellow-100 text-yellow-800' : item.status==='Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.notes}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => openFollowUpModal(item)} className="text-teal-600 hover:text-teal-900 mr-3">Edit</button>
                    <button onClick={() => handleCompleteFollowUp(item.id)} className="text-blue-600 hover:text-blue-900 mr-3">Complete</button>
                    <button onClick={() => openDeleteModal(item)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">No follow-ups match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <FollowUpModal isOpen={isFollowUpModalOpen} onClose={closeFollowUpModal} followUp={selectedFollowUp} onSave={handleSaveFollowUp} />
    </div>
  );
};

export default FollowUps;
