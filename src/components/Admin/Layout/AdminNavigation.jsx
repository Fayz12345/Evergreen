import React, { useState } from 'react'; // Import useState for collapsible behavior
import { RxDashboard } from 'react-icons/rx';
import { FiUsers } from 'react-icons/fi';
import { MdDevicesOther } from 'react-icons/md';
import {  GiPayMoney } from 'react-icons/gi';
import { TbReportSearch } from 'react-icons/tb';
import { FaChevronDown } from 'react-icons/fa'; // Chevron icon for collapse/expand
import { Link } from 'react-router-dom';
import { MdMemory } from "react-icons/md";
import { MdOutlineDevicesFold } from "react-icons/md";
import { FcMultipleDevices } from "react-icons/fc";
import { PiUserList } from "react-icons/pi";
import { TbDevicesPlus } from "react-icons/tb";
import { HiMiniPlus } from "react-icons/hi2";
import { TbDevicesCog } from "react-icons/tb";
import './Navigation.css';
const AdminNavigation = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn'));
  const [activeLink, setActiveLink] = useState('/admin');

  const handleLinkClick = (link) => {
    setActiveLink(link);
    const linksToCollapseSections = ['/admin', '/admin/users', '/admin/reports', '/admin/incentive','/admin/customers'];
    if (linksToCollapseSections.includes(link)) {
      setOpenSections({
        tradeIn: false,
        devices: false,
      });
    }
  };

  // State to manage collapsible sections
  const [openSections, setOpenSections] = useState({
    tradeIn: false,
    devices: false,
  });

  // Toggle a specific section open/closed
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section], // Toggle the specific section
    }));
  };

  return (
    <div className="h-100 d-flex flex-column justify-content-between pb-5">
      <ul className="nav flex-column list-unstyled">
        {/* Dashboard */}
        <li className="nav-item my-2">
          <Link className={`p-2 text-dark d-flex align-items-center text-decoration-none  ${activeLink === '/admin' ? 'active' : ''}`} 
            onClick={() => handleLinkClick('/admin')} to="/admin">
            <RxDashboard size={24} className="me-2" />
            <span>Dashboard</span>
          </Link>
        </li>

        {user?.role === 'admin' && isLoggedIn && (
          <>
            {/* Users */}
            <li className="nav-item my-2">
              <Link className={`p-2 text-dark d-flex align-items-center text-decoration-none ${activeLink === '/admin/users' ? 'active' : ''}`} 
            onClick={() => handleLinkClick('/admin/users')}  to="/admin/users">
                <FiUsers size={24} className="me-2" />
                <span>Users</span>
              </Link>
            </li>

            {/* Devices Section */}
            <li className="nav-item my-2">
              <div
                className="d-flex justify-content-between align-items-center p-2 text-dark"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleSection('devices')}
              >
                <div className="d-flex align-items-center">
                  <MdDevicesOther size={24} className="me-2" />
                  <span>Devices</span>
                </div>
                <FaChevronDown
                  size={16}
                  className={`ms-2 transition-transform ${
                    openSections.devices ? 'rotate-180' : ''
                  }`}
                />
              </div>

              <ul className={`collapse ${openSections.devices ? 'show' : ''} list-unstyled ms-4`}>
                <li className="nav-item my-2">
                  <Link className={`p-2 text-dark text-decoration-none ${activeLink === '/admin/manufacturer' ? 'active' : ''}`}  
            onClick={() => handleLinkClick('/admin/manufacturer')} to="/admin/manufacturer">
                  <MdOutlineDevicesFold size={24} className="me-2" />
                    Manufacturers
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className={`p-2 text-dark text-decoration-none ${activeLink === '/admin/memory' ? 'active' : ''}`}  
            onClick={() => handleLinkClick('/admin/memory')} to="/admin/memory">
                  <MdMemory  size={24} className="me-2" />
                    Memory
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className={`p-2 text-dark text-decoration-none ${activeLink === '/admin/models' ? 'active' : ''}`}  
            onClick={() => handleLinkClick('/admin/models')} to="/admin/models">
                  <FcMultipleDevices  size={24} className="me-2" />
                    Models
                  </Link>
                </li>
              </ul>
            </li>
          </>
        )}

        {/* Customers Section */}
        {(user?.role === 'salesrep' || user?.role === 'admin') && isLoggedIn && (
          <>
            <li className="nav-item my-2">
              <Link className={`p-2 text-dark d-flex align-items-center text-decoration-none ${activeLink === '/admin/customers' ? 'active' : ''}`}   
            onClick={() => handleLinkClick('/admin/customers')} to="/admin/customers">
                <PiUserList size={24} className="me-2" />
                <span>Customers</span>
              </Link>
            </li>

            {/* Trade In Section */}
            <li className="nav-item my-2">
              <div
                className="d-flex justify-content-between align-items-center p-2 text-dark"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleSection('tradeIn')}
              >
                <div className="d-flex align-items-center">
                  <TbDevicesPlus  size={24} className="me-2" />
                  <span>Trade In</span>
                </div>
                <FaChevronDown
                  size={16}
                  className={`ms-2 transition-transform ${
                    openSections.tradeIn ? 'rotate-180' : ''
                  }`}
                />
              </div>

              <ul className={`collapse ${openSections.tradeIn ? 'show' : ''} list-unstyled ms-4`}>
                <li className="nav-item my-2">
                  <Link className={`p-2 text-dark text-decoration-none ${activeLink === '/admin/trade-in' ? 'active' : ''}`}  
            onClick={() => handleLinkClick('/admin/trade-in')} to="/admin/trade-in">
                  <HiMiniPlus   size={24} className="me-2" />
                    Add Trade
                  </Link>
                  </li>
                {/* <li className="nav-item my-2">
                  <Link className={`p-2 text-dark text-decoration-none ${activeLink === '/admin/batch' ? 'active' : ''}`}  
            onClick={() => handleLinkClick('/admin/batch')} to="/admin/batch">
                  <HiMiniPlus   size={24} className="me-2" />
                    Add Batch
                  </Link>
                </li> */}
                <li className="nav-item my-2">
                  <Link className={`p-2 text-dark text-decoration-none ${activeLink === '/admin/trade-history' ? 'active' : ''}`}  
            onClick={() => handleLinkClick('/admin/trade-history')} to="/admin/trade-history">
                  <TbDevicesCog    size={24} className="me-2" />
                    Trade History
                  </Link>
                </li>
                {/* <li className="nav-item my-2">
                  <Link className={`p-2 text-dark text-decoration-none ${activeLink === '/admin/batch-history' ? 'active' : ''}`}  
            onClick={() => handleLinkClick('/admin/batch-history')} to="/admin/batch-history">
                  <TbDevicesCog    size={24} className="me-2" />
                    Batch History
                  </Link>
                </li> */}
              </ul>
            </li>

            {/* Incentive Section */}
            <li className="nav-item my-2">
              <Link className={`p-2 text-dark d-flex align-items-center text-decoration-none ${activeLink === '/admin/incentive' ? 'active' : ''}`}  
            onClick={() => handleLinkClick('/admin/incentive')} to="/admin/incentive">
                <GiPayMoney size={24} className="me-2" />
                <span>Incentive</span>
              </Link>
            </li>
          </>
        )}

        {/* Reports Section */}
        {user?.role === 'admin' && isLoggedIn && (
          <li className="nav-item my-2">
            <Link className={`p-2 text-dark d-flex align-items-center text-decoration-none ${activeLink === '/admin/reports"' ? 'active' : ''}`} 
            onClick={() => handleLinkClick('/admin/reports')} to="/admin/reports">
              <TbReportSearch size={24} className="me-2" />
              <span>Reports</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default AdminNavigation;
