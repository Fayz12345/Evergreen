import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Modal, Button, Tabs, Tab } from 'react-bootstrap';
import ConditionCard from '../Admin/Pages/ConditionCard'; // Adjust the import path as necessary
import { motion } from 'framer-motion';
import '../Admin/Layout/trade.css';
const AddTrade = () => {
  const [device, setDevice] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null); // Store selected device details
  const [selectedModel, setSelectedModel] = useState(null); // Store selected device details

  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState('Working');
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('single');
  const [batchFile, setBatchFile] = useState(null); // State to store selected file
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  const navigate = useNavigate();
  const userId = JSON.parse(sessionStorage.getItem('user'))?._id;
  console.log(userId);
  useEffect(() => {
   

    axios.get(`${process.env.REACT_APP_API_URL}/manufacturers`)
      .then(response => setManufacturers(response.data))
      .catch(error => console.error('Error fetching manufacturers:', error));
  }, []);

  const handleFileSelect = (event) => {
    setBatchFile(event.target.files[0]);
  };

  // Fetch models based on selected manufacturer
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

  const handleDeviceSearch = async (e) => {
    const searchQuery = e.target.value;
    setDevice(searchQuery);
    if (searchQuery.length > 1 ) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/search?q=${searchQuery}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching devices:', error);
      }
    } else {
      // console.error("REACT_APP_API_URL is not defined.");
      setSearchResults([]);
    }
  };
  

  // Display device details upon selection
  const handleDeviceSelect = (selected) => {
     // Construct the full text to show in the input field
  const fullText = `${selected.manufacturerDetails?.name} ${selected.name} - ${selected.memoryDetails?.size}`;
  setModel(selected._id);
  // Update device input field with the full selected text
  setDevice(fullText);
    setSelectedDevice(selected);
    // setDevice(selected.modelName);
    
    setSearchResults([]);
    // Clear selected model when a device is selected
  setSelectedModel(null);
  };

  const [modalContent, setModalContent] = useState(null); // State to hold modal content



