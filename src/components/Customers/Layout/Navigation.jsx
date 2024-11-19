import React from 'react';
import { NavLink, Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import './navigation.css';
const Navigation = () => {
    const navigate = useNavigate();
    // const location = useLocation(); // Get the current location
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        navigate('/login');
    };
    // const isHomePage = location.pathname === '/'; // Check if the current path is home
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
<>
{/* <section className={`${isHomePage ? 'position-fixed ' : ''} top-0 start-0 w-100 bg-dark`} > */}
<section className='position-fixed top-0 start-0 w-100 bg-dark '  >
    <div className="header-top" style={{display:"none"}}>
        <div className="container-xl">
            <div className="row justify-content-between align-items-center">
                <div className="col-lg-8 col-md-8">
                    <div className="header-top-info">
                        <a href="tel:+1(647)-406-1199"><MdPhone /><span> +1(647)-406-1199</span></a>
                        <a href="mailto:steve.roberts@evergreen-wireless.com"><MdEmail /><span> steve.roberts@evergreen-wireless.com</span></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4">
                    {/* <div className="header-top-socials text-center text-lg-right">
                        <a href="https://www.facebook.com/themefisher" target="_blank"><i className="ti-facebook"></i></a>
                        <a href="https://twitter.com/themefisher" target="_blank"><i className="ti-twitter"></i></a>
                        <a href="https://github.com/themefisher/" target="_blank"><i className="ti-github"></i></a>
                    </div> */}
                    <div className="header-top-socials text-center text-lg-right">
                        <select
                            className="form-select form-select-sm d-inline-block w-auto"
                            onChange={(e) => {
                            const selectedLanguage = e.target.value;
                            console.log('Language selected:', selectedLanguage);
                            // Add your language change logic here
                            }}
                            defaultValue="en"
                        >
                            <option value="en">English</option>
                            <option value="fr">French</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
 
        <nav className="navbar navbar-expand-lg main-nav py-3 awake" id="navbar">
            
		<div className="container-xl">
           
          <Link className="navbar-brand text-success"  to="/"> Evergreen Wireless </Link>

		  <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
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
                        isActive ? {  fontWeight: "bold", colour:"green important" } : undefined
                    }
                >
                    Home
                </NavLink>
			  </li>
			  <li className="nav-item">
                
                <NavLink
                    className="nav-link"
                    to="/about"
                    onClick={scrollToTop}
                    style={({ isActive }) =>
                        isActive ? { textDecoration: "underline  !important",  colour:"green important" , fontWeight: "bold" } : undefined
                    }
                >
                    About Us
                </NavLink>
                
                </li>
			   <li className="nav-item">
                
               <NavLink
                className="nav-link"
                to="/tradein"
                onClick={scrollToTop}
                style={({ isActive }) =>
                    isActive ? {  fontWeight: "bold"  , colour:"green important" } : undefined
                }
            >
                Trade-In
            </NavLink>

               </li>
			   <li className="nav-item">
               <NavLink
                className="nav-link"
                to="/contact"
                onClick={scrollToTop}
                style={({ isActive }) =>
                    isActive ? {  fontWeight: "bold" , colour:"green important"  } : undefined
                }
            >
                Contact Us
            </NavLink>

               </li>
               {isLoggedIn ? (
                <li className="nav-item dropdown">
                <div className="dropdown d-inline">
                    
               
                    <a className="nav-link dropdown-toggle text-success" 
                    href="/profile" id="dropdown05" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                    {user?.fullName || "User"}</a>
					<ul className="dropdown-menu" aria-labelledby="dropdown05">
						<li>
                            <NavLink className="dropdown-item" to="/profile"  onClick={scrollToTop} style={({ isActive }) =>
                                isActive ? { textDecoration: "underline  !important", colour:"green important" , fontWeight: "bold" } : undefined
                            }>View Profile</NavLink>
                        </li>
						<li>
                            <NavLink className="dropdown-item" to="/trade-history"  onClick={scrollToTop} style={({ isActive }) =>
                                isActive ? { textDecoration: "underline  !important", colour:"green important" , fontWeight: "bold" } : undefined
                            }>Trade History</NavLink>
                        </li>

						<li>
                            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                            
                         </li>
					</ul>
                </div>
                </li>
            ) : (
                <li className="nav-item">
                <NavLink
                    className="nav-link"
                    to="/login"  onClick={scrollToTop}
                    style={({ isActive }) =>
                        isActive ? {fontWeight: "bold" } : undefined
                    }
                >
                    Login
                </NavLink>
                </li>
            )}
               
					
			
			</ul>

			
		  </div>
		</div>
	</nav>
    </section>
    
        </>
    );
};

export default Navigation;
