import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Layout/TradeinForm.css'; // Ensure custom CSS for additional styling
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { FaUpload, FaMemory, FaBatteryFull, FaPowerOff, FaUserAltSlash, FaLock, FaFilePdf, FaDownload, FaShieldAlt, FaRecycle } from 'react-icons/fa';


import { useTranslation } from 'react-i18next'; // Import i18n hook
import { motion } from 'framer-motion';
const TradeinForm = () => {
  const { t } = useTranslation("trade"); // Load the 'navigation' namespace
  console.log("CPODevices loaded!", t("title")); // Add this

  const [showPrepareModal, setShowPrepareModal] = useState(false); // Modal visibility state

  const navigate = useNavigate();

  const fadeVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const steps = [
    {
      icon: <FaUpload size={40} />,
      title: t("tradeinForm.steps.step1.title"),
      description: t("tradeinForm.steps.step1.description"),
    },
    {
      icon: <FaMemory size={40} />,
      title: t("tradeinForm.steps.step2.title"),
      description: t("tradeinForm.steps.step2.description"),
    },
    {
      icon: <FaBatteryFull size={40} />,
      title: t("tradeinForm.steps.step3.title"),
      description: t("tradeinForm.steps.step3.description"),
    },
    {
      icon: <FaUserAltSlash size={40} />,
      title: t("tradeinForm.steps.step4.title"),
      description: t("tradeinForm.steps.step4.description"),
    },
    {
      icon: <FaLock size={40} />,
      title: t("tradeinForm.steps.step5.title"),
      description: t("tradeinForm.steps.step5.description"),
    },
    {
      icon: <FaPowerOff size={40} />,
      title: t("tradeinForm.steps.step6.title"),
      description: t("tradeinForm.steps.step6.description"),
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
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeVariants}
              >
                <h1 className="animated fadeInUp mb-3 mt-5 text-white">
                  {t("tradeinForm.sliderTitle")}
                </h1>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="container-xl my-5">
  <div className="text-center">
   
    <p className="lead">{t('tradeinForm.leadParagraph1')}
    </p>
      <img src={`/images/trade.jpeg`} alt="Trade-in Devices" className="img-fluid" />
  </div>

  <div className="text-center mt-5">
    <p className="lead">{t('tradeinForm.leadParagraph2')}</p>
    <Button variant="success" size="lg" className="me-2" onClick={() => navigate('/tradein/add')}>{t('tradeinForm.checkPriceButton')}</Button>
                  
    <Button variant="light" className='text-success' size="lg"  onClick={handlePrepareModalShow}>{t('tradeinForm.preparePhoneButton')}</Button>
               
  </div>
  <div className="row mt-5">
    <div className="col-md-6">
      <h3 className="fw-bold mb-3">{t('tradeinForm.howItWorks.title')}</h3>
        <p>
        <strong>{t('tradeinForm.howItWorks.steps.step1.title')} :</strong>{t('tradeinForm.howItWorks.steps.step1.description')}
        </p>
        <p>
        <strong>{t('tradeinForm.howItWorks.steps.step2.title')} :</strong>{t('tradeinForm.howItWorks.steps.step2.description')}
        </p>
        <p>
        <strong>{t('tradeinForm.howItWorks.steps.step3.title')} :</strong>{t('tradeinForm.howItWorks.steps.step3.description')}
        </p>
    </div>


    <div className="col-md-6">
      <h3 className="fw-bold mb-3">{t('tradeinForm.whyTradeIn.title')}</h3>

        <p>
        <strong>{t('tradeinForm.whyTradeIn.reasons.step1.title')} :</strong>{t('tradeinForm.whyTradeIn.reasons.step1.description')}

        </p>
        <br />
        <p>
        <strong>{t('tradeinForm.whyTradeIn.reasons.step2.title')} :</strong>{t('tradeinForm.whyTradeIn.reasons.step2.description')}
        </p>
        <p>
        <strong>{t('tradeinForm.whyTradeIn.reasons.step3.title')} :</strong>{t('tradeinForm.whyTradeIn.reasons.step3.description')}
        </p>
    </div>
  </div>

  {/* Buy-Back Program PDF Download */}
  <div className="text-center my-5 p-4 bg-light rounded">
    <FaFilePdf size={50} className="text-success mb-3" />
    <h4 className="fw-bold mb-3">{t('tradeinForm.buyBackDownload.title')}</h4>
    <p>{t('tradeinForm.buyBackDownload.description')}</p>
    <a
      href="/downloads/Evergreen Wireless - Device Buy Back Program.pdf"
      className="btn btn-success"
      download
    >
      <FaDownload className="me-2" />
      {t('tradeinForm.buyBackDownload.buttonText')}
    </a>
  </div>

  {/* Data Security Section */}
  <div className="my-5">
    <Row className="align-items-center">
      <Col md={6}>
        <FaShieldAlt size={60} className="text-success mb-3" />
        <h3 className="fw-bold mb-3">{t('tradeinForm.dataSecurity.title')}</h3>
        <p>{t('tradeinForm.dataSecurity.description')}</p>
        <a
          href="/downloads/Evergreen Wireless - Data Wipe Process.pdf"
          className="btn btn-outline-success"
          download
        >
          <FaDownload className="me-2" />
          {t('tradeinForm.dataSecurity.buttonText')}
        </a>
      </Col>
      <Col md={6} className="mt-4 mt-md-0">
        <img
          src="/images/data-security.jpg"
          alt="Data Security"
          className="img-fluid rounded shadow-sm"
          onError={(e) => {e.target.style.display='none'}}
        />
      </Col>
    </Row>
  </div>

  {/* E-Waste Reduction Section */}
  <div className="my-5 p-5 bg-light rounded">
    <Row>
      <Col md={12}>
        <div className="text-center mb-4">
          <FaRecycle size={60} className="text-success mb-3" />
          <h3 className="fw-bold">{t('tradeinForm.eWaste.title')}</h3>
          <p className="mt-3">{t('tradeinForm.eWaste.description')}</p>
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <h5 className="fw-bold mt-4 mb-3">{t('tradeinForm.eWaste.processing.title')}</h5>

        <h6 className="fw-bold mt-3">{t('tradeinForm.eWaste.processing.batteries.title')}</h6>
        <p>{t('tradeinForm.eWaste.processing.batteries.description')}</p>
        <ul>
          <li>{t('tradeinForm.eWaste.processing.batteries.point1')}</li>
          <li>{t('tradeinForm.eWaste.processing.batteries.point2')}</li>
        </ul>
        <p className="fst-italic">{t('tradeinForm.eWaste.processing.batteries.note')}</p>

        <h6 className="fw-bold mt-4">{t('tradeinForm.eWaste.processing.parts.title')}</h6>
        <p>{t('tradeinForm.eWaste.processing.parts.description')}</p>

        <div className="text-center mt-4">
          <a
            href="/downloads/Evergreen Wireless - Device Recycling.pdf"
            className="btn btn-success"
            download
          >
            <FaDownload className="me-2" />
            {t('tradeinForm.eWaste.buttonText')}
          </a>
        </div>
      </Col>
    </Row>
  </div>

</div>
 {/* Prepare Your Phone Modal */}
 <Modal show={showPrepareModal} onHide={handlePrepareModalClose}  size="xl"  dialogClassName="modal-dialog-centered">
                <Modal.Header closeButton>
                    <Modal.Title>{t('tradeinForm.modalTitle')}</Modal.Title>
                </Modal.Header>
                <Modal.Body  className="modal-body-scrollable mb-5">
                    {/* <Row>
                        {steps.map((step, index) => (
                             <Col key={index} md={6} className="d-flex align-items-center justify-content-center mb-4">
                             <Card className="shadow-sm  ">
                                 <Card.Body className="d-flex flex-column align-items-center text-center">
                                     <div className="text-success">{step.icon}</div>
                                     <Card.Title>{step.title}</Card.Title>
                                     <Card.Text>{step.description}</Card.Text>
                                 </Card.Body>
                             </Card>
                         </Col>
                        ))}
                    </Row> */}
          <Row className="gy-4">
            {" "}
            {/* Adds vertical spacing between rows */}
            {steps.map((step, index) => (
              <Col
                key={index}
                xs={12} /* Full width on small screens */
                sm={6} /* Two cards per row on small screens */
                lg={4} /* Three cards per row on large screens */
              >
                <Card className="shadow-sm text-center h-100 fixed-card-height">
                  {" "}
                  {/* Ensures consistent height */}
                  <Card.Body className="d-flex flex-column align-items-center justify-content-between">
                    <div className="text-success mb-3">{step.icon}</div>
                    <Card.Title className="fw-bold">{step.title}</Card.Title>
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
