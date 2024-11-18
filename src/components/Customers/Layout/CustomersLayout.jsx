import React from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import '../../../includes/css/bootstrap.min.css';
import Header from "./Header";
import Footer from "./Footer";
const CustomersLayout = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
      <div className="wrapper">
          <Header />
               
          {/* Breadcrumb Navigation */}
          <div className="container-xl mt-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-light p-3 rounded">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                {pathnames.map((name, index) => {
                  const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                  const isLast = index === pathnames.length - 1;
                  return isLast ? (
                    <li key={name} className="breadcrumb-item active" aria-current="page">
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </li>
                  ) : (
                    <li key={name} className="breadcrumb-item">
                      <Link to={routeTo}>{name.charAt(0).toUpperCase() + name.slice(1)}</Link>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
          
          <div className="content">
            <Outlet />
          </div>
        
          <Footer />
      </div>
      
    </>
  )
};

export default CustomersLayout;