import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { MessageProvider } from '../context/MessageContext';
import GlobalMessageDisplay from './GlobalMessageDisplay';

const DepartmentLayout = () => {
  return (
    <MessageProvider>
      <div className="flex flex-col min-h-screen">
        <div className="pl-72">
          <Header />
        </div>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 bg-gray-50 min-h-screen pl-72">
            <div className="container mx-auto p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <GlobalMessageDisplay />
    </MessageProvider>
  );
};

export default DepartmentLayout;
