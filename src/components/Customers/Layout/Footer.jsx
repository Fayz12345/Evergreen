import React from 'react';
import './Footer.css'; // Ensure this CSS file exists
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        // <footer className="footer bg-dark text-white text-center py-3 mt-auto">
        //     <div className="container-xl">
        //         <div className="row">
        //             {/* Copyright Section */}
        //             <div className="col-md-4 my-2">
        //                 <p>&copy; 2024 Evergreen Wireless. All rights reserved.</p>
        //             </div>

        //             {/* Navigation Links */}
        //             <div className="col-md-8 my-2">
        //                 <ul className="list-inline">
        //                     <li className="list-inline-item">
        //                         <Link to="/terms-conditions" className="text-white">
        //                             Terms and Conditions
        //                         </Link>
        //                     </li>
        //                     <li className="list-inline-item mx-3"> |</li>
        //                     <li className="list-inline-item">
        //                         <Link to="/contact" className="text-white">
        //                             Contact Us
        //                         </Link>
        //                     </li>
        //                 </ul>
        //             </div>

                    
        //         </div>
        //     </div>
        // </footer>
        <footer className="footer section bg-dark">
{/* <link rel="stylesheet" href="/css/bootstrap.min.css"></link>
<link rel="stylesheet" href="/css/themify-icon.css"></link> */}
	<div className="container-xl mt-5">
		<div className="row justify-content-between">
            {/* <div className="col-lg-4 col-md-6 col-sm-6">
                    
                    <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5786.706220015706!2d-79.68223182451993!3d43.51582876130582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b43a74210acc1%3A0x9fcd452e8cde4cac!2s2889%20Brighton%20Rd%2C%20Oakville%2C%20ON%20L6H%206C9!5e0!3m2!1sen!2sca!4v1731680954495!5m2!1sen!2sca" 
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                    title="Our Location"
                    className="border rounded"></iframe>
                    
                
            </div> */}
			<div className="col-lg-6 ml-auto col-sm-6">
                <div className="widget text-white text-left">
					
					<h4 className="text-white mb-5">Evergreen Wireless</h4>
					
					<a href="tel:+ +1(647)-406-1199" className="text-decoration-none text-white" >steve.roberts@evergreen-wireless.com</a>
					<p className="mt-4 mb-3 text-white">2889 Brighton Rd, Oakville, ON L6H 6C9</p>
					<a href="tel:+23-456-6588" className="text-decoration-none text-white" ><span className="text-white h4"> +1(647)-406-1199</span></a>
				</div>
			</div>
            

			
			<div className="col-lg-6 col-md-6 col-sm-6">
				<div className="widget">
					<h4 className="text-capitalize mb-5 text-right text-white ">Quick Links</h4>

					<ul className="list-unstyled list-hover-underline text-right">

                        <li><Link className="mb-3 text-decoration-none text-light"  to="/terms">Terms &amp; Conditions</Link></li>
                        <li><Link className="mb-3 text-decoration-none text-light"  to="/privacy">Privacy Policy</Link></li>
                        <li><Link className="mb-3 text-decoration-none text-light" to="/about">About</Link></li>
                        <li><Link className="mb-3 text-decoration-none text-light"  to="/contact">Contact</Link></li>
					</ul>
				</div>
			</div>
			
		</div>
	
		<div className="footer-btm pt-4 pb-3    mt-5" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
			<div className="row justify-content-center">
				<div className="col-lg-8 text-center">
					<div className="copyright text-white">
						<p>© Copyright Reserved to Evergeen Wireless</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>
    );
};

export default Footer;
