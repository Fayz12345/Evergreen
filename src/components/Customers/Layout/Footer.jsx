import React from "react";
import "./Footer.css"; // Ensure this CSS file exists
import { NavLink } from "react-router-dom";

import { useTranslation } from "react-i18next"; // Import i18n hook
const Footer = () => {
  const { t } = useTranslation("navigation"); // Load the 'navigation' namespace
  const currentYear = new Date().getFullYear();

  // const isHomePage = location.pathname === '/'; // Check if the current path is home
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
  <footer className="py-3 footer-bar text-white">
        <div className="container-xl ">
          <div className="row align-items-center">
            {/* Evergreen Wireless (Left-aligned) */}
            <div className="col-md-4">
              <span className="px-2 text-decoration-none fw-bold text-success footer-copy">
                &copy; {currentYear} {t("copyright")}
              </span>
            </div>

            {/* Navigation Links (Right-aligned) */}
            <div className="col-md-8">
              <ul className="nav justify-content-end mb-0 footer-nav">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    onClick={scrollToTop}
                    className={({ isActive }) =>
                      `nav-link px-2  ${
                        isActive ? "fw-bold text-success" : "text-white"
                      }`
                    }
                  >
                    {t("home")}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/terms"
                    onClick={scrollToTop}
                    className={({ isActive }) =>
                      `nav-link px-2  ${
                        isActive ? "fw-bold text-success" : "text-white"
                      }`
                    }
                  >
                    {t("terms_conditions")}
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                        <NavLink
                            to="/privacy"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                `nav-link px-2  ${isActive ? 'fw-bold text-success' : 'text-white'}`
                            }
                        >
                            Privacy Policies
                        </NavLink>
                    </li> */}
                <li className="nav-item">
                  <NavLink
                    to="/about"
                    onClick={scrollToTop}
                    className={({ isActive }) =>
                      `nav-link px-2  ${
                        isActive ? "fw-bold text-success" : "text-white"
                      }`
                    }
                  >
                    {t("about")}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/contact"
                    onClick={scrollToTop}
                    className={({ isActive }) =>
                      `nav-link px-2  ${
                        isActive ? "fw-bold text-success" : "text-white"
                      }`
                    }
                  >
                    {t("contact")}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <p className="text-center text-white mt-1">© 2024 Evergreen Wireless |   All Rights Reserved</p> */}
      </footer>
    </>
  );
};

export default Footer;
