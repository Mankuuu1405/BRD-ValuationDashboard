import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardMetrics } from "../../components/DashboardComponents";
import { LineChart, BarChart, PieChart } from "../../components/Charts";
import NewValuationModal from "../../components/NewValuationModal";
import GenerateReportModal from "../../components/GenerateReportModal";

import {
  ClockIcon,
  CheckCircleIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

import { ValuationAPI } from "../../utils/api";
const ValuationDashboard = () => {
  const [isNewValuationModalOpen, setNewValuationModalOpen] = useState(false);
  const [isGenerateReportModalOpen, setGenerateReportModalOpen] =
    useState(false);

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);


  const [filterMonth, setFilterMonth] = useState("All");
  const [filterProperty, setFilterProperty] = useState("All");
  const [filterState, setFilterState] = useState("All");

  // ---------------------------------------
  // Fetch Dashboard API (with mock fallback)
  // ---------------------------------------
  useEffect(() => {
    ValuationAPI.getDashboardData("LAST_6_MONTHS")
      .then((data) => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-lg text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load dashboard data.
      </div>
    );
  }


  // Add this above your component return, after fetching dashboardData
const locationGeoData = [
  { month: "January", place: "Mumbai", count: 200, topProperty: "Residential", avgLoan: 5000000 },
  { month: "January", place: "Bangalore", count: 150, topProperty: "Commercial", avgLoan: 3500000 },
  { month: "February", place: "Delhi", count: 120, topProperty: "Residential", avgLoan: 4000000 },
  { month: "March", place: "Hyderabad", count: 100, topProperty: "Industrial", avgLoan: 3000000 },
  { month: "March", place: "Chennai", count: 80, topProperty: "Residential", avgLoan: 2500000 },
];


// ------------------------
  // Filtered Data
  // ------------------------
  const filteredData = locationGeoData.filter((loc) => {
  const monthMatch = filterMonth === "All" || loc.month === filterMonth;
  const propertyMatch = filterProperty === "All" || loc.topProperty === filterProperty;
  const stateMatch = filterState === "All" || loc.place === filterState;

  return monthMatch && propertyMatch && stateMatch;
});


  // ------------------------
  // Extract options for filters
  // ------------------------
const monthOptions = ["All", ...new Set(locationGeoData.map((loc) => loc.month))];
const propertyOptions = ["All", ...new Set(locationGeoData.map((loc) => loc.topProperty))];
const stateOptions = ["All", ...new Set(locationGeoData.map((loc) => loc.place))];




  // ---------------------------------------
  // Prepare Metrics
  // ---------------------------------------
  const metrics = [
    {
      title: "Pending Valuations",
      value: dashboardData.kpis.pendingValuations,
      trend: dashboardData.kpis.pendingTrend * 100,
      color: "yellow",
      icon: ClockIcon,
    },
    {
      title: "Completed Today",
      value: dashboardData.kpis.completedToday,
      trend: dashboardData.kpis.completedTrend * 100,
      color: "green",
      icon: CheckCircleIcon,
    },
    {
      title: "Average Value",
      value: `₹${dashboardData.kpis.averageValue}L`,
      trend: dashboardData.kpis.averageValueTrend * 100,
      color: "blue",
      icon: BanknotesIcon,
    },
    {
      title: "Success Rate",
      value: `${dashboardData.kpis.successRate * 100}%`,
      trend: dashboardData.kpis.successRateTrend * 100,
      color: "green",
      icon: ArrowTrendingUpIcon,
    },
  ];

  // ---------------------------------------
  // Extract Chart Data
  // ---------------------------------------
  const trendLabels = dashboardData.valuationTrends.map((t) => t.month);
  const trendValues = dashboardData.valuationTrends.map((t) => t.avgValue);

  const distributionLabels = dashboardData.propertyDistribution.map(
    (p) => p.type
  );
  const distributionValues = dashboardData.propertyDistribution.map(
    (p) => p.count
  );
  const distributionColors = dashboardData.propertyDistribution.map(
    (p) => p.color
  );
  const monthlyComplitonLables = dashboardData.monthlyComplition.map(
    (m) => m.month
  );
  const monthlyComplitonCount = dashboardData.monthlyComplition.map(
    (m) => m.count
  );

  const locationDistributionLables = dashboardData.locationDistribution.map(
    (m) => m.place
  );
  const locationDistributionCount = dashboardData.locationDistribution.map(
    (m) => m.count
  );


  // Static placeholder data for latest 4 valuations
  // (Replace with API call later if required)
  const recentValuations = [
    {
      id: "VAL-2001",
      property: "Residential Apartment",
      location: "Andheri West, Mumbai",
      requestDate: "2025-11-03",
      estimatedValue: "₹85,00,000",
      status: "Pending",
    },
    {
      id: "VAL-2002",
      property: "Commercial Shop",
      location: "MG Road, Bangalore",
      requestDate: "2025-11-03",
      estimatedValue: "₹1,25,00,000",
      status: "In Progress",
    },
    {
      id: "VAL-2003",
      property: "Industrial Plot",
      location: "GIDC, Ahmedabad",
      requestDate: "2025-11-02",
      estimatedValue: "₹2,50,00,000",
      status: "Completed",
    },
    {
      id: "VAL-2004",
      property: "Villa",
      location: "Electronic City, Bangalore",
      requestDate: "2025-11-02",
      estimatedValue: "₹1,75,00,000",
      status: "Verified",
    },
  ];

  // ---------------------------------------
  // RETURN JSX
  // ---------------------------------------
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Valuation Dashboard
          </h1>
          <p className="mt-1 text-sm sm:text-base text-gray-500">
            Property Valuation and Assessment Overview
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => setNewValuationModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            New Valuation
          </button>
          <button
            onClick={() => setGenerateReportModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <DashboardMetrics items={metrics} />

      {/* MODALS */}
      <NewValuationModal
        isOpen={isNewValuationModalOpen}
        onClose={() => setNewValuationModalOpen(false)}
      />
      <GenerateReportModal
        isOpen={isGenerateReportModalOpen}
        onRequestClose={() => setGenerateReportModalOpen(false)}
      />

      {/* CHARTS */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* VALUATION TRENDS */}
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Valuation Trends</h3>
    <LineChart
      data={{
        labels: trendLabels,
        datasets: [
          {
            label: "Avg Property Value (Lakhs ₹)",
            data: trendValues,
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            tension: 0.3,
          },
        ],
      }}
    />
  </div>

  {/* PROPERTY DISTRIBUTION */}
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Property Type Distribution</h3>
    <PieChart
      data={{
        labels: distributionLabels,
        datasets: [
          {
            data: distributionValues,
            backgroundColor: distributionColors,
          },
        ],
      }}
    />
  </div>

  {/* MONTHLY COMPLETION RATE */}
  <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
    <h3 className="text-lg font-semibold mb-4">Monthly Completion Rate</h3>
    <BarChart
      data={{
        labels: monthlyComplitonLables,
        datasets: [
          {
            label: "Completed",
            data: monthlyComplitonCount,
            backgroundColor: "rgba(16, 185, 129, 0.8)",
          },
        ],
      }}
    />
  </div>

   {/* LOCATION DISTRIBUTION FILTER */}
      <div className="bg-white p-4 rounded-lg shadow-md lg:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Filter Location Distribution</h3>
        <div className="flex flex-wrap gap-4">
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            {monthOptions.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>

          <select
            value={filterProperty}
            onChange={(e) => setFilterProperty(e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            {propertyOptions.map((prop) => (
              <option key={prop} value={prop}>{prop}</option>
            ))}
          </select>

          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            {stateOptions.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>

      {/* LOCATION DISTRIBUTION TABLE */}
      <div className="bg-white rounded-lg shadow-md lg:col-span-2 overflow-x-auto">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Location Distribution</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["State/City", "Valuations Count", "Top Property Type", "Avg Loan"].map((heading) => (
                <th
                  key={heading}
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((loc, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{loc.place}</td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">{loc.count}</td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{loc.topProperty}</td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{`₹${loc.avgLoan.toLocaleString()}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>


      {/* RECENT VALUATIONS TABLE */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Valuations</h3>
        </div>

        {/* LARGE SCREEN TABLE */}
        <div className="overflow-x-auto sm:block hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "ID",
                  "Property",
                  "Location",
                  "Date",
                  "Est. Value",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {recentValuations.map((val) => (
                <tr key={val.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">
                    {val.id}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900">
                    {val.property}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                    {val.location}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">
                    {val.requestDate}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                    {val.estimatedValue}
                  </td>

                  {/* STATUS BADGE */}
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        val.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : val.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : val.status === "Verified"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {val.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 sm:px-6 py-4 text-sm font-medium">
                    <Link
                      to={`/valuation/${val.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/valuation/${val.id}`}
                      className="text-green-600 hover:text-green-900"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="sm:hidden p-4 space-y-4">
          {recentValuations.map((val) => (
            <div
              key={val.id}
              className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{val.property}</span>
                <span
                  className={`px-2 inline-flex text-xs rounded-full ${
                    val.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : val.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : val.status === "Verified"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {val.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                <strong>ID:</strong> {val.id}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Location:</strong> {val.location}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Date:</strong> {val.requestDate}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Est. Value:</strong> {val.estimatedValue}
              </p>

              <div className="mt-2 flex gap-2">
                <Link
                  to={`/valuation/${val.id}`}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  View
                </Link>
                <Link
                  to={`/valuation/${val.id}`}
                  className="text-green-600 hover:text-green-900 text-sm"
                >
                  Update
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValuationDashboard;
