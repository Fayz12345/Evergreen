import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Modal, Button, Tabs, Tab } from "react-bootstrap";
import ConditionCard from "../Admin/Pages/ConditionCard"; // Adjust the import path as necessary
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // Import i18n hook
import "../Admin/Layout/trade.css";
const AddTrade = () => {
  const { t } = useTranslation("trade"); // Load the 'navigation' namespace

  const [device, setDevice] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null); // Store selected device details
  const [selectedModel, setSelectedModel] = useState(null); // Store selected device details

  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState("Working");
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("single");
  const [batchFile, setBatchFile] = useState(null); // State to store selected file
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const navigate = useNavigate();
  const userId = JSON.parse(sessionStorage.getItem("user"))?._id;

  console.log(userId);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/manufacturers`)
      .then((response) => setManufacturers(response.data))
      .catch((error) => console.error("Error fetching manufacturers:", error));
  }, []);

  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow && iframe.contentDocument) {
      const doc = iframe.contentDocument;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { margin: 0; }
            </style>
          </head>
          <body>
            <div class="buyback-widget"></div>
            <script src="https://widget.reusely.com/v3.js"></script>
            <script>
              window.onload = function() {
                new Buyback({
                  tenantId: "d83d36c95a12aa520cf608adc2fca2d02527879d4ff31c0f1457c295d6712519",
                  apiKey: "56KS2BgfJCaQKceYLXgtd5uHPZGF0rmPgM5JRBZrtQvAD3BdRv2avr3a9eLAiRTV",
                  disableFloatButton: false
                });
              }
            </script>
          </body>
        </html>
      `);
      doc.close();
    }
  }, []);

  const handleFileSelect = (event) => {
    setBatchFile(event.target.files[0]);
  };

  // Fetch models based on selected manufacturer
  const handleManufacturerChange = async (e) => {
    const manufacturerId = e.target.value;
    setManufacturer(manufacturerId);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/models?manufacturer=${manufacturerId}`
      );
      setModels(response.data);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  const handleDeviceSearch = async (e) => {
    const searchQuery = e.target.value;
    setDevice(searchQuery);
    if (searchQuery.length > 1) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/search?q=${searchQuery}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching devices:", error);
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
      navigate("/trade-history");
    } catch (error) {
      console.error("Error saving trade:", error);
    }
  };
  const handleModelSelectPrint = async (modelId) => {
    setModel(modelId);
    if (modelId) {
      try {
        // Fetch selected model details
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/models/${modelId}`
        );
        const selectedModel = response.data;

        // Set selected model and clear selected device
        setSelectedModel(selectedModel);
        setSelectedDevice(null);
        setDevice("");
      } catch (error) {
        console.error("Error fetching model details:", error);
      }
    }
  };
  const conditionsData = [
    {
      title: t("conditionDetails.working.title"),
      price: selectedModel
        ? selectedModel.priceWorking
        : selectedDevice
        ? selectedDevice.priceWorking
        : 0,
      items: [
        t("conditionDetails.working.description.step1"),
        t("conditionDetails.working.description.step2"),
        t("conditionDetails.working.description.step3"),
      ],
      badgeColor: "bg-success",
      badgeSymbol: "✔",
    },
    {
      title: t("conditionDetails.defective.title"),
      price: selectedModel
        ? selectedModel.priceDamaged
        : selectedDevice
        ? selectedDevice.priceDamaged
        : 0,
      items: [
        t("conditionDetails.defective.description.step1"),
        t("conditionDetails.defective.description.step2"),
        t("conditionDetails.defective.description.step3"),
        t("conditionDetails.defective.description.step4"),
      ],
      badgeColor: "bg-warning text-dark",
      badgeSymbol: "⚠",
    },
    {
      title: t("conditionDetails.recycle.title"),
      price: selectedModel
        ? selectedModel.priceRecycle
        : selectedDevice
        ? selectedDevice.priceRecycle
        : 0,
      items: [
        t("conditionDetails.recycle.description.step1"),
        t("conditionDetails.recycle.description.step2"),
        t("conditionDetails.recycle.description.step3"),
        t("conditionDetails.recycle.description.step4"),
      ],
      badgeColor: "bg-danger",
      badgeSymbol: "✖",
    },
  ];

  const handleBatchUploadFile = async () => {
    // Create form data to send the file and customer ID
    const formData = new FormData();
    formData.append("file", batchFile);
    formData.append("customerId", userId);
    formData.append("addedBy", userId);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/batch`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Batch file uploaded successfully.");
      // Optionally, show a success message or reset state
      navigate("/trade-history");
    } catch (error) {
      console.error("Error uploading batch file:", error);
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
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeVariants}
              >
                <h1 className="animated fadeInUp mb-3 mt-5 text-white">
                  {t("tradeInQuote")}
                </h1>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <div className="container-xl mb-5">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-5 mt-5"
        >
          {/* Single Trade Tab */}
          <Tab
            eventKey="single"
            title={t("singleTradeIn")}
            tabClassName="text-success"
          >
            <div className="my-5 d-flex justify-content-center">
              <iframe
                ref={iframeRef}
                title="Buyback Widget"
                width="800"
                height="500"
                style={{
                  border: "none",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              />
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card p-4">
                  <label>{t("searchDevice")}</label>

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder={t("searchDevice")}
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
                          {result.manufacturerDetails?.name} {result.name} -{" "}
                          {result.memoryDetails?.size}
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
                        <Button
                          variant="success"
                          className="mt-3"
                          onClick={openTradeModal}
                        >
                          Trade In
                        </Button>
                      ) : (
                        <p>
                          {t("loginMessageStart")}{" "}
                          <a href="/login" className="text-success">
                            {" "}
                            {t("loginLinkText")}
                          </a>{" "}
                          {t("loginMessageEnd")}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <h5 className="text-center">{t("or")}</h5>
              </div>
              <div className="col-md-12">
                <div className="card p-4">
                  {/* Select manufacturer and model as an alternative option */}
                  <div className="mb-3">
                    <label>{t("selectManufacturer")}</label>
                    <select
                      className="form-control"
                      value={manufacturer}
                      onChange={handleManufacturerChange}
                    >
                      <option value="">{t("selectManufacturer")}</option>
                      {manufacturers.map((man) => (
                        <option key={man._id} value={man._id}>
                          {man.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label>{t("selectModel")}</label>
                    <select
                      className="form-control"
                      value={model}
                      onChange={(e) => handleModelSelectPrint(e.target.value)}
                      disabled={!manufacturer}
                    >
                      <option value="">{t("selectModel")}</option>
                      {models.map((mod) => (
                        <option key={mod._id} value={mod._id}>
                          {mod.name} - {mod.memory.size}{" "}
                          {/* Access memory.size directly */}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Device Info and Trade-In Button */}
                  {selectedModel && (
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
                        <Button
                          variant="success"
                          className="mt-3"
                          onClick={openTradeModal}
                        >
                          Trade In
                        </Button>
                      ) : (
                        <p>{t("loginMessage")}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Tab>

          {/* Batch Upload Tab */}
          <Tab
            eventKey="batch"
            title={t("batchUpload")}
            tabClassName="text-success"
          >
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card p-4 text-center">
                  {isLoggedIn ? (
                    <>
                      <p>{t("batchUploadTitle")}</p>

                      <input
                        type="file"
                        accept=".csv"
                        className="form-control mt-3"
                        onChange={handleFileSelect} // Store file on selection
                      />
                      <p className="mt-3">{t("batchUploadDescription")}</p>
                      <Button
                        variant="light"
                        className="mt-3"
                        href={`${process.env.REACT_APP_API_URL}/sample-csv`}
                        download
                      >
                        {t("downloadSampleCsv")}
                      </Button>
                      <Button
                        variant="success"
                        className="mt-3"
                        onClick={handleBatchUploadFile}
                      >
                        {t("processBatchUpload")}
                      </Button>
                    </>
                  ) : (
                    <p>
                      {t("loginMessageStart")}{" "}
                      <a href="/login" className="text-success">
                        {" "}
                        {t("loginLinkText")}
                      </a>{" "}
                      {t("loginMessageEnd")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* Trade-In Modal */}
      <Modal show={showModal} size="xl" onHide={closeTradeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t("tradeInDevice")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent && (
            <>
              <h5>{modalContent.title}</h5>
            </>
          )}
          <form onSubmit={handleTradeSubmit}>
            <input type="hidden" value={model} name="modelId" />{" "}
            {/* Hidden field for model ID */}
            <input type="hidden" name="customerId" value={userId} />
            <div className="mb-3">
              <label>{t("quantity")}</label>
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
              <label>{t("condition")}</label>
              <select
                className="form-control"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                required
              >
                <option value="Working">
                  {t("conditionDetails.working.title")} - $
                  {selectedModel
                    ? selectedModel.priceWorking
                    : selectedDevice
                    ? selectedDevice.priceWorking
                    : 0}
                </option>
                <option value="Defective">
                  {t("conditionDetails.defective.title")} - $
                  {selectedModel
                    ? selectedModel.priceDamaged
                    : selectedDevice
                    ? selectedDevice.priceDamaged
                    : 0}
                </option>
                <option value="Recycle">
                  {t("conditionDetails.recycle.title")} - $0
                </option>
              </select>
            </div>
            <Button variant="success" type="submit">
              {t("submitTrade")}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTrade;
