import React, { useState } from 'react';
import { BarChart, LineChart, DoughnutChart } from '../../components/Charts';
import CampaignModal from '../../components/CampaignModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';

const CampaignPage = () => {
  const [isCampaignModalOpen, setCampaignModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);

  const openDeleteModal = (campaign) => {
    setCampaignToDelete(campaign);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setCampaignToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleDeleteCampaign = () => {
    setCampaigns(campaigns.filter((c) => c.id !== campaignToDelete.id));
    closeDeleteModal();
  };


  const openCampaignModal = (campaign) => {
    setSelectedCampaign(campaign);
    setCampaignModalOpen(true);
  };

  const closeCampaignModal = () => {
    setSelectedCampaign(null);
    setCampaignModalOpen(false);
  };

  const handleSaveCampaign = (campaignData) => {
    if (campaignData.id) {
      // Update existing campaign
      setCampaigns(campaigns.map((c) => (c.id === campaignData.id ? { ...c, ...campaignData } : c)));
    } else {
      // Create new campaign
      const newId = Math.max(...campaigns.map(c => c.id)) + 1; // Simple ID generation
      setCampaigns([...campaigns, { ...campaignData, id: newId, leads: 0, conversions: 0, roi: 0 }]);
    }
    closeCampaignModal();
  };

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Festive Season Home Loans",
      status: "Active",
      startDate: "2025-10-01",
      endDate: "2025-12-31",
      budget: "₹500,000",
      leads: 245,
      conversions: 28,
      roi: 12.5
    },
    {
      id: 2,
      name: "Business Expansion Loans",
      status: "Active",
      startDate: "2025-09-15",
      endDate: "2025-11-30",
      budget: "₹750,000",
      leads: 180,
      conversions: 35,
      roi: 15.2
    },
    {
      id: 3,
      name: "Education Loan Drive",
      status: "Scheduled",
      startDate: "2025-12-01",
      endDate: "2026-02-28",
      budget: "₹300,000",
      leads: 0,
      conversions: 0,
      roi: 0
    },
    {
      id: 4,
      name: "Vehicle Loan Promotion",
      status: "Completed",
      startDate: "2025-07-01",
      endDate: "2025-09-30",
      budget: "₹400,000",
      leads: 156,
      conversions: 42,
      roi: 18.7
    }
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Campaign Management</h1>
        <button onClick={() => openCampaignModal(null)} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
          Create Campaign
        </button>
      </div>

      {/* Campaign Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Active Campaigns</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">2</p>
          <div className="text-sm text-green-600 mt-1">+2 from last month</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">581</p>
          <div className="text-sm text-green-600 mt-1">+125 this month</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">18.2%</p>
          <div className="text-sm text-green-600 mt-1">+2.4% improvement</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Total Budget</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">₹1.95M</p>
          <div className="text-sm text-blue-600 mt-1">₹750K remaining</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
          <LineChart
            data={{
              labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
              datasets: [
                {
                  label: 'Leads Generated',
                  data: [85, 120, 156, 132, 88],
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  tension: 0.3,
                },
                {
                  label: 'Conversions',
                  data: [12, 28, 42, 18, 10],
                  borderColor: 'rgb(16, 185, 129)',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  tension: 0.3,
                }
              ],
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Budget Allocation</h3>
          <DoughnutChart
            data={{
              labels: ['Festive Season', 'Business Expansion', 'Education Drive', 'Vehicle Promotion'],
              datasets: [{
                data: [500000, 750000, 300000, 400000],
                backgroundColor: [
                  'rgba(59, 130, 246, 0.8)',
                  'rgba(16, 185, 129, 0.8)',
                  'rgba(251, 191, 36, 0.8)',
                  'rgba(239, 68, 68, 0.8)'
                ],
              }]
            }}
          />
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Active Campaigns</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        campaign.status === 'Completed' ? 'bg-gray-100 text-gray-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.startDate} - {campaign.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.budget}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.leads} ({campaign.conversions} converted)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.roi}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => openCampaignModal(campaign)} className="text-teal-600 hover:text-teal-900 mr-3">Edit</button>
                    <button onClick={() => openDeleteModal(campaign)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CampaignModal isOpen={isCampaignModalOpen} onClose={closeCampaignModal} campaign={selectedCampaign} onSave={handleSaveCampaign} />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteCampaign}
        message={`Are you sure you want to delete the campaign "${campaignToDelete?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default CampaignPage;