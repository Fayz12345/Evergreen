import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { FiUsers } from 'react-icons/fi';
import { MdDevicesOther } from 'react-icons/md';
import { LiaUsersSolid } from 'react-icons/lia';
import { GiTrade } from 'react-icons/gi';
import { TbReportSearch } from 'react-icons/tb';
import { GiPayMoney } from "react-icons/gi";
import { Link } from 'react-router-dom';
const AdminNavigation = ({ children }) => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem('isLoggedIn'); // Clear login status
      navigate('/admin/login'); // Redirect to login page
    };
  return (
    <>
    
      <div className="h-100 d-flex flex-column justify-content-between pb-5">
        <ul className="nav flex-column list-unstyled">
          {/* Dashboard */}
          <li className="nav-item my-2 d-flex justify-content-start align-items-center">
            <Link className="p-2 text-dark d-flex align-items-center" to="/admin">
              <RxDashboard size={24} className="me-2" />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Users */}
          <li className="nav-item my-2 d-flex justify-content-start align-items-center">
            <Link className="p-2 text-dark d-flex align-items-center" to="/admin/users">
              <FiUsers size={24} className="me-2" />
              <span>Users</span>
            </Link>
          </li>

          {/* Devices */}
          <li className="nav-item my-2 d-flex justify-content-start align-items-center">
            <Link className="p-2 text-dark d-flex align-items-center" to="/admin/devices">
              <MdDevicesOther size={24} className="me-2" />
              <span>Devices</span>
            </Link>
          </li>

          {/* Customers */}
          <li className="nav-item my-2 d-flex justify-content-start align-items-center">
            <Link className="p-2 text-dark d-flex align-items-center" to="/admin/customers">
              <LiaUsersSolid size={24} className="me-2" />
              <span>Customers</span>
            </Link>
          </li>

          {/* Trade In */}
          <li className="nav-item my-2 d-flex justify-content-start align-items-center">
            <Link className="p-2 text-dark d-flex align-items-center" to="/admin/trade">
              <GiTrade size={24} className="me-2" />
              <span>Trade In</span>
            </Link>
          </li>

          {/* Reports */}
          <li className="nav-item my-2 d-flex justify-content-start align-items-center">
            <Link className="p-2 text-dark d-flex align-items-center" to="/admin/reports">
              <TbReportSearch size={24} className="me-2" />
              <span>Reports</span>
            </Link>
          </li>
           {/* Reports */}
           <li className="nav-item my-2 d-flex justify-content-start align-items-center">
            <Link className="p-2 text-dark d-flex align-items-center" to="/admin/incentive">
              <GiPayMoney size={24} className="me-2" />
              <span>Incentive</span>
            </Link>
          </li>
        </ul>

        <ul className="nav flex-column list-unstyled mb-5">
          {/* Logout */}
          <li className="nav-item my-2 d-flex justify-content-start align-items-center">
            <Link  onClick={handleLogout} className="p-2 text-dark d-flex align-items-center" to="/admin/login">
              <RiLogoutBoxRFill size={24} className="me-2" />
              <span>Logout</span>
            </Link>
            {/* <button className="btn btn-danger" onClick={handleLogout} > </button> */}
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminNavigation;
