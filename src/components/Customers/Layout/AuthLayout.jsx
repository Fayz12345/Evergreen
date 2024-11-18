import React from 'react';
import {  useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import '../../../includes/css/bootstrap.min.css';
import Footer from "./Footer";
import Navigation from "./Navigation";

const AuthLayout = () => {
  const navigate = useNavigate();

  // New useEffect to check user role and navigate if necessary
  useEffect(() => {
      const user = JSON.parse(sessionStorage.getItem('user'));               

      if (user) {
          if (user.role === 'admin' || user.role === 'salesrep') {
              navigate('/admin');
          }
      } 
  }, [navigate]);



  return (
    <>
      <div className="wrapper" >
        <header className='header-overlay bg-dark'>
          <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 text-white">
            <h5 className="my-0 mr-md-auto font-weight-normal">
              <Link className="text-light fs-2  text-decoration-none" to="/">Evergreen Wireless</Link>
            </h5>
            <Navigation />
          </div>
           
        </header>

        <div className="content mt-5">
      
               <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AuthLayout;
