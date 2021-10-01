import React, { useState } from 'react';
import { SidebarLink } from 'components';

import styles from './Sidebar.module.css';
import Header from 'parts/Header/Header';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((oldValue) => !oldValue);
  };

  const openSidebar = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Header sidebarOpener={openSidebar} />
      <div
        className={`md:flex flex-col md:flex-row md:min-h-screen transition-width overflow-hidden md:overflow-auto fixed ${
          isOpen ? styles['sidebar-open'] : styles['sidebar-closed']
        }`}
      >
        <div className="flex flex-col md:w-64 text-gray-700 bg-white min-h-screen dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0 transition-width">
          <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
            <a
              href="#"
              className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
            >
              Guia Estelar 🌌
            </a>
            <button
              onClick={toggleSidebar}
              className="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline"
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
            <SidebarLink href="/">Início</SidebarLink>
            <SidebarLink href="/characters/1">Pessoas</SidebarLink>
            <SidebarLink href="/planets/1">Planetas</SidebarLink>
            <SidebarLink href="/spaceships">Naves</SidebarLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
