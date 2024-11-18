import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col} from 'react-bootstrap';
import { Fade } from 'react-reveal'; // Import animation from react-reveal (Install via npm)
const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

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
                            <Fade top>
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
                            </Fade>
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
