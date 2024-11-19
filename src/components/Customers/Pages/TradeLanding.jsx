
import React from 'react';
import { Container,Button, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const  TradeLanding= () => {
  const fadeVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
  
  return (
    <>

    
<section className="slider text-white bg-dark py-5 mt-5">
                <Container>
                    <Row className="justify-content-center text-center mt-5">
                        <Col lg={9} md={12}>
                        <motion.div initial="hidden" animate="visible" variants={fadeVariants}>
                          <h1 className="animated fadeInUp mb-3 mt-5 text-white">
                            Trade In with Evergreen Wireless
                          </h1>
                        </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <div className="container-xl text-center my-5 mt-5 pt-5">
              <p className="lead">
                At Evergreen Wireless, we believe that your mobile device should be more than just a phone.
                It should be a tool that enhances your life and helps you stay connected with the people
                and things that matter most. That’s why we offer the latest smartphones and accessories
                at competitive prices. Shop now and take your mobile experience to the next level.
              </p>
              <Button variant="success" size="lg" className="text-light mt-3">
                <Link to="/tradein/trade-quote"  style={{ color: "white", textDecoration: "none" }}>Get Started</Link>  
              </Button>

              <Row className="my-5">
                <Col md={12}>
                  <Image src={`/images/trade.jpeg`} fluid />
                </Col>
              
              </Row>
            </div>

    </>
   
  );
};

export default TradeLanding;
