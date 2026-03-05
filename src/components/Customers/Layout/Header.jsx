import React from 'react';
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import './Home.css';
import { useNavigate } from 'react-router-dom';

import { useEffect} from 'react';
const Header= ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        // Check if user is logged in by verifying session data
        const user = JSON.parse(sessionStorage.getItem('user'));               

        if (user) {
            if (user.role === 'admin' || user.role === 'salesrep' ) {
                navigate('/admin');
            }
        } 
    }, [navigate]);

    return (
        <>
            <div className="sticky-top d-flex flex-column flex-md-row align-items-center p-3 px-md-4 header-bar border-bottom box-shadow text-decoration-none">
            {/* <h5 className="my-0 mr-md-auto font-weight-normal"><Link to="/" className="text-success" >Evergreen Wireless</Link></h5> */}
                <Navigation />
            </div>
        </>
    );
};

export default Header;
