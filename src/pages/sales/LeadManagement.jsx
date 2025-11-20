import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SimpleTable } from '../../components/DashboardComponents';
import PageHeading from '../../components/PageHeading';
import NewLeadModal from '../../components/NewLeadModal';

const LeadManagement = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [isNewLeadModalOpen, setNewLeadModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(5); // Display 5 leads per page
  const [expandedRow, setExpandedRow] = useState(null);

  const handleToggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const openNewLeadModal = () => setNewLeadModalOpen(true);
  const closeNewLeadModal = () => setNewLeadModalOpen(false);

  const fileInputRef = useRef(null);

  const handleImportLeads = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        if (lines.length > 1) {
          const headers = lines[0].split(',').map(header => header.trim());
          const importedLeads = lines.slice(1).map((line, index) => {
            const values = line.split(',').map(value => value.trim());
            let newLead = { id: leadsData.length + index + 1 }; // Simple ID generation
            headers.forEach((header, i) => {
              newLead[header.toLowerCase()] = values[i];
            });
            return newLead;
          });
          setLeadsData((prevLeads) => [...prevLeads, ...importedLeads]);
        }
      };
      reader.readAsText(file);
    }
  };

  const [leadsData, setLeadsData] = useState([
    {
      id: 1,
      name: 'Acme Corporation',
      contact: 'John Smith',
      source: 'Website',
      status: 'New',
      value: '₹250,000',
      lastContact: '2 hours ago',
    },
    {
      id: 2,
      name: 'TechStart Solutions',
      contact: 'Mary Johnson',
      source: 'Referral',
      status: 'Following Up',
      value: '₹180,000',
      lastContact: '1 day ago',
    },
    {
      id: 3,
      name: 'Global Industries',
      contact: 'Robert Lee',
      source: 'LinkedIn',
      status: 'Negotiating',
      value: '₹500,000',
      lastContact: '3 days ago',
    },
    {
      id: 4,
      name: 'Local Services Ltd',
      contact: 'Sarah Brown',
      source: 'Cold Call',
      status: 'Qualified',
      value: '₹150,000',
      lastContact: '5 days ago',
    },
    {
      id: 5,
      name: 'Innovate Corp',
      contact: 'David Green',
      source: 'Partnership',
      status: 'New',
      value: '₹300,000',
      lastContact: '1 hour ago',
    },
    {
      id: 6,
      name: 'Future Systems',
      contact: 'Emily White',
      source: 'Online Ad',
      status: 'Following Up',
      value: '₹220,000',
      lastContact: '2 days ago',
    },
    {
      id: 7,
      name: 'Dynamic Solutions',
      contact: 'Michael Black',
      source: 'Referral',
      status: 'Negotiating',
      value: '₹450,000',
      lastContact: '4 days ago',
    },
    {
      id: 8,
      name: 'Pioneer Group',
      contact: 'Jessica Blue',
      source: 'Website',
      status: 'Qualified',
      value: '₹190,000',
      lastContact: '6 days ago',
    },
    {
      id: 9,
      name: 'Apex Innovations',
      contact: 'Daniel Red',
      source: 'Cold Call',
      status: 'New',
      value: '₹280,000',
      lastContact: '3 hours ago',
    },
    {
      id: 10,
      name: 'Quantum Tech',
      contact: 'Olivia Grey',
      source: 'LinkedIn',
      status: 'Following Up',
      value: '₹350,000',
      lastContact: '1 day ago',
    },
  ]);

  // Pagination logic
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leadsData.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(leadsData.length / leadsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSaveLead = (leadData) => {
    const newId = Math.max(...leadsData.map(l => l.id)) + 1; // Simple ID generation
    setLeadsData([...leadsData, { ...leadData, id: newId, lastContact: 'Just now', value: '₹0' }]); // Default value for new leads
    closeNewLeadModal();
  };

  const actions = [
    { label: 'Add New Lead', primary: true, onClick: openNewLeadModal },
    { label: 'Import Leads', onClick: () => fileInputRef.current.click() },
  ];

  const leads = {
    headers: ['Lead Name', 'Contact', 'Source', 'Status', 'Value', 'Last Contact', 'Actions'],
    data: currentLeads.reduce((acc, lead) => {
      acc.push([
        lead.name,
        lead.contact,
        lead.source,
        lead.status,
        lead.value,
        lead.lastContact,
        <button onClick={() => handleToggleRow(lead.id)} className="text-blue-600 hover:underline">
          {expandedRow === lead.id ? 'Hide Details' : 'View Details'}
        </button>,
      ]);
      if (expandedRow === lead.id) {
        acc.push([
          { colSpan: 7, content: (
            <div className="p-4 bg-gray-50">
              <h4 className="font-bold">Lead Details</h4>
              <p><strong>Name:</strong> {lead.name}</p>
              <p><strong>Contact:</strong> {lead.contact}</p>
              <p><strong>Source:</strong> {lead.source}</p>
              <p><strong>Status:</strong> {lead.status}</p>
              <p><strong>Value:</strong> {lead.value}</p>
              <p><strong>Last Contact:</strong> {lead.lastContact}</p>
            </div>
          )}
        ]);
      }
      return acc;
    }, []),
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="space-y-6">
      <PageHeading title="Lead Management" actions={actions} />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportLeads}
        accept=".csv"
        style={{ display: 'none' }}
      />

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setFilterStatus('all')}
            >
              All Leads
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'new'
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setFilterStatus('new')}
            >
              New
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'following'
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setFilterStatus('following')}
            >
              Following Up
            </button>
          </div>

          <div className="flex gap-4">
            <select className="px-4 py-2 border rounded-lg text-gray-600">
              <option>Sort by: Newest First</option>
              <option>Sort by: Oldest First</option>
              <option>Sort by: Value High-Low</option>
              <option>Sort by: Value Low-High</option>
            </select>

            <div className="relative">
              <input
                type="search"
                placeholder="Search leads..."
                className="pl-10 pr-4 py-2 border rounded-lg"
              />
              <span className="absolute left-3 top-2.5">🔍</span>
            </div>
          </div>
        </div>

        <SimpleTable {...leads} />

        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <div>Showing {indexOfFirstLead + 1}-{indexOfLastLead > leadsData.length ? leadsData.length : indexOfLastLead} of {leadsData.length} leads</div>
          <div className="flex gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 border rounded ${currentPage === number ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <NewLeadModal isOpen={isNewLeadModalOpen} onClose={closeNewLeadModal} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Lead Source Distribution</h3>
          <div className="space-y-4">
            {[
              { source: 'Website', percentage: 35 },
              { source: 'Referral', percentage: 25 },
              { source: 'LinkedIn', percentage: 20 },
              { source: 'Cold Call', percentage: 15 },
              { source: 'Other', percentage: 5 },
            ].map((source) => (
              <div key={source.source}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{source.source}</span>
                  <span className="text-sm text-gray-600">{source.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[
              {
                action: 'Email sent to Acme Corporation',
                time: '2 hours ago',
                user: 'John Doe',
              },
              {
                action: 'New lead created: TechStart Solutions',
                time: '5 hours ago',
                user: 'Mary Smith',
              },
              {
                action: 'Meeting scheduled with Global Industries',
                time: '1 day ago',
                user: 'Robert Lee',
              },
              {
                action: 'Follow-up call completed: Local Services',
                time: '2 days ago',
                user: 'Sarah Brown',
              },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">
                    {activity.time} by {activity.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadManagement;
