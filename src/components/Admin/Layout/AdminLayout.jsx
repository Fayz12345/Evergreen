import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminNavigation from "./AdminNavigation";

// Import icons for toggle button
import { FaBars, FaTimes } from "react-icons/fa"; 

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar only when a direct link is clicked (not a dropdown)
  const handleLinkClick = (e) => {
    // Check if the clicked element is a link (i.e., anchor tag)
    const targetElement = e.target.closest("a");

    if (targetElement && window.matchMedia("(max-width: 768px)").matches) {
      setIsSidebarOpen(false); // Hide sidebar on mobile after clicking a link
    }
  };

  // Automatically hide sidebar on smaller screens initially
  const handleResize = () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  // Detect screen size changes
  useEffect(() => {
    handleResize(); // Check screen size on load
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup listener
    };
  }, []);

  return (
    <>
      {/* Admin Header */}
      <AdminHeader />

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div
            className={`col-12 col-md-2 col-lg-2 p-0 vh-100 bg-primary shadow-sm ${
              isSidebarOpen ? "d-block" : "d-none d-md-block"
            }`}
          >
            <div
              className="bg-body-tertiary h-100 overflow-auto"
              onClick={handleLinkClick} // Detect direct link clicks
            >
              <AdminNavigation />
            </div>
          </div>

          {/* Main Content */}
          <main
            className={`col-12 ${
              isSidebarOpen ? "col-md-10 col-lg-10" : "col-12"
            } px-4 py-3 transition-all`}
            style={{ height: "calc(100vh - 5vh)", overflowY: "auto" }}
          >
            {/* Sidebar Toggle Button for Mobile */}
            <button
              className="btn btn-outline-primary d-md-none mb-3"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Outlet for Nested Routes */}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
