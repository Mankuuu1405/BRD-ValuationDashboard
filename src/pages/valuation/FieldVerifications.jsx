import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ScheduleVerificationModal from "../../components/ScheduleVerificationModal";
import AssignAgentModal from "../../components/AssignAgentModal";
import StartVisitModal from "../../components/StartVisitModal";
import ViewReportModal from "../../components/ViewReportModal";

import { FieldVerificationMetrics } from "../../components/DashboardComponents";
import {
  UsersIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

import { FieldVerificationAPI } from "../../utils/api";

const FieldVerifications = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");

  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isStartVisitModalOpen, setIsStartVisitModalOpen] = useState(false);
  const [isViewReportModalOpen, setIsViewReportModalOpen] = useState(false);

  const [selectedVerificationId, setSelectedVerificationId] = useState(null);

  // ------------------------------
  // LOAD API DATA (with mock fallback)
  // ------------------------------
  const loadVerifications = () => {
    setLoading(true);

    FieldVerificationAPI.getVerificationsList({})
      .then((data) => {
        // Normalize data to always be an array
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];

        setVerifications(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadVerifications();
  }, []);

  // ------------------------------
  // Metric Cards
  // ------------------------------
  const statsItems = [
    {
      icon: ClipboardDocumentCheckIcon,
      title: "Today's Visits",
      mainValue: 12,
      subText: "8 completed, 4 pending",
      trendValue: 8,
      trendType: "up",
    },
    {
      icon: ClockIcon,
      title: "Pending Verifications",
      mainValue: 28,
      subText: "Average TAT: 2.3 days",
      trendValue: 5,
      trendType: "down",
    },
    {
      icon: UsersIcon,
      title: "Active Agents",
      mainValue: 8,
      subText: "2 currently on field",
      trendValue: 10,
      trendType: "up",
    },
    {
      icon: ArrowTrendingUpIcon,
      title: "Success Rate",
      mainValue: "95%",
      subText: "↑ 3% this month",
      trendValue: 3,
      trendType: "up",
    },
  ];

  // ------------------------------
  // FILTER + SEARCH
  // ------------------------------
  const filtered = verifications.filter((v) => {
    if (filter !== "all" && v.status?.toLowerCase() !== filter.toLowerCase())
      return false;

    if (
      searchQuery &&
      !v.property?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !v.id?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !v.address?.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    return true;
  });

  // ------------------------------
  // Action Handlers
  // ------------------------------
  const handleSchedule = (id) => {
    setSelectedVerificationId(id);
    setIsScheduleModalOpen(true);
  };

  const handleReassign = (id) => {
    setSelectedVerificationId(id);
    setIsAssignModalOpen(true);
  };

  const handleStartVisit = (id) => {
    setSelectedVerificationId(id);
    setIsStartVisitModalOpen(true);
  };

  const handleViewReport = (id) => {
    setSelectedVerificationId(id);
    setIsViewReportModalOpen(true);
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600 text-lg">
        Loading field verifications...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 mb-6">
        {/* Title & Subtitle */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Field Verifications
          </h1>
          <p className="mt-1 text-sm sm:text-base text-gray-500">
            Track and manage property field verifications
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center md:justify-end">
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Schedule Verification
          </button>
          <button
            onClick={() => setIsAssignModalOpen(true)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Assign Agent
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <FieldVerificationMetrics items={statsItems} />

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 mb-6">
          {/* Status Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-sm text-gray-600">Status:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="all">All Verifications</option>
              <option value="pending">Pending</option>
              <option value="scheduled">Scheduled</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="flex-1 w-full">
            <input
              type="search"
              placeholder="Search property or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
        </div>

        {/* Verifications Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Field Verifications</h3>
          </div>

          {/* Scrollable table for larger screens */}
          <div className="overflow-x-auto sm:block hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "ID",
                    "Property",
                    "Address",
                    "Owner",
                    "Date",
                    "Status",
                    "Agent",
                    "Priority",
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
                {filtered.map((verification) => (
                  <tr key={verification.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {verification.id}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {verification.property}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                      {verification.address}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {verification.owner}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {verification.date}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          verification.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : verification.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : verification.status === "Scheduled"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {verification.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {verification.agent}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          verification.priority === "High"
                            ? "bg-red-100 text-red-800"
                            : verification.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {verification.priority}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {verification.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleSchedule(verification.id)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Schedule
                          </button>
                          <button
                            onClick={() => handleReassign(verification.id)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Reassign
                          </button>
                        </>
                      )}
                      {verification.status === "Scheduled" && (
                        <button
                          onClick={() => handleStartVisit(verification.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Start Visit
                        </button>
                      )}
                      {verification.status === "Completed" && (
                        <button
                          onClick={() => handleViewReport(verification.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Report
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No verifications match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Card-style table for mobile */}
          <div className="sm:hidden p-4 space-y-4">
            {filtered.map((verification) => (
              <div
                key={verification.id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900">
                    {verification.property}
                  </span>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      verification.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : verification.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : verification.status === "Scheduled"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {verification.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  <strong>ID:</strong> {verification.id}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Address:</strong> {verification.address}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Owner:</strong> {verification.owner}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Date:</strong> {verification.date}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Agent:</strong> {verification.agent}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Priority:</strong> {verification.priority}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {verification.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleSchedule(verification.id)}
                        className="text-blue-600 hover:text-blue-900 text-sm"
                      >
                        Schedule
                      </button>
                      <button
                        onClick={() => handleReassign(verification.id)}
                        className="text-gray-600 hover:text-gray-900 text-sm"
                      >
                        Reassign
                      </button>
                    </>
                  )}
                  {verification.status === "Scheduled" && (
                    <button
                      onClick={() => handleStartVisit(verification.id)}
                      className="text-green-600 hover:text-green-900 text-sm"
                    >
                      Start Visit
                    </button>
                  )}
                  {verification.status === "Completed" && (
                    <button
                      onClick={() => handleViewReport(verification.id)}
                      className="text-blue-600 hover:text-blue-900 text-sm"
                    >
                      View Report
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Field Verification Guidelines
        </h3>
        <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
          <li>Always carry proper identification and authorization</li>
          <li>Take photographs of all key property aspects</li>
          <li>Verify property dimensions and boundaries</li>
          <li>Document any discrepancies or damages</li>
          <li>Get owner/occupant signature on verification form</li>
        </ul>
      </div>

      {/* MODALS */}
      <ScheduleVerificationModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        verificationId={selectedVerificationId}
      />

      <AssignAgentModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        verificationId={selectedVerificationId}
      />

      <StartVisitModal
        isOpen={isStartVisitModalOpen}
        onClose={() => setIsStartVisitModalOpen(false)}
        verificationId={selectedVerificationId}
      />

      <ViewReportModal
        isOpen={isViewReportModalOpen}
        onClose={() => setIsViewReportModalOpen(false)}
        verificationId={selectedVerificationId}
      />

    </div>
  );
};

export default FieldVerifications;
