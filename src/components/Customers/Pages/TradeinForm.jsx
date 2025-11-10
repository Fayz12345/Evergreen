import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Layout/TradeinForm.css"; // Ensure custom CSS for additional styling
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import {
  FaUpload,
  FaMemory,
  FaBatteryFull,
  FaPowerOff,
  FaUserAltSlash,
  FaLock,
} from "react-icons/fa";

import { useTranslation } from "react-i18next"; // Import i18n hook
import { motion } from "framer-motion";
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
          <p className="lead">{t("tradeinForm.leadParagraph1")}</p>
          <img
            src={`/images/trade.jpeg`}
            alt="Trade-in Devices"
            className="img-fluid"
          />
        </div>

        <div className="text-center mt-5">
          <p className="lead">{t("tradeinForm.leadParagraph2")}</p>
          <Button
            variant="success"
            size="lg"
            className="me-2"
            onClick={() => navigate("/tradein/add")}
          >
            {t("tradeinForm.checkPriceButton")}
          </Button>

          <Button
            variant="light"
            className="text-success"
            size="lg"
            onClick={handlePrepareModalShow}
          >
            {t("tradeinForm.preparePhoneButton")}
          </Button>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h3 className="fw-bold mb-3">
              {t("tradeinForm.howItWorks.title")}
            </h3>
            <p>
              <strong>{t("tradeinForm.howItWorks.steps.step1.title")} :</strong>
              {t("tradeinForm.howItWorks.steps.step1.description")}
            </p>
            <p>
              <strong>{t("tradeinForm.howItWorks.steps.step2.title")} :</strong>
              {t("tradeinForm.howItWorks.steps.step2.description")}
            </p>
            <p>
              <strong>{t("tradeinForm.howItWorks.steps.step3.title")} :</strong>
              {t("tradeinForm.howItWorks.steps.step3.description")}
            </p>
          </div>

          <div className="col-md-6">
            <h3 className="fw-bold mb-3">
              {t("tradeinForm.whyTradeIn.title")}
            </h3>

            <p>
              <strong>
                {t("tradeinForm.whyTradeIn.reasons.step1.title")} :
              </strong>
              {t("tradeinForm.whyTradeIn.reasons.step1.description")}
            </p>
            <br />
            <p>
              <strong>
                {t("tradeinForm.whyTradeIn.reasons.step2.title")} :
              </strong>
              {t("tradeinForm.whyTradeIn.reasons.step2.description")}
            </p>
            <p>
              <strong>
                {t("tradeinForm.whyTradeIn.reasons.step3.title")} :
              </strong>
              {t("tradeinForm.whyTradeIn.reasons.step3.description")}
            </p>
          </div>
        </div>
      </div>
      {/* Prepare Your Phone Modal */}
      <Modal
        show={showPrepareModal}
        onHide={handlePrepareModalClose}
        size="xl"
        dialogClassName="modal-dialog-centered"
        style={{ zIndex: 9999 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("tradeinForm.modalTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-scrollable mb-5">
          {/* Download Buttons Section */}
          <div className="text-center mb-4">
            <h5 className="mb-3">Download Manual</h5>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Button
                variant="success"
                href="/manuals/phone-preparation-manual-en.pdf"
                download
                className="border border-2 border-success"
                style={{ borderWidth: "2px !important" }}
              >
                Download Manual (EN)
              </Button>
              <Button
                variant="success"
                href="/manuals/phone-preparation-manual-fr.pdf"
                download
                className="border border-2 border-success"
                style={{ borderWidth: "2px !important" }}
              >
                Download Manual (FR)
              </Button>
            </div>
            <hr className="my-4" />
          </div>
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
