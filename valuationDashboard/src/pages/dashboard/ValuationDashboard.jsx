import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardMetrics } from '../../components/DashboardComponents';
import { LineChart, BarChart, DoughnutChart } from '../../components/Charts';
import NewValuationModal from '../../components/NewValuationModal';
import GenerateReportModal from '../../components/GenerateReportModal';


const ValuationDashboard = () => {
  const [isNewValuationModalOpen, setNewValuationModalOpen] = React.useState(false);
  const [isGenerateReportModalOpen, setGenerateReportModalOpen] = React.useState(false);


  const metrics = [
    { title: 'Pending Valuations', value: '42', trend: -8, color: 'yellow' },
    { title: 'Completed Today', value: '15', trend: 25, color: 'green' },
    { title: 'Average Value', value: '₹45.2L', trend: 12, color: 'blue' },
    { title: 'Success Rate', value: '94%', trend: 2.5, color: 'green' },
  ];

  const recentValuations = [
    { 
      id: 'VAL-2001',
      property: 'Residential Apartment',
      location: 'Andheri West, Mumbai',
      requestDate: '2025-11-03',
      estimatedValue: '₹85,00,000',
      status: 'Pending',
    },
    { 
      id: 'VAL-2002',
      property: 'Commercial Shop',
      location: 'MG Road, Bangalore',
      requestDate: '2025-11-03',
      estimatedValue: '₹1,25,00,000',
      status: 'In Progress',
    },
    { 
      id: 'VAL-2003',
      property: 'Industrial Plot',
      location: 'GIDC, Ahmedabad',
      requestDate: '2025-11-02',
      estimatedValue: '₹2,50,00,000',
      status: 'Completed',
    },
    { 
      id: 'VAL-2004',
      property: 'Villa',
      location: 'Electronic City, Bangalore',
      requestDate: '2025-11-02',
      estimatedValue: '₹1,75,00,000',
      status: 'Verified',
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Valuation Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Property Valuation and Assessment Overview</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setNewValuationModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            New Valuation
          </button>
          <button onClick={() => setGenerateReportModalOpen(true)} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            Generate Report
          </button>
        </div>
      </div>

      <DashboardMetrics items={metrics} />

      <NewValuationModal isOpen={isNewValuationModalOpen} onClose={() => setNewValuationModalOpen(false)} />
      <GenerateReportModal isOpen={isGenerateReportModalOpen} onClose={() => setGenerateReportModalOpen(false)} />
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Valuation Trends */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Valuation Trends</h3>
          <LineChart
            data={{
              labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
              datasets: [
                {
                  label: 'Average Property Value (in Lakhs ₹)',
                  data: [42.5, 43.8, 44.2, 44.8, 45.0, 45.2],
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  tension: 0.3,
                },
              ],
            }}
          />
        </div>

        {/* Property Type Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Property Type Distribution</h3>
          <DoughnutChart
            data={{
              labels: ['Residential', 'Commercial', 'Industrial', 'Agricultural'],
              datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: [
                  'rgba(59, 130, 246, 0.8)',
                  'rgba(16, 185, 129, 0.8)',
                  'rgba(249, 115, 22, 0.8)',
                  'rgba(139, 92, 246, 0.8)',
                ],
              }]
            }}
          />
        </div>

        {/* Monthly Completion Rate */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Monthly Completion Rate</h3>
          <BarChart
            data={{
              labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
              datasets: [
                {
                  label: 'Completed',
                  data: [85, 92, 88, 95, 91, 94],
                  backgroundColor: 'rgba(16, 185, 129, 0.8)',
                },
              ],
            }}
          />
        </div>

        {/* Location Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Location Distribution</h3>
          <BarChart
            data={{
              labels: ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Chennai'],
              datasets: [
                {
                  label: 'Number of Properties',
                  data: [145, 128, 112, 95, 82],
                  backgroundColor: 'rgba(59, 130, 246, 0.8)',
                },
              ],
            }}
          />
        </div>
      </div>

      {/* Recent Valuations Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Valuations</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valuation ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentValuations.map((val) => (
                <tr key={val.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{val.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{val.property}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{val.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{val.requestDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{val.estimatedValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      val.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      val.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      val.status === 'Verified' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {val.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{val.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link to={`/valuation/${val.id}`} className="text-blue-600 hover:text-blue-900 mr-3">View</Link>
                                        <Link to={`/valuation/${val.id}`} className="text-green-600 hover:text-green-900">Update</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ValuationDashboard;