const openTradeModal = () => {
  // Determine which content to display based on selectedModel or selectedDevice
  const content = selectedModel
    ? {
        title: `${selectedModel.manufacturer.name} - ${selectedModel.name} - ${selectedModel.memory.size}`,
        conditions: conditionsData,
      }
    : selectedDevice
    ? {
        title: `${selectedDevice.manufacturerDetails.name} - ${selectedDevice.name} - ${selectedDevice.memoryDetails.size}`,
        conditions: conditionsData,
      }
    : null;

  setModalContent(content);
  setShowModal(true);
};

  // Close trade-in modal
  const closeTradeModal = () => setShowModal(false);

  // Submit trade-in details
  const handleTradeSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/trade`, {
        modelId: model,
        customerId: userId,
        quantity,
        condition,
        price: selectedDevice ? selectedDevice[`price${condition}`] : 0,
        addedBy: userId,
      });
      closeTradeModal();
      navigate('/trade-history');
    } catch (error) {
      console.error('Error saving trade:', error);
    }
  };
  const handleModelSelectPrint = async (modelId) => {
    setModel(modelId);
    if (modelId) {
      try {
        // Fetch selected model details
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/models/${modelId}`);
        const selectedModel = response.data;
  
        
      // Set selected model and clear selected device
      setSelectedModel(selectedModel);
      setSelectedDevice(null);
      setDevice('');
  
       
      } catch (error) {
        console.error('Error fetching model details:', error);
      }
    }
  };
  const conditionsData = [
    {
      title: "Working",
      price: selectedModel ? selectedModel.priceWorking : selectedDevice ? selectedDevice.priceWorking : 0,
      items: [
        "The screen is intact, with no major cracks.",
        "Buttons, speakers, and ports work perfectly.",
        "Battery holds a charge, and the device responds smoothly to input.",
      ],
      badgeColor: "bg-success",
      badgeSymbol: "✔",
    },
    {
      title: "Defective",
      price: selectedModel ? selectedModel.priceDamaged : selectedDevice ? selectedDevice.priceDamaged : 0,
      items: [
        "Cracked or heavily scratched screen.",
        "Non-functional buttons or unresponsive touch screen.",
        "Charging issues, poor battery life, or intermittent power problems.",
        "Damaged or broken speakers, microphones, or cameras.",
      ],
      badgeColor: "bg-warning text-dark",
      badgeSymbol: "⚠",
    },
    {
      title: "Recycle",
      price: selectedModel ? selectedModel.priceRecycle : selectedDevice ? selectedDevice.priceRecycle : 0,
      items: [
        "The device does not power on at all.",
        "Severe physical damage, such as bent or broken body.",
        "Water damage or other irreparable hardware issues.",
        "Missing or damaged essential components like the battery or motherboard.",
      ],
      badgeColor: "bg-danger",
      badgeSymbol: "✖",
    },
  ];

  const handleBatchUploadFile = async () => {
 
    // Create form data to send the file and customer ID
    const formData = new FormData();
    formData.append('file', batchFile);
    formData.append('customerId', userId);
    formData.append('addedBy', userId);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/batch`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Batch file uploaded successfully.");
      // Optionally, show a success message or reset state
      navigate('/trade-history');
    } catch (error) {
      console.error('Error uploading batch file:', error);
    }
  };
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
                            Get a Trade In Quote with Evergreen Wireless
                          </h1>
                        </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>
     <div className="container-xl mb-5">

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-5 mt-5">
          {/* Single Trade Tab */}
          <Tab eventKey="single" title="Single Trade-In"  tabClassName="text-success" >
          <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card p-4">
              <label>Search Device</label>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search for your device"
                value={device}
                onChange={handleDeviceSearch}
              />

              {/* Display search results */}
              {searchResults.length > 0 && (
                <ul className="list-group">
                  {searchResults.map((result) => (
                     <li
                     key={result._id}
                     className="list-group-item"
                     onClick={() => handleDeviceSelect(result)}
                   >
                     {/* Display combined search result */}
                     {result.manufacturerDetails?.name} {result.name} - {result.memoryDetails?.size}
                   </li>
                  ))}
                </ul>
              )}

              


              {/* Device Info and Trade-In Button */}
              {selectedDevice && (
                  
                    
                        <div className="mt-3 p-3 border rounded">
                        <h5>
                        {selectedModel
                            ? `${selectedModel.manufacturer.name} - ${selectedModel.name} - ${selectedModel.memory.size}`
                            : `${selectedDevice.manufacturerDetails.name} - ${selectedDevice.name} - ${selectedDevice.memoryDetails.size}`}
                        </h5>
                        <div className="row mb-3 text-primary">
                        {conditionsData.map((condition, index) => (
                            <ConditionCard
                            key={index}
                            title={condition.title}
                            price={condition.price}
                            items={condition.items}
                            badgeColor={condition.badgeColor}
                            badgeSymbol={condition.badgeSymbol}
                            />
                        ))}
                        </div>
                       {isLoggedIn ? (
                        <Button variant="success" className="mt-3"  onClick={openTradeModal}>
                            Trade In
                        </Button>
                       
                   ) : (

                        <p>
                            Please <a href="/login" className="text-success">log in</a> to proceed with the trade-in process.
                        </p>
              
                   )}
                   </div>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <h5  className="text-center">OR</h5>
            </div>
          <div className="col-md-12">
            <div className="card p-4">
             

              {/* Select manufacturer and model as an alternative option */}
              <div className="mb-3">
                <label>Select Manufacturer</label>
                <select className="form-control" value={manufacturer} onChange={handleManufacturerChange}>
                  <option value="">Select Manufacturer</option>
                  {manufacturers.map((man) => (
                    <option key={man._id} value={man._id}>
                      {man.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label>Select Model</label>
                <select
                  className="form-control"
                  value={model}
                  onChange={(e) => handleModelSelectPrint(e.target.value)} 
                  disabled={!manufacturer}
                >
                  <option value="">Select Model</option>
                  {models.map((mod) => (
                    <option key={mod._id} value={mod._id}>
                      {mod.name} - {mod.memory.size} {/* Access memory.size directly */}
                    </option>
                  ))}
                </select>
              </div>


              {/* Device Info and Trade-In Button */}
              {selectedModel  && (
                <div className="mt-3 p-3 border rounded">
                    <h5>
                      {selectedModel
                        ? `${selectedModel.manufacturer.name} - ${selectedModel.name} - ${selectedModel.memory.size}`
                        : `${selectedDevice.manufacturerDetails.name} - ${selectedDevice.name} - ${selectedDevice.memoryDetails.size}`}
                    </h5>
                    <div className="row mb-3 text-primary">
                      {conditionsData.map((condition, index) => (
                        <ConditionCard
                          key={index}
                          title={condition.title}
                          price={condition.price}
                          items={condition.items}
                          badgeColor={condition.badgeColor}
                          badgeSymbol={condition.badgeSymbol}
                        />
                      ))}
                    </div>

                                 {isLoggedIn ? ( 
                  <Button variant="success"  className="mt-3"  onClick={openTradeModal}>
                    Trade In
                  </Button>
                   ) : (

                    <p>
                        Please <a href="/login" className="text-success">log in</a> to proceed with the trade-in process.
                    </p>
          
               )}
                </div>
              )}
            </div>
          </div>
        </div>
          </Tab>

          {/* Batch Upload Tab */}
          <Tab eventKey="batch" title="Batch Upload"   tabClassName="text-success" >
            <div className="row justify-content-center">
              <div className="col-md-12">
              
                <div className="card p-4 text-center">
                {isLoggedIn ? (
                  <>
                    <p>Batch Upload for Trade-In</p>
              
                      <input
                        type="file"
                        accept=".csv"
                        className="form-control mt-3"
                        onChange={handleFileSelect} // Store file on selection
                      />
                      <p className="mt-3">Upload a CSV file to process multiple trade-ins at once.</p>
                      <Button variant="light" className="mt-3" href={`${process.env.REACT_APP_API_URL}/sample-csv`} download>
                        Download Sample CSV
                      </Button>
                      <Button variant="success" className="mt-3"  onClick={handleBatchUploadFile}>
                        Process Batch Upload
                      </Button>
                  </>
                   ):(

                    <p>
                      Please <a href="/login" className="text-success">log in</a> to proceed with the trade-in process.
                   </p>
      
                   )}
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
        
      
        
      </div>

      {/* Trade-In Modal */}
<Modal show={showModal}  size="xl" onHide={closeTradeModal}>
  <Modal.Header closeButton>
    <Modal.Title>Trade In Device</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {modalContent && (
      <>
        <h5>{modalContent.title}</h5>
      
      </>
    )}
    <form onSubmit={handleTradeSubmit}>
    <input type="hidden" value={model} name="modelId" /> {/* Hidden field for model ID */}
    

        <input type="hidden" name="customerId" value={userId} />
   
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
        <label>Condition</label>
        <select
          className="form-control"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          required
        >
          <option value="Working">Working - ${selectedModel
      ? selectedModel.priceWorking
      : selectedDevice
      ? selectedDevice.priceWorking
      : 0}</option>
          <option value="Defective">Defective - ${selectedModel
      ? selectedModel.priceDamaged
      : selectedDevice
      ? selectedDevice.priceDamaged
      : 0}</option>
          <option value="Recycle">Recycle - $0</option>
        </select>
      </div>
      <Button variant="success" type="submit">
        Submit Trade
      </Button>
    </form>
  </Modal.Body>
</Modal>

    </>
  );
};

export default AddTrade;
