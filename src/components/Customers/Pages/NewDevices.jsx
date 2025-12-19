import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaMobileAlt, FaTabletAlt, FaWifi, FaHome, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const NewDevices = () => {
  const { t } = useTranslation("newdevices");

  const fadeVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const deviceTypes = [
    { icon: <FaMobileAlt size={40} />, text: t("deviceTypes.phones") },
    { icon: <FaTabletAlt size={40} />, text: t("deviceTypes.tablets") },
    { icon: <FaWifi size={40} />, text: t("deviceTypes.broadband") },
    { icon: <FaHome size={40} />, text: t("deviceTypes.iot") },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="slider text-white bg-dark py-5 mt-5">
        <Container>
          <Row className="justify-content-center text-center mt-5">
            <Col lg={9} md={12}>
              <motion.div initial="hidden" animate="visible" variants={fadeVariants}>
                <h1 className="animated fadeInUp mb-3 mt-5 text-white">
                  {t("hero.title")}
                </h1>
                <p className="lead text-white mb-4">
                  {t("hero.subtitle")}
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="my-5">
        {/* Intro Section */}
        <Row className="justify-content-center mb-5">
          <Col lg={10}>
            <p className="lead text-center">{t("intro.paragraph")}</p>
          </Col>
        </Row>

        {/* Device Types */}
        <section className="bg-light py-5 px-4 rounded mb-5">
          <h3 className="text-center fw-bold mb-4">{t("deviceTypes.title")}</h3>
          <Row className="g-4">
            {deviceTypes.map((device, index) => (
              <Col key={index} md={6} lg={3}>
                <div className="text-center">
                  <div className="text-success mb-3">{device.icon}</div>
                  <p className="fw-bold">{device.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* Prepaid Bundles Section */}
        <Row className="mb-5">
          <Col md={12}>
            <div className="text-center mb-4">
              <FaShoppingCart size={60} className="text-success mb-3" />
              <h3 className="fw-bold">{t("bundles.title")}</h3>
              <p>{t("bundles.description")}</p>
            </div>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          <Col md={6}>
            <Card className="h-100 shadow-sm border-success">
              <Card.Body className="text-center p-4">
                <h4 className="fw-bold text-success mb-3">{t("bundles.instantConnect.title")}</h4>
                <p>{t("bundles.instantConnect.description")}</p>
                <Button variant="success" className="mt-3">
                  {t("bundles.learnMore")}
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm border-success">
              <Card.Body className="text-center p-4">
                <h4 className="fw-bold text-success mb-3">{t("bundles.easyConnect.title")}</h4>
                <p>{t("bundles.easyConnect.description")}</p>
                <Button variant="success" className="mt-3">
                  {t("bundles.learnMore")}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* CTA Section */}
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <div className="bg-light p-5 rounded">
              <h4 className="fw-bold mb-3">{t("cta.title")}</h4>
              <p className="mb-4">{t("cta.description")}</p>
              <Button variant="success" size="lg" href="/contact">
                {t("cta.buttonText")}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewDevices;
