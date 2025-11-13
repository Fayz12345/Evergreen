import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Import i18n hook
import "./navigation.css";
const Navigation = () => {
  const navigate = useNavigate();

  const { i18n } = useTranslation(); // Initialize useTranslation hook
  const { t } = useTranslation("navigation"); // Load the 'navigation' namespace

  // const location = useLocation(); // Get the current location
  const [user, setUser] = useState(null);
  const [newDevicesOpen, setNewDevicesOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Change language globally
  };

  // const isHomePage = location.pathname === '/'; // Check if the current path is home
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewDevicesNavClick = () => {
    scrollToTop();
    setNewDevicesOpen(false);
  };

  const activeLinkStyle = {
    textDecoration: "underline !important",
    color: "#00a651",
    fontWeight: 500,
  };

  return (
    <>
      <section className="position-fixed top-0 start-0 w-100 header-bar">
        <nav
          className="navbar navbar-expand-lg main-nav py-2 awake"
          id="navbar"
        >
          <div className="container-xl">
            <Link className="navbar-brand" to="/" aria-label="Home">
              <img
                src="/images/logo_dark.png"
                alt={
                  t
                    ? t("brand_name") ?? "Evergreen Wireless"
                    : "Evergreen Wireless"
                }
                className="brand-logo"
              />
            </Link>

            <button
              className="navbar-toggler collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample09"
              aria-controls="navbarsExample09"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="fa fa-bars"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample09">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <NavLink
                    className="nav-link"
                    to="/"
                    onClick={scrollToTop}
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : undefined
                    }
                  >
                    {t("home")}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/about"
                    onClick={scrollToTop}
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : undefined
                    }
                  >
                    {t("about")}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/tradein"
                    onClick={scrollToTop}
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : undefined
                    }
                  >
                    {t("trade_in")}
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/cpodevices"
                    onClick={scrollToTop}
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : undefined
                    }
                  >
                    {t("cpo_devices")}
                  </NavLink>
                </li>

                <li
                  className={`nav-item dropdown ${
                    newDevicesOpen ? "show" : ""
                  }`}
                  onMouseEnter={() => setNewDevicesOpen(true)}
                  onMouseLeave={() => setNewDevicesOpen(false)}
                >
                  <button
                    type="button"
                    className="nav-link dropdown-toggle text-white bg-transparent border-0 d-flex align-items-center gap-1"
                    aria-expanded={newDevicesOpen}
                    onClick={() => setNewDevicesOpen((prev) => !prev)}
                  >
                    <span>{t("new_devices")}</span>
                    <span className="dropdown-arrow">
                      {newDevicesOpen ? "▴" : "▾"}
                    </span>
                  </button>
                  <ul
                    className={`dropdown-menu ${newDevicesOpen ? "show" : ""}`}
                  >
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/newdevices"
                        onClick={handleNewDevicesNavClick}
                      >
                        {t("new_devices")}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/manuals"
                        onClick={handleNewDevicesNavClick}
                      >
                        {t("manuals")}
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/leasing"
                    onClick={scrollToTop}
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : undefined
                    }
                  >
                    {t("leasing")}
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/contact"
                    onClick={scrollToTop}
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : undefined
                    }
                  >
                    {t("contact")}
                  </NavLink>
                </li>

                <li className="nav-item dropdown">
                  <div className="dropdown d-inline">
                    <a
                      className="nav-link dropdown-toggle text-success"
                      href="/profile"
                      id="dropdown05"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    ></a>
                    <ul className="dropdown-menu" aria-labelledby="dropdown05">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/profile"
                          onClick={scrollToTop}
                          style={({ isActive }) =>
                            isActive ? activeLinkStyle : undefined
                          }
                        >
                          {t("view_profile")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/trade-history"
                          onClick={scrollToTop}
                          style={({ isActive }) =>
                            isActive ? activeLinkStyle : undefined
                          }
                        >
                          {t("trade_history")}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item d-flex align-items-center">
                  {/* Language Selector */}
                  <select
                    className="form-select form-select-sm d-inline-block w-auto ms-2"
                    onChange={(e) => changeLanguage(e.target.value)}
                    defaultValue={i18n.language} // Set current language as default
                    aria-label="Language selector"
                  >
                    <option value="en">EN</option>
                    <option value="fr">FR</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navigation;
