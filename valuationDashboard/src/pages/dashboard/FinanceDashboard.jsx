import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardMetrics } from '../../components/DashboardComponents';
import { LineChart, BarChart, DoughnutChart } from '../../components/Charts';

const FinanceDashboard = () => {
  const navigate = useNavigate();
  const metrics = [
    { title: 'Total Disbursed', value: '₹25.8M', trend: 12.5, color: 'green', path: '/finance/disbursement' },
    { title: 'Pending Disbursement', value: '₹4.2M', trend: -8.3, color: 'yellow', path: '/finance/disbursement' },
    { title: 'Collection Rate', value: '92%', trend: 2.1, color: 'blue', path: '/finance/repayment' },
    { title: 'Overdue Amount', value: '₹1.2M', trend: -15.4, color: 'red', path: '/finance/repayment' },
  ];

  const handleGenerateReport = () => {
    const csv = Papa.unparse(metrics);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'finance_summary_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Finance Dashboard</h1>
        <button
          onClick={handleGenerateReport}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Generate Report
        </button>
      </div>

      <DashboardMetrics items={metrics} onClick={(path) => navigate(path)} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Disbursement Trends */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Disbursement Trends</h3>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  label: 'Monthly Disbursement',
                  data: [3.2, 4.1, 3.8, 4.8, 4.2, 5.7],
                  borderColor: 'rgb(20, 184, 166)',
                  backgroundColor: 'rgba(20, 184, 166, 0.2)',
                  tension: 0.3,
                },
              ],
            }}
            title="Monthly Disbursement (in Millions ₹)"
          />
        </div>

        {/* Collection Performance */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Collection Performance</h3>
          <BarChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  label: 'Expected',
                  data: [2.8, 3.2, 3.5, 3.8, 4.0, 4.2],
                  backgroundColor: 'rgba(59, 130, 246, 0.8)',
                },
                {
                  label: 'Actual',
                  data: [2.7, 3.0, 3.4, 3.6, 3.8, 3.9],
                  backgroundColor: 'rgba(34, 197, 94, 0.8)',
                },
              ],
            }}
            title="Monthly Collections (in Millions ₹)"
          />
        </div>

        {/* Payment Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Payment Status Distribution</h3>
          <DoughnutChart
            data={{
              labels: ['On Time', 'Delayed', 'Defaulted', 'Restructured'],
              datasets: [
                {
                  data: [75, 15, 5, 5],
                  backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(234, 179, 8, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                  ],
                },
              ],
            }}
          />
        </div>

        {/* Loan Portfolio */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Loan Portfolio Composition</h3>
          <DoughnutChart
            data={{
              labels: ['Business Loans', 'Personal Loans', 'Home Loans', 'Vehicle Loans', 'Education'],
              datasets: [
                {
                  data: [40, 25, 20, 10, 5],
                  backgroundColor: [
                    'rgba(20, 184, 166, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(249, 115, 22, 0.8)',
                    'rgba(234, 179, 8, 0.8)',
                  ],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;