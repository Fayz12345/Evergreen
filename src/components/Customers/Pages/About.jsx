import React from 'react';
import '../Layout/About.css'; // Optional for any additional custom CSS
import { Container, Row, Col, Button } from 'react-bootstrap';
import {  FaRecycle, FaHandsHelping, FaMobileAlt } from 'react-icons/fa';
import { Zoom, Fade } from 'react-reveal'; // Import animation from react-reveal (Install via npm)

import { useNavigate } from 'react-router-dom';
const About = () => {
    const navigate = useNavigate(); // Initialize navigate
    return (
        <>
        
  

    <section className="slider text-white bg-dark py-5 mt-5">
                <Container>
                    <Row className="justify-content-center text-center mt-5">
                        <Col lg={9} md={12}>
                            <Fade top>
                                <h1 className="animated fadeInUp mb-3 mt-5 text-white">Our Mission</h1>
                                <p className="lead text-white mb-4">
                                    At Evergreen, we’re dedicated to making it easy for you to upgrade your tech while contributing 
                                    to a sustainable future. Our mission is to provide a simple, reliable, and rewarding mobile 
                                    trade-in experience that benefits both our customers and the planet.
                                </p>
                            </Fade>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Container className="my-5" fluid="xl">
                <Row className="text-center mb-4">
                    <Col>
                        <h2>Our Values</h2>
                        <p>Here’s why we stand out in the mobile trade-in industry.</p>
                    </Col>
                </Row>
                
                <Row className="g-4">
                    <Col md={4}>
                        <Zoom>
                            <div className="card shadow-sm p-3 h-100">
                                <div className="card-body">
                                    <FaHandsHelping size={40} className="text-success mb-3" />
                                    <h4 className="card-title">Expertise</h4>
                                    <p className="card-text">Apple, Samsung, and Google certified, you can trust our expert technicians with your device and privacy.</p>
                                </div>
                            </div>
                        </Zoom>
                    </Col>

                    <Col md={4}>
                        <Zoom>
                            <div className="card shadow-sm p-3 h-100">
                                <div className="card-body">
                                    <FaMobileAlt size={40} className="text-success mb-3" />
                                    <h4 className="card-title">Quality</h4>
                                    <p className="card-text">Our phones undergo a 64-point inspection to ensure they function like new. Plus, they’re backed by a 1-year warranty*.</p>
                                </div>
                            </div>
                        </Zoom>
                    </Col>

                    <Col md={4}>
                        <Zoom>
                            <div className="card shadow-sm p-3 h-100">
                                <div className="card-body">
                                    <FaRecycle size={40} className="text-success mb-3" />
                                    <h4 className="card-title">Sustainability</h4>
                                    <p className="card-text">Buying a certified pre-owned phone keeps devices out of landfills and reduces carbon emissions.</p>
                                </div>
                            </div>
                        </Zoom>
                    </Col>
                </Row>
            </Container>

            <Container className="my-5 mt-5" fluid="xl">
                <Row>
                    <Col md={6} className="mb-5">
                        <Fade left>
                            <h3>Why Trade In Your Mobile Device?</h3>
                            <p>
                                Upgrading to a new phone shouldn't mean that your old device goes to waste. By trading in your mobile with us, you’re helping to reduce electronic waste and support a circular economy.
                            </p>
                            {/* <Button variant="primary">Learn More</Button> */}
                        </Fade>
                    </Col>

                    <Col md={6} className="mb-5">
                        <Fade right>
                            <h3>How It Works</h3>
                            <ol>
                                <li><strong>Get an Instant Quote:</strong> Enter your device details to see its worth.</li>
                                <li><strong>Send Your Device:</strong> We provide a free shipping label for a hassle-free send-off.</li>
                                <li><strong>Get Paid:</strong> Once we receive and verify your device, you’ll get paid quickly.</li>
                            </ol>
                        </Fade>
                    </Col>
                </Row>
            </Container>

            <Container className="my-5 text-center " fluid="xl">
                <Row>
                    <Col>
                        <h3>Join Us in Reducing E-Waste</h3>
                        <p>Together, we can reduce our environmental footprint. Every trade-in makes a difference. Thank you for choosing Evergreen Wireless and helping us work towards a more sustainable future!</p>
                        <Button variant="" className="btn-success text-white" size="lg"  onClick={() => navigate('/login')}  >Get Started</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default About;
