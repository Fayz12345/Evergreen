import React from 'react';
import '../Layout/Home2.css';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import CountUp from 'react-countup';
import axios from 'axios'; // Import axios for making requests


import { Link  } from 'react-router-dom';

const Home = () => {

  const [tradeCounts, setTradeCounts] = useState({ Apple: 0, Samsung: 0, Other: 0 });


  useEffect(() => {
    const fetchTradeCounts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tradeCountByManufacturer`);
        console.log(response.data);
        setTradeCounts(response.data);
      } catch (error) {
        console.error("Error fetching trade counts:", error);
      }
    };

    fetchTradeCounts();
  }, []);

  return (
    <>
    <section className="slider">
	<div className="container">
		<div className="row justify-content-center">
			<div className="col-lg-9 col-md-12">
				<div className="text-center">
					{/* <span className="d-block mb-3 text-uppercase">Prepare for new future</span> */}
					<h1 className="animated fadeInUp mb-5 text-white">Stay Connected Everywhere You Go</h1>
					<Link to="/tradein" target="_blank" className="btn btn-success animated fadeInUp mr-1 mb-2 mb-lg-0">Explore Now</Link>
				</div>
			</div>
		</div>
	</div>
</section>
      <section className="container-lg my-5">
        {/* <h2 className="text-center mb-4">ABOUT US</h2> */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <img
              src={`/images/expertise.jpg`}
              alt="Our Expertise"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 text-center text-md-start">
            <h2>Our Expertise</h2>
            <p>
              At Evergreen Wireless, we have a team of experts who are knowledgeable
              about the latest mobile and cellular phone technologies. We are committed to 
              staying up-to-date with the latest trends and innovations in the industry, 
              so we can offer our customers the best possible products and services.
            </p>
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-md-6 order-md-2">
            <img
              src={`/images/commitment.jpg`}
              alt="Our Commitment"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 text-center text-md-start">
            <h2>Our Commitment</h2>
            <p>
              Our commitment at Evergreen Wireless is to provide our customers with a 
              hassle-free shopping experience. We want to make it easy for our customers 
              to find the perfect device and offer a variety of payment and shipping options 
              to make the process as seamless as possible.
            </p>
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <img
              src={`/images/community.jpg`}
              alt="Our Community"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 text-center text-md-start">
            <h2>Our Community</h2>
            <p>
              At Evergreen Wireless, we believe in giving back to our community. We are 
              committed to supporting local charities and organizations, and strive to 
              make a positive impact in the lives of those around us.
            </p>
          </div>
          
        </div>

        <div className="row align-items-center mb-5">
          
          <div className="col-md-6 text-center text-md-start">
            <h2>Don’t gamble on a used phone.</h2>
            <p>
            Our certified pre-owned phones are tested, inspected, and cleaned by expert 
            technicians to work like new at a fraction of the cost. Plus, you get extra 
            peace of mind with a 1-year warranty* and no-blacklist guarantee, which means 
            we never sell lost or stolen phones.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src={`/images/dont-gamble.jpg`}
              alt="Dont gamble"
              className="img-fluid"
            />
          </div>
          
        </div>



      </section>
      {/* <section className="homelatest__feature">
        <div className="container-xl homelatest__feature-container">
          <div className="row homelatest__feat-row">

           <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxl-3 homelatest__feat-col">
                <div className="homelatest__feat-icon">
                  <img 
                  src="https://mobileklinik.ca/wp-content/uploads/2024/05/certified-icon-45-45.svg" alt="yellow badge icon" width="45" 
                  height="45" data-lazy-src="https://mobileklinik.ca/wp-content/uploads/2024/05/certified-icon-45-45.svg" 
                  data-ll-status="loaded" className="entered lazyloaded" /><noscript>
                    <img src="https://mobileklinik.ca/wp-content/uploads/2024/05/certified-icon-45-45.svg" 
                  alt="yellow badge icon" width="45" height="45" /></noscript>
                </div>
                <div className="homelatest__feat-desc"><h3>Expertise</h3>
                  <p>Apple, Samsung and Google certified, you can trust our expert technicians with your device and privacy.</p>
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxl-3 homelatest__feat-col">
                <div className="homelatest__feat-icon">
                  <img src="https://mobileklinik.ca/wp-content/uploads/2024/05/quality-icon-45-45.svg" alt="yellow phone icon" width="45" height="45" data-lazy-src="https://mobileklinik.ca/wp-content/uploads/2024/05/quality-icon-45-45.svg" data-ll-status="loaded" className="entered lazyloaded"/><noscript><img src="https://mobileklinik.ca/wp-content/uploads/2024/05/quality-icon-45-45.svg" alt="yellow phone icon" width="45" height="45" /></noscript>
                </div>
                <div className="homelatest__feat-desc"><h3>Quality</h3>
                  <p>Our phones undergo a 64-point inspection to ensure they function like new. Plus, they’re backed by a 1-year warranty*.</p>
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxl-3 homelatest__feat-col">
                <div className="homelatest__feat-icon">
                 <img src="https://mobileklinik.ca/wp-content/uploads/2024/05/reviews-icon-45-45.svg" alt="yellow review speech bubble icon" width="45" height="45" data-lazy-src="https://mobileklinik.ca/wp-content/uploads/2024/05/reviews-icon-45-45.svg" data-ll-status="loaded" className="entered lazyloaded"/><noscript><img src="https://mobileklinik.ca/wp-content/uploads/2024/05/reviews-icon-45-45.svg" alt="yellow review speech bubble icon" width="45" height="45" /></noscript>
                </div>
                <div className="homelatest__feat-desc"><h3>Customer Experience</h3>
                  <p>Visit one 130+ locations across Canada to shop phones in-store, get advice from our expert technicians, and more.</p>
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxl-3 homelatest__feat-col">
                <div className="homelatest__feat-icon">
                <img src="https://mobileklinik.ca/wp-content/uploads/2024/05/sustainable-icon-45-45.svg" alt="yellow leaf icon" width="45" height="45" data-lazy-src="https://mobileklinik.ca/wp-content/uploads/2024/05/sustainable-icon-45-45.svg" data-ll-status="loaded" className="entered lazyloaded"/><noscript><img src="https://mobileklinik.ca/wp-content/uploads/2024/05/sustainable-icon-45-45.svg" alt="yellow leaf icon" width="45" height="45" /></noscript>
                </div>
                <div className="homelatest__feat-desc"><h3>Sustainability</h3>
                <p>Buying a certified pre-owned keeps phones out of landfills and produces less carbon emissions vs. buying new.</p>
                </div>
              </div>
          </div>
        </div>   
      </section> */}

      <section className="container-xl my-5">
        <h2 className="text-center mb-4">Trades</h2>
        <Row className="justify-content-center mb-5">
          <Col md={4} className="text-center mb-4">
            <div className="trade-count-card shadow-sm p-4 rounded">
              <h4 className="mt-3">Apple</h4>
              <CountUp end={tradeCounts.Apple} duration={2} className="display-4 d-block" />
            </div>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="trade-count-card shadow-sm p-4 rounded">
              <h4 className="mt-3">Samsung</h4>
              <CountUp end={tradeCounts.Samsung} duration={2} className="display-4 d-block" />
            </div>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="trade-count-card shadow-sm p-4 rounded">
              <h4 className="mt-3">Other</h4>
              <CountUp end={tradeCounts.Other} duration={2} className="display-4 d-block" />
            </div>
          </Col>
        </Row>
      </section>


    </>
  );
};

export default Home;
