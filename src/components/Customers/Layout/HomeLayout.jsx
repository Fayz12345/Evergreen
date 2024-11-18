import React from 'react';
import { useEffect } from "react";
import { Outlet, useNavigate} from 'react-router-dom';
import Footer from "./Footer";
import Navigation from "./Navigation";

const HomeLayout = () => {
  // const [scrolled, setScrolled] = useState(false);
  // const location = useLocation(); // Get the current location
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

  useEffect(() => {
    const handleScroll = () => {
      // const isScrolled = window.scrollY > 50;
      // setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // const isHomePage = location.pathname === '/'; // Check if the current path is home

  return (
    <>
      <div className="wrapper">

          <link rel="stylesheet" href="/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/css/themify-icons.css" />
          <link rel="stylesheet" href="/css/all.css" />
          <link rel="stylesheet" href="/css/animate.css" />
          <link rel="stylesheet" href="/css/aos.css" />
          <link rel="stylesheet" href="/css/magnific-popup.css" />
          <link rel="stylesheet" href="/css/modal-video.min.css" />
          <link rel="stylesheet" href="/css/slick.css" />
          <link rel="stylesheet" href="/css/slick-theme.css" />
          <link rel="stylesheet" href="/css/style.css" />
        {/* <header className={`${isHomePage ? 'navigation' : ''}`}> */}
        <script type="text/javascript" charSet="UTF-8" src="/js/common.js.download"></script>
        <script type="text/javascript" charSet="UTF-8" src="/js/util.js.download"></script>

        <header className='navigation'>
          <Navigation />
        </header>
        {/* <header className={`header-overlay ${scrolled ? "bg-dark" : "bg-dark-opacity"} ${scrolled ? "sticky-header" : ""}`}>
          <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 text-white">
            <h5 className="my-0 mr-md-auto font-weight-normal">
              <Link className="text-light fs-2  text-decoration-none" to="/">Evergreen Wireless</Link>
            </h5>
            <Navigation />
          </div>
        </header> */}

        {/* <section
          style={{
            position: "relative",
            backgroundImage: `url(/images/stayconnected.webp)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '50vh',
          }}
        >
          <div className="bg-image p-5 container text-center shadow-1-strong rounded mb-5 text-white">
           <br />
            <h1>Stay Connected Everywhere You Go</h1>
            <p className="lead"><b>Discover the best deals on Certified Pre-Owned mobile phones</b></p>
            <Link to="/tradein" className="btn btn-light">Explore Now</Link>
          </div>
        </section> */}

      <div className="main-wrapper ">
        <div className="content">
          <Outlet />
          </div>
          </div>

        <Footer />
      </div>
    </>
  );
};

export default HomeLayout;
