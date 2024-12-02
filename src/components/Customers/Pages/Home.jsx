import React from 'react';

import { useTranslation } from 'react-i18next'; // Import i18n hook
import '../Layout/Home2.css';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import CountUp from 'react-countup';
import axios from 'axios'; // Import axios for making requests


import { Link  } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation('home');
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
					<h1 className="animated fadeInUp mb-5 text-white">{t('title')}</h1>
					<Link to="/tradein" target="_blank" className="btn btn-success animated fadeInUp mr-1 mb-2 mb-lg-0">{t('explore_now')}</Link>
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
              alt="{t('our_expertise')}"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 text-center text-md-start">
            <h2>{t('our_expertise')}</h2>
            <p>
            {t('our_expertise_description')}
            </p>
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-md-6 order-md-2">
            <img
              src={`/images/commitment.jpg`}
              alt="{t('our_commitment')}"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 text-center text-md-start">
            <h2>{t('our_commitment')}</h2>
            <p>
            {t('our_commitment_description')}
            </p>
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <img
              src={`/images/community.jpg`}
              alt="{t('our_community')}"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 text-center text-md-start">
            <h2>{t('our_community')}</h2>
            <p>
              {t('our_community_description')}
            </p>
          </div>
          
        </div>

        <div className="row align-items-center mb-5">
          
          <div className="col-md-6 text-center text-md-start">
            <h2>{t('dont_gamble')}</h2>
            <p>
            {t('dont_gamble_description')}
            </p>
          </div>
          <div className="col-md-6">
            <img
              src={`/images/dont-gamble.jpg`}
              alt="{t('dont_gamble')}"
              className="img-fluid"
            />
          </div>
          
        </div>



      </section>


      <section className="container-xl my-5">
        <h2 className="text-center mb-4">{t('trades_section_title')}</h2>
        <Row className="justify-content-center mb-5">
          <Col md={4} className="text-center mb-4">
            <div className="trade-count-card shadow-sm p-4 rounded">
              <h4 className="mt-3">{t('apple')}</h4>
              <CountUp end={tradeCounts.Apple} duration={2} className="display-4 d-block" />
            </div>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="trade-count-card shadow-sm p-4 rounded">
              <h4 className="mt-3">{t('samsung')}</h4>
              <CountUp end={tradeCounts.Samsung} duration={2} className="display-4 d-block" />
            </div>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="trade-count-card shadow-sm p-4 rounded">
              <h4 className="mt-3">{t('other')}</h4>
              <CountUp end={tradeCounts.Other} duration={2} className="display-4 d-block" />
            </div>
          </Col>
        </Row>
      </section>


    </>
  );
};

export default Home;
