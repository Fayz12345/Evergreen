import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col} from 'react-bootstrap';
import { motion } from 'framer-motion';
const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const fadeVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
      };

    useEffect(() => {
        // Fetch user data from sessionStorage
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (!userData) {
            navigate('/login'); // Redirect to login if user data is missing
        } else {
            setUser(userData);
        }
    }, [navigate]);


    return (
        <>
        
        <section className="slider text-white bg-dark py-5 mt-5">
                <Container>
                    <Row className="justify-content-center text-center mt-5">
                        <Col lg={9} md={12}>
                        <motion.div initial="hidden" animate="visible" variants={fadeVariants}>
                            {user ? (
                            <>
                                <h1 className="animated fadeInUp mb-3 mt-5 text-white">
                                Welcome, {user.fullName || user.username || 'User'}!
                                </h1>
                          
                      <Row className="justify-content-center text-white text-center mt-5">
                         <Col lg={9} md={12}>
                        <p className="text-white"><strong>Email:</strong> {user.email}</p>
                        <p className="text-white"><strong>Username:</strong> {user.username}</p>
                        {/* <p><strong>Phone:</strong> {user.phone}</p> */}
                        
                        <div className="mt-4">
                            <button 
                                className="btn btn-success me-2" 
                                onClick={() => navigate('/edit-profile')}
                            >
                                Edit Profile
                            </button>
                            {/* <button 
                                className="btn btn-secondary" 
                                onClick={handleLogout}
                            >
                                Logout
                            </button> */}
                        </div>
                        </Col>
                    </Row>
                    </>
                ) : (
                    <p>Loading user information...</p>
                )}
                             </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Container fluid="xl">
               
            </Container>
        </>
        
    );
};

export default Profile;
