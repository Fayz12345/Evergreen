import React from 'react';
import { NavLink, Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import i18n hook
import './navigation.css';
const Navigation = () => {
    const navigate = useNavigate();

    const { i18n } = useTranslation(); // Initialize useTranslation hook
    const { t } = useTranslation('navigation'); // Load the 'navigation' namespace

    
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


    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng); // Change language globally
    };


    // const isHomePage = location.pathname === '/'; // Check if the current path is home
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
<>
  <section className='position-fixed top-0 start-0 w-100 bg-dark'>
     
 
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
                    {t('home')}
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
                   {t('about')}
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
                {t('trade_in')}
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
                {t('contact')}
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
                            }>{t('view_profile')}</NavLink>
                        </li>
						<li>
                            <NavLink className="dropdown-item" to="/trade-history"  onClick={scrollToTop} style={({ isActive }) =>
                                isActive ? { textDecoration: "underline  !important", colour:"green important" , fontWeight: "bold" } : undefined
                            }>{t('trade_history')}</NavLink>
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
                    {t('login')}
                </NavLink>
                </li>
            )}
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
