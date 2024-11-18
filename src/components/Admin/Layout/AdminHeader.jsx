import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./header.css";
import React, { useEffect } from 'react';
import { TfiMenu } from "react-icons/tfi";
import { Link, useNavigate } from 'react-router-dom';
import { RiLogoutBoxRFill } from 'react-icons/ri';

const AdminHeader = ({ children }) => {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user')) || {}; // Fallback to empty object if user is null
    const isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn'));

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        sessionStorage.clear();
        navigate('/login');
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [navigate, isLoggedIn]);

    return (
        <header className='navbar sticky-top bg-primary flex-md-nowrap p-0 shadow' data-bs-theme='dark'>
            <a className='navbar-brand col-md-3 col-lg-2 me-0 p-3 fs-6 text-white fw-bold d-flex align-items-center' href='/admin'>
                <TfiMenu />
                <span className='mx-2'>Evergreen Dashboard</span>
            </a>
            <div className='d-flex mx-4 d-none d-md-flex' role='search'>
                <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle text-white"
                                    to="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={`${user.fullName || 'User'}'s avatar`}
                                            style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                                        />
                                    ) : (
                                        <img
                                            src="/path/to/default-avatar.png" // Path to a default avatar image
                                            alt="Default avatar"
                                            style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                                        />
                                    )}
                                    {user.fullName || 'Guest'}
                                </Link>
                                <ul className="dropdown-menu bg-light text-white" aria-labelledby="navbarDropdownMenuLink">
                                    <li>
                                        <Link
                                            onClick={handleLogout}
                                            className="dropdown-item no-hover-bg"
                                            to="/login"
                                        >
                                            <RiLogoutBoxRFill size={24} className="me-2" />
                                            <span>Logout</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default AdminHeader;
