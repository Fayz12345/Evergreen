import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Layout/TradeinForm.css'; // Ensure custom CSS for additional styling
import axios from 'axios';
import TradeInPage from '../../Trade/AddTrade';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { FaUpload, FaMemory, FaBatteryFull, FaPowerOff, FaUserAltSlash, FaLock } from 'react-icons/fa';


import { motion } from 'framer-motion';
const TradeinForm = () => {
    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [condition, setCondition] = useState('working');
    const [manufacturers, setManufacturers] = useState([]);
    const [models, setModels] = useState([]);
    const [showCheckPriceModal, setShowCheckPriceModal] = useState(false); // Check price modal

    const [priceWorking, setPriceWorking] = useState(0);
    const [priceDamaged, setPriceDamaged] = useState(0);
    const [priceRecycle, setPriceRecycle] = useState(0);
    const [showPrepareModal, setShowPrepareModal] = useState(false); // Modal visibility state

    const navigate = useNavigate();
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    const userId = JSON.parse(sessionStorage.getItem('user'))?._id;
    const fadeVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

  
    useEffect(() => {
      setModel('');

  setManufacturer('');
      axios.get(`${process.env.REACT_APP_API_URL}/manufacturers`)
        .then(response => setManufacturers(response.data))
        .catch(error => console.error('Error fetching manufacturers:', error));
    }, []);
  
    useEffect(() => {

      const selectedModel = models.find((m) => m._id === model);
      if (selectedModel) {
        setPriceWorking(selectedModel.priceWorking);
        setPriceDamaged(selectedModel.priceDamaged);
        setPriceRecycle(selectedModel.priceRecycle);
      }
    }, [model, models]); // Add 'models'
    
    
    // Handle manufacturer change and fetch related models
    const handleManufacturerChange = async (e) => {
      const manufacturerId = e.target.value;
      setManufacturer(manufacturerId);
  
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/models?manufacturer=${manufacturerId}`);
        setModels(response.data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/trade`, {
          modelId: model,
          customerId: userId,
          quantity,
          condition,
          priceWorking,
          priceDamaged,
          priceRecycle,
          addedBy: userId,
        });
        const newTradeId = response.data.trade._id;
        console.log("Newly added trade ID:", newTradeId);
    
        // You can save the ID in local storage or pass it to the next page as needed
        localStorage.setItem("newTradeId", newTradeId);
        navigate('/tradein/customer-info');
      } catch (error) {
        console.error('Error saving trade:', error);
      }
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



      // Adjust handleCheckPriceModalClose to reset model when the modal closes
      const handleCheckPriceModalClose = () => {
        setShowCheckPriceModal(false);

         setManufacturer(''); // Reset manufacturer to empty on modal close
        setModel(''); // Reset model to empty on modal close
      };

      // Ensure model is reset on modal opening if needed
      const handleCheckPriceModalShow = () => {
        navigate('/tradein/add');
        // setShowCheckPriceModal(true);

        //  setManufacturer(''); // Reset manufacturer to empty when opening modal
        // setModel(''); // Reset model to empty when opening modal
      };
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
    <Button variant="success" size="lg" className="me-2" onClick={handleCheckPriceModalShow}>Check Price</Button>
                  
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
                {/* <Modal.Footer>
                    <Button variant="success" onClick={handlePrepareModalClose}>Close</Button>
                </Modal.Footer> */}
            </Modal>


      <Modal 
        show={showCheckPriceModal} 
        onHide={handleCheckPriceModalClose} 
        size="xl"  
        dialogClassName="modal-dialog-centered high-z-index-modal" // Add custom class
      >
                <Modal.Header closeButton>
                    <Modal.Title>Check Price</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <TradeInPage handleSubmit={handleSubmit} />
                
                    <Row className="justify-content-center">
                        {/* <Col md={6}>
                            <div className="mb-3">
                                <label><h5>Select the Manufacturer</h5></label>
                                <select className="form-control" value={manufacturer} onChange={handleManufacturerChange}>
                                    <option value="">Select Manufacturer</option>
                                    {manufacturers.map((man) => (
                                        <option key={man._id} value={man._id}>{man.name}</option>
                                    ))}
                                </select>
                            </div>
                            </Col>
                            <Col md={6}>
                            <div className="mb-3">
                                <label><h5>Select the Model</h5></label>
                                <select className="form-control" value={model} onChange={(e) => setModel(e.target.value)} disabled={!manufacturer}>
                                    <option value="">Select Model</option>
                                    {models.map((mod) => (
                                        <option key={mod._id} value={mod._id}>{mod.name} - {mod.memory.size}</option>
                                    ))}
                                </select>
                            </div>
                        </Col> */}

                        {model && (
                            <Col md={12}>
                                {isLoggedIn ? (
                                  <>
                                  
                                    <form className="p-4 text-center" onSubmit={handleSubmit}>
                                        <h3 className="mb-3">{models.find((m) => m._id === model)?.name} - {models.find((m) => m._id === model)?.memory.size}</h3>
                                        <input type="hidden" name="addedBy" value={userId} />
                                        <div className="mb-3">
                                            <label>Quantity</label>
                                            <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" required />
                                        </div>
                                        <div className="mb-3">
                                            <label>Select Condition</label>
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" name="condition" value="Working" checked={condition === 'Working'} onChange={() => setCondition('Working')} />
                                                <label className="form-check-label">Working</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" name="condition" value="Defective" checked={condition === 'Defective'} onChange={() => setCondition('Defective')} />
                                                <label className="form-check-label">Defective</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" name="condition" value="Recycled" checked={condition === 'Recycled'} onChange={() => setCondition('Recycled')} />
                                                <label className="form-check-label">Recycled</label>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-success mt-3">Submit Trade</button>
                                    </form>
                                    </>
                                ) : (
                                  <>
                                    <div className="card p-4 text-center">
                                        {/* <h3 className="mb-3">{models.find((m) => m._id === model)?.name} - {models.find((m) => m._id === model)?.memory.size}</h3>   */}
                                          <div class="row mt-4">
                                            <div class="col-md-4">
                                              <div class="card flip-card h-100">
                                                <div class="flip-card-inner">
                                                  <div class="flip-card-front d-flex align-items-center justify-content-center">
                                                    <div>
                                                      <h4 class="text-success">Working</h4>
                                                    
                                                    </div>
                                                  </div>
                                                  <div class="flip-card-back d-flex align-items-center justify-content-center">
                                                    <p> ${models.find((m) => m._id === model)?.priceWorking}</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            {/* </div>
                                            <div class="row mt-4"> */}
                                            <div class="col-md-4">
                                              <div class="card flip-card h-100">
                                                <div class="flip-card-inner">
                                                  <div class="flip-card-front d-flex align-items-center justify-content-center">
                                                    <div>
                                                      <h4 class="text-success">Defective</h4>
                                                    
                                                    </div>
                                                  </div>
                                                  <div class="flip-card-back d-flex align-items-center justify-content-center">
                                                    <p>${models.find((m) => m._id === model)?.priceDamaged}</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            {/* </div>
                                            <div class="row mt-4"> */}
                                            <div class="col-md-4">
                                              <div class="card flip-card h-100">
                                                <div class="flip-card-inner">
                                                  <div class="flip-card-front d-flex align-items-center justify-content-center">
                                                    <div>
                                                      <h4 class="text-success">Recycled</h4>
                                                      
                                                    </div>
                                                  </div>
                                                  <div class="flip-card-back d-flex align-items-center justify-content-center">
                                                    <p>$0</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                    <br />
                                        <p>
                                           Please <a href="/login" className="text-success">log in</a> to proceed with the trade-in process.
                                        </p>

                                    </div>
                                    </>
                                )}
                                
                            </Col>
                        )}
                    </Row>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleCheckPriceModalClose}>Close</Button>
                </Modal.Footer> */}
            </Modal>
      
      {/* <hr className="separator" /> 
        <div className="container-xl mt-5 checkPrice">
          <div className="row justify-content-center">
            <div className={`col-md-6 ${!model ? 'd-flex justify-content-center align-items-center' : ''}`}>
              <div className="card select-device p-4" style={!model ? { width: '100%', maxWidth: '400px' } : {}}>
               
                <div className="mb-3">
                  <label><h5>Select the Manufacturer</h5></label>
                  <select
                    className="form-control"
                    value={manufacturer}
                    onChange={handleManufacturerChange} // Updated function call
                  >
                    <option value="">Select Manufacturer</option>
                    {manufacturers.map((man) => (
                      <option key={man._id} value={man._id}>
                        {man.name}
                      </option>
                    ))}
                  </select>
                </div>
  
                <div className="mb-3">
                  <label><h5>Select the Model</h5></label>
                  <select
                    className="form-control"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    disabled={!manufacturer}
                  >
                    <option value="">Select Model</option>
                    {models.map((mod) => (
                      <option key={mod._id} value={mod._id}>
                        {mod.name} - {mod.memory.size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
  
            {model && (
              <div className="col-md-6 Trade-form ">
                   {isLoggedIn ? (
                <form className=" p-4 text-center" onSubmit={handleSubmit}>
                  <h3 className="mb-3">
                    {models.find((m) => m._id === model)?.name} - {models.find((m) => m._id === model)?.memory.size}
                  </h3>
  
                  <input type="hidden" name="addedBy" value={userId} />
  
                  <div className="mb-3">
                    <label>Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      required
                    />
                  </div>
  
                  <div className="mb-3">
                    <label>Select Condition</label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="condition"
                        value="Working"
                        checked={condition === 'Working'}
                        onChange={() => setCondition('Working')}
                      />
                      <label className="form-check-label">Working</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="condition"
                        value="Defective"
                        checked={condition === 'Defective'}
                        onChange={() => setCondition('Defective')}
                      />
                      <label className="form-check-label">Defective</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="condition"
                        value="Recycled"
                        checked={condition === 'Recycled'}
                        onChange={() => setCondition('Recycled')}
                      />
                      <label className="form-check-label">Recycled</label>
                    </div>
                  </div>
  
                  <button type="submit" className="btn btn-success mt-3">
                    Submit Trade
                  </button>
                </form>
                   ):(
                    <div className="card p-4 text-center">
                <h5 className="mb-3">
                  {models.find((m) => m._id === model)?.name} - {models.find((m) => m._id === model)?.memory.size}
                
                </h5>
                <p>
                  <span>Working:</span> ${models.find((m) => m._id === model)?.priceWorking}
                <br />
                <span>Defective:</span> ${models.find((m) => m._id === model)?.priceDamaged}
                <br /><span>Recycled:</span> $0
                <br /><br />Please <a href="/login"  className="text-primary">log in</a>  to proceed with the trade-in process.</p>
              </div>
                   )}
              </div>
            )}
          </div>
        </div>  */}

        
     

      </>
    );
  };
  
export default TradeinForm;
