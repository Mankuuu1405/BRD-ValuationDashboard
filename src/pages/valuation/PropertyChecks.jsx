import React, { useState } from "react";
import NewPropertyCheckModal from "../../components/NewPropertyCheckModal";
import ViewPropertyDetailsModal from "../../components/ViewPropertyDetailsModal";
import {
  UsersIcon,
  ClipboardDocumentCheckIcon,
  CheckCircleIcon,
  BuildingLibraryIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { FieldVerificationMetrics } from "../../components/DashboardComponents";

const PropertyChecks = () => {
  const [activeProperty, setActiveProperty] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewPropertyCheckModalOpen, setIsNewPropertyCheckModalOpen] =
    useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const propertyStats = [
    {
      title: "Total Properties",
      mainValue: 148,
      subText: "↑ 12 this month",
      trendValue: 12,
      trendType: "up",
      icon: BuildingLibraryIcon,
    },
    {
      title: "Pending Checks",
      mainValue: 32,
      subText: "Requires attention",
      trendValue: 5,
      trendType: "down",
      icon: ClipboardDocumentCheckIcon,
    },
    {
      title: "In Progress",
      mainValue: 45,
      subText: "On schedule",
      trendValue: 12,
      trendType: "up",
      icon: ClockIcon,
    },
    {
      title: "Completed",
      mainValue: 71,
      subText: "This month",
      trendValue: 25,
      trendType: "up",
      icon: CheckCircleIcon,
    },
  ];

  const [properties, setProperties] = useState([
    {
      id: "PROP-1001",
      name: "Green Valley Apartments",
      type: "Residential Complex",
      location: "Powai, Mumbai",
      status: "Pending",
      lastCheck: "2025-10-30",
      priority: "High",
      assignedTo: "Vikram Mehta",
      checkItems: [
        { id: 1, item: "Structure Integrity", status: "pending" },
        { id: 2, item: "Property Dimensions", status: "completed" },
        { id: 3, item: "Legal Documentation", status: "pending" },
        { id: 4, item: "Utilities Assessment", status: "not-started" },
      ],
    },
    {
      id: "PROP-1002",
      name: "Tech Park Plaza",
      type: "Commercial Building",
      location: "Whitefield, Bangalore",
      status: "In Progress",
      lastCheck: "2025-11-02",
      priority: "Medium",
      assignedTo: "Priya Sharma",
      checkItems: [
        { id: 1, item: "Infrastructure Check", status: "completed" },
        { id: 2, item: "Safety Compliance", status: "in-progress" },
        { id: 3, item: "Building Permits", status: "completed" },
        { id: 4, item: "Environmental Assessment", status: "pending" },
      ],
    },
    {
      id: "PROP-1003",
      name: "Sunrise Industrial Hub",
      type: "Industrial Property",
      location: "MIDC, Pune",
      status: "Completed",
      lastCheck: "2025-11-03",
      priority: "Low",
      assignedTo: "Rajesh Kumar",
      checkItems: [
        { id: 1, item: "Machinery Inspection", status: "completed" },
        { id: 2, item: "Storage Facilities", status: "completed" },
        { id: 3, item: "Waste Management", status: "completed" },
        { id: 4, item: "Worker Safety Measures", status: "completed" },
      ],
    },
  ]);

  const getStatusColor = (status) => {
    const colors = {
      Pending: "yellow",
      "In Progress": "blue",
      Completed: "green",
      pending: "yellow",
      "in-progress": "blue",
      completed: "green",
      "not-started": "gray",
    };
    return colors[status] || "gray";
  };

  const filteredProperties = properties.filter((prop) => {
    if (filter !== "all" && prop.status.toLowerCase() !== filter.toLowerCase())
      return false;
    if (
      searchQuery &&
      !prop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !prop.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const handleCheckItemUpdate = (propertyId, itemId, newStatus) => {
    setProperties((prevProperties) =>
      prevProperties.map((property) =>
        property.id === propertyId
          ? {
              ...property,
              checkItems: property.checkItems.map((item) =>
                item.id === itemId ? { ...item, status: newStatus } : item
              ),
            }
          : property
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Checks</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track property inspection checklists
          </p>
        </div>
        <button
          onClick={() => setIsNewPropertyCheckModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          New Property Check
        </button>
      </div>

      {/* Statistics Cards */}
      <FieldVerificationMetrics items={propertyStats} />

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          {/* Status Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <label className="text-sm text-gray-600">Status:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg w-full md:w-auto"
            >
              <option value="all">All Properties</option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="flex-1 w-full">
            <input
              type="search"
              placeholder="Search by property name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="border rounded-lg overflow-hidden"
            >
              <div className="p-4 border-b bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {property.name}
                    </h3>
                    <p className="text-sm text-gray-500">{property.id}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full bg-${getStatusColor(
                      property.status
                    )}-100 text-${getStatusColor(property.status)}-800`}
                  >
                    {property.status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <p>{property.type}</p>
                  <p>{property.location}</p>
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Check Items
                </h4>
                <ul className="space-y-2">
                  {property.checkItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-600">{item.item}</span>
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleCheckItemUpdate(
                            property.id,
                            item.id,
                            e.target.value
                          )
                        }
                        className={`text-sm px-2 py-1 rounded border bg-${getStatusColor(
                          item.status
                        )}-100 text-${getStatusColor(item.status)}-800`}
                      >
                        <option value="not-started">Not Started</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Assigned to:{" "}
                    <span className="text-gray-900">{property.assignedTo}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProperty(property);
                      setIsViewDetailsModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No properties match your filters.
          </div>
        )}
      </div>

      {/* Property Check Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Property Check Guidelines
        </h3>
        <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
          <li>Complete all check items in the specified order</li>
          <li>Document any issues with photographs</li>
          <li>Verify all measurements against property documents</li>
          <li>Check for any unauthorized modifications</li>
          <li>Report any safety concerns immediately</li>
        </ul>
      </div>

      <NewPropertyCheckModal
        isOpen={isNewPropertyCheckModalOpen}
        onClose={() => setIsNewPropertyCheckModalOpen(false)}
      />

      <ViewPropertyDetailsModal
        isOpen={isViewDetailsModalOpen}
        onClose={() => setIsViewDetailsModalOpen(false)}
        property={selectedProperty}
      />
    </div>
  );
};

export default PropertyChecks;
