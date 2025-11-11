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

const CPODevices = () => {
  const { t } = useTranslation("cpo"); // Load the 'cpo' namespace
  console.log("CPODevices loaded!", t("title")); // Add this
  const [showPrepareModal, setShowPrepareModal] = useState(false); // Modal visibility state

  const navigate = useNavigate();

  const fadeVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
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
                {t("title")}
              </h1>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CPODevices;
