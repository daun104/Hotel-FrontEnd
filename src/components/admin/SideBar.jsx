// src/components/admin/Sidebar.jsx
import React from 'react';
import {
  HomeIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  Cog6ToothIcon, // ⚙️ new icon
} from '@heroicons/react/24/outline';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: <HomeIcon className="w-5 h-5 mr-2" /> },
    { key: 'search', label: 'Search Users', icon: <UserGroupIcon className="w-5 h-5 mr-2" /> },
    { key: 'rooms', label: 'Rooms', icon: <BuildingOfficeIcon className="w-5 h-5 mr-2" /> },
    { key: 'bookings', label: 'Bookings', icon: <CalendarIcon className="w-5 h-5 mr-2" /> },
    { key: 'config', label: 'Configuration', icon: <Cog6ToothIcon className="w-5 h-5 mr-2" /> }, // 🔥 new tab
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r p-6 flex flex-col min-h-screen">
      <h2 className="text-xl font-bold mb-6 text-gray-700 dark:text-gray-200">Admin Panel</h2>
      <nav className="flex flex-col space-y-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center text-left px-4 py-2 rounded transition-colors
              ${
                activeTab === tab.key
                  ? 'bg-gray-200 dark:bg-gray-700 font-semibold'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
