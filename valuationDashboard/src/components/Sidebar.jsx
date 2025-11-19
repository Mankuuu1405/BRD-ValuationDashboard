import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AccessDeniedModal from "./AccessDeniedModal";
import {
  HomeIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  BuildingLibraryIcon,
  ShieldCheckIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  CogIcon,
  UserIcon,
  ShareIcon,
  ShieldExclamationIcon,
  MagnifyingGlassIcon,
  BanknotesIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

// replace existing SidebarLink with this
const SidebarLink = ({ to, children, icon: Icon }) => {
  return (
    <NavLink
      to={to}
      end={true} // <-- require exact match
      className={({ isActive }) =>
        `flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-base group
        ${
          isActive
            ? "bg-white text-gray-900 shadow-md font-medium"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`
      }
    >
      {Icon && (
        <Icon
          className={`w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110`}
        />
      )}
      {children}
    </NavLink>
  );
};

const Sidebar = () => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAccessDeniedModal, setShowAccessDeniedModal] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderSalesNav = () => (
    <div className="mb-6">
      <h3
        className={`px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        {isCollapsed ? "Sales" : "Sales / CRM"}
      </h3>
      <ul className="space-y-2">
        <li>
          <SidebarLink to="/sales" icon={HomeIcon}>
            {!isCollapsed && "Dashboard"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/sales/leads" icon={UserGroupIcon}>
            {!isCollapsed && "Lead Management"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/sales/campaigns" icon={ChartBarIcon}>
            {!isCollapsed && "Campaigns"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/sales/follow-ups" icon={ClipboardDocumentCheckIcon}>
            {!isCollapsed && "Follow-ups"}
          </SidebarLink>
        </li>
      </ul>
    </div>
  );

  const renderCreditNav = () => (
    <div className="mb-6">
      <h3
        className={`px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        Credit Team
      </h3>
      <ul className="space-y-2">
        <li>
          <SidebarLink to="/credit" icon={HomeIcon}>
            {!isCollapsed && "Dashboard"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/credit/scoring" icon={ChartBarIcon}>
            {!isCollapsed && "Credit Scoring"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/credit/approvals" icon={DocumentTextIcon}>
            {!isCollapsed && "Approvals"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink
            to="/credit/rejections"
            icon={ClipboardDocumentCheckIcon}
          >
            {!isCollapsed && "Rejections"}
          </SidebarLink>
        </li>
      </ul>
    </div>
  );

  const renderLegalNav = () => (
    <div className="mb-6">
      <h3
        className={`px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        Legal Team
      </h3>
      <ul className="space-y-2">
        <li>
          <SidebarLink to="/legal" icon={HomeIcon}>
            {!isCollapsed && "Dashboard"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/legal/documents" icon={DocumentTextIcon}>
            {!isCollapsed && "Document Validation"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/legal/agreements" icon={ClipboardDocumentCheckIcon}>
            {!isCollapsed && "Agreement Approvals"}
          </SidebarLink>
        </li>
      </ul>
    </div>
  );

  const renderValuationNav = () => (
    <div className="mb-6">
      <h3
        className={`px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        Valuation
      </h3>
      <ul className="space-y-2">
        <li>
          <SidebarLink to="/valuation" icon={HomeIcon}>
            {!isCollapsed && "Dashboard"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink
            to="/valuation/field-verifications"
            icon={BuildingLibraryIcon}
          >
            {!isCollapsed && "Field Verifications"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink
            to="/valuation/property-checks"
            icon={ClipboardDocumentCheckIcon}
          >
            {!isCollapsed && "Property Checks"}
          </SidebarLink>
        </li>
      </ul>
    </div>
  );

  const renderFinanceNav = () => (
    <div className="mb-6">
      <h3
        className={`px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        Finance Team
      </h3>
      <ul className="space-y-2">
        <li>
          <SidebarLink to="/finance" icon={HomeIcon}>
            {!isCollapsed && "Dashboard"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/finance/repayment" icon={ChartBarIcon}>
            {!isCollapsed && "Repayment"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/finance/reconciliation" icon={DocumentTextIcon}>
            {!isCollapsed && "Reconciliation"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink
            to="/finance/disbursement"
            icon={ClipboardDocumentCheckIcon}
          >
            {!isCollapsed && "Disbursement"}
          </SidebarLink>
        </li>
      </ul>
    </div>
  );

  const renderComplianceNav = () => (
    <div className="mb-6">
      <h3
        className={`px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        Compliance
      </h3>
      <ul className="space-y-2">
        <li>
          <SidebarLink to="/compliance" icon={HomeIcon}>
            {!isCollapsed && "Dashboard"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/compliance/audit-tracking" icon={ShieldCheckIcon}>
            {!isCollapsed && "Audit Tracking"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/compliance/reporting" icon={DocumentTextIcon}>
            {!isCollapsed && "Reporting"}
          </SidebarLink>
        </li>
      </ul>
    </div>
  );

  const renderOperationNav = () => (
    <div className="mb-6">
      <h3
        className={`px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        {isCollapsed ? "Ops" : "Operation"}
      </h3>
      <ul className="space-y-2">
        <li>
          <SidebarLink to="/operation" icon={CogIcon}>
            {!isCollapsed && "Dashboard"}
          </SidebarLink>
        </li>
      </ul>
    </div>
  );

  const renderBorrowerNav = () => (
    <div className="mb-6">
      <h3
        className={`px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        {isCollapsed ? "Bwr" : "Borrower"}
      </h3>
      <ul className="space-y-2">
        <li>
          <SidebarLink to="/borrower" icon={UserIcon}>
            {!isCollapsed && "Dashboard"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/borrower/loan-details" icon={DocumentTextIcon}>
            {!isCollapsed && "Loan Details"}
          </SidebarLink>
        </li>
      </ul>
    </div>
  );

  const renderChannelPartnerNav = () => (
    <div className="mb-6">
      <h3
        className={`px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        {isCollapsed ? "Chnl" : "Channel Partner"}
      </h3>
      <ul className="space-y-2">
        <li>
          <SidebarLink to="/channel" icon={ShareIcon}>
            {!isCollapsed && "Dashboard"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/channel/performance" icon={ChartBarIcon}>
            {!isCollapsed && "Performance"}
          </SidebarLink>
        </li>
      </ul>
    </div>
  );

  const renderFraudNav = () => (
    <div className="mb-6">
      <h3
        className={`px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        {isCollapsed ? "Fraud" : "Fraud Team"}
      </h3>
      <ul className="space-y-2">
        <li>
          <SidebarLink to="/fraud" icon={ShieldExclamationIcon}>
            {!isCollapsed && "Dashboard"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/fraud/alerts" icon={ClipboardDocumentCheckIcon}>
            {!isCollapsed && "Alerts"}
          </SidebarLink>
        </li>
      </ul>
    </div>
  );

  const renderInvestigationNav = () => (
    <div className="mb-6">
      <h3
        className={`px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        {isCollapsed ? "Inv" : "Investigation"}
      </h3>
      <ul className="space-y-2">
        <li>
          <SidebarLink to="/investigation" icon={MagnifyingGlassIcon}>
            {!isCollapsed && "Dashboard"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink
            to="/investigation/cases"
            icon={ClipboardDocumentCheckIcon}
          >
            {!isCollapsed && "Case Files"}
          </SidebarLink>
        </li>
      </ul>
    </div>
  );

  const renderCollectionNav = () => (
    <div className="mb-6">
      <h3
        className={`px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        {isCollapsed ? "Coll" : "Collection"}
      </h3>
      <ul className="space-y-2">
        <li>
          <SidebarLink to="/collection" icon={BanknotesIcon}>
            {!isCollapsed && "Dashboard"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink
            to="/collection/overdue"
            icon={ClipboardDocumentCheckIcon}
          >
            {!isCollapsed && "Overdue Accounts"}
          </SidebarLink>
        </li>
      </ul>
    </div>
  );

  const renderRecoveryNav = () => (
    <div className="mb-6">
      <h3
        className={`px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        {isCollapsed ? "Rec" : "Recovery"}
      </h3>
      <ul className="space-y-2">
        <li>
          <SidebarLink to="/recovery" icon={ArchiveBoxIcon}>
            {!isCollapsed && "Dashboard"}
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/recovery/cases" icon={ClipboardDocumentCheckIcon}>
            {!isCollapsed && "Assigned Cases"}
          </SidebarLink>
        </li>
      </ul>
    </div>
  );

  const renderNavigation = () => {
    switch (user?.role) {
      case "sales":
        return renderSalesNav();
      case "credit":
        return renderCreditNav();
      case "legal":
        return renderLegalNav();
      case "valuation":
        return renderValuationNav();
      case "finance":
        return renderFinanceNav();
      case "compliance":
        return renderComplianceNav();
      case "operation":
        return renderOperationNav();
      case "borrower":
        return renderBorrowerNav();
      case "channel":
        return renderChannelPartnerNav();
      case "fraud":
        return renderFraudNav();
      case "investigation":
        return renderInvestigationNav();
      case "collection":
        return renderCollectionNav();
      case "recovery":
        return renderRecoveryNav();
      default:
        return null;
    }
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-72"
      } bg-gray-900 text-white min-h-screen fixed left-0 top-0 overflow-y-auto shadow-xl transition-all duration-300 ease-in-out`}
    >
      <div className="sticky top-0 bg-gray-900 z-10 p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-2xl font-bold text-white">BRD Portal</h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <ArrowsPointingOutIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <ArrowsPointingInIcon className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>
        {!isCollapsed && user && (
          <p className="text-sm text-gray-400 mt-1">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
          </p>
        )}
      </div>

      <nav className={`p-4 ${isCollapsed ? "px-2" : ""}`}>
        <div className="mb-6">
          <h3
            className={`px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
              isCollapsed ? "text-center" : ""
            }`}
          >
            {isCollapsed ? "Pages" : "Pages"}
          </h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setShowAccessDeniedModal(true)}
                className="flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-base group text-gray-300 hover:bg-gray-800 hover:text-white w-full text-left"
                title="All Users"
              >
                <UserGroupIcon className="w-5 h-5 mr-3 text-gray-400" />
                {!isCollapsed && "All Users"}
              </button>
            </li>
          </ul>
        </div>
        {renderNavigation()}
      </nav>

      {/* Hover tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 top-6 bg-gray-900 p-2 rounded-lg shadow-lg text-sm text-white whitespace-nowrap">
          BRD Portal -{" "}
          {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} Dashboard
        </div>
      )}

      <AccessDeniedModal
        isOpen={showAccessDeniedModal}
        onClose={() => setShowAccessDeniedModal(false)}
        message="You are not allowed in this domain"
      />
    </aside>
  );
};

export default Sidebar;
