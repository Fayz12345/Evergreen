import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Layout/TradeinForm.css'; // Ensure custom CSS for additional styling
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { FaUpload, FaMemory, FaBatteryFull, FaPowerOff, FaUserAltSlash, FaLock } from 'react-icons/fa';


import { motion } from 'framer-motion';
const TradeinForm = () => {

    const [showPrepareModal, setShowPrepareModal] = useState(false); // Modal visibility state

    const navigate = useNavigate();

    const fadeVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

  

  
   
    const steps = [
        {
          icon: <FaUpload size={40} />,
          title: 'Back up:',
          description: "Back up contacts, emails, photos, and other personal data, as the phone won't be returned after trade-in.",
        },
        {
          icon: <FaMemory size={40} />,
          title: 'Remove memory cards and SIM cards:',
          description: 'If applicable, remove any memory cards.',
        },
        {
          icon: <FaBatteryFull size={40} />,
          title: 'Charge battery:',
          description: 'Ensure the battery is charged so that we can evaluate the phone’s trade-in value.',
        },
        {
          icon: <FaUserAltSlash size={40} />,
          title: 'Remove all accounts:',
          description: 'Turn off the "Find my iPhone" feature, or remove your Google account for Android phones.',
          link: 'Learn how',
        },
        {
          icon: <FaLock size={40} />,
          title: 'Disable Mobile Device Management lock:',
          description: 'For business/corporate phones: identify and disable the Mobile Device Management (MDM) lock on your phone.',
          link: 'Learn how',
        },
        {
          icon: <FaPowerOff size={40} />,
          title: 'Perform a factory reset:',
          description: 'Reset your phone to the original factory settings.',
          link: 'Learn how',
        },
      ];
      
      const handlePrepareModalShow = () => setShowPrepareModal(true);
      const handlePrepareModalClose = () => setShowPrepareModal(false);




    return (
      <>
          
<section className="slider text-white bg-dark py-5 mt-5">
                <Container>
                    <Row className="justify-content-center text-center mt-5">
                        <Col lg={9} md={12}>
                        <motion.div initial="hidden" animate="visible" variants={fadeVariants}>
                          <h1 className="animated fadeInUp mb-3 mt-5 text-white">
                            Upgrade to the Latest and Save Big!
                          </h1>
                        </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>
      <div className="container-xl my-5">
  <div className="text-center">
   
    <p className="lead">With our Trade-In Program, you can earn up to 
      <strong>$800 in credit</strong> 
      by trading in your old phone, tablet, or watch. It’s our way of helping you get the device you want – for less.
    </p>
      <img src={`/images/trade.jpeg`} alt="Trade-in Devices" className="img-fluid" />
  </div>

  <div className="text-center mt-5">
    <p className="lead">Ready to upgrade and save? <strong>Trade in your device today</strong> and make the most of our exclusive offer!</p>
    <Button variant="success" size="lg" className="me-2" onClick={() => navigate('/tradein/add')}>Check Price</Button>
                  
    <Button variant="light" className='text-success' size="lg"  onClick={handlePrepareModalShow}>Prepare Your Phone</Button>
               
  </div>
  <div className="row mt-5">
    <div className="col-md-6">
      <h3 className="fw-bold mb-3">How It Works:</h3>
        <p>
          <strong>Buy or Upgrade:</strong> When you purchase a new device or upgrade online, you’re eligible to trade in an old device.
        </p>
        <p>
          <strong>Send in Your Old Device:</strong> Simply follow the instructions to ship your old device for free.
        </p>
        <p>
          <strong>Get Credit on Your Account:</strong> Once approved, a credit will be applied directly to your bill – no waiting for checks or extra steps.
        </p>
    </div>


    <div className="col-md-6">
      <h3 className="fw-bold mb-3">Why Trade In?</h3>
        <p>
          <strong>More Savings:</strong> Reduce the cost of your new device by trading in old tech.
         
        </p>
        <br />
        <p>
          <strong>Eco-Friendly:</strong> Help us reduce e-waste by recycling your old device responsibly.
        </p>
        <p>
          <strong>Fast & Easy:</strong> The whole process is hassle-free and can be completed from the comfort of your home.
        </p>
    </div>
  </div>

</div>
 {/* Prepare Your Phone Modal */}
 <Modal show={showPrepareModal} onHide={handlePrepareModalClose}  size="xl"  dialogClassName="modal-dialog-centered">
                <Modal.Header closeButton>
                    <Modal.Title>Prepare Your Phone for Trade-In</Modal.Title>
                </Modal.Header>
                <Modal.Body  className="modal-body-scrollable">
                    <Row>
                        {steps.map((step, index) => (
                             <Col key={index} md={6} className="d-flex align-items-center justify-content-center mb-4">
                             <Card className="shadow-sm fixed-card-height">
                                 <Card.Body className="d-flex flex-column align-items-center text-center">
                                     <div className="text-success mb-3">{step.icon}</div>
                                     <Card.Title>{step.title}</Card.Title>
                                     <Card.Text>{step.description}</Card.Text>
                                 </Card.Body>
                             </Card>
                         </Col>
                        ))}
                    </Row>
                </Modal.Body>
            </Modal>

        
     

      </>
    );
  };
  
export default TradeinForm;
