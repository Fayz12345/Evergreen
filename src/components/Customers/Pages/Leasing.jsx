import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaCalendarAlt, FaDollarSign, FaChartLine, FaDownload, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";

const Leasing = () => {
  const { t } = useTranslation("leasing");

  const fadeVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const benefits = [
    { icon: <FaDollarSign size={40} />, titleKey: "benefits.fixedCosts.title", descKey: "benefits.fixedCosts.description" },
    { icon: <FaCalendarAlt size={40} />, titleKey: "benefits.flexibility.title", descKey: "benefits.flexibility.description" },
    { icon: <FaChartLine size={40} />, titleKey: "benefits.noUpfront.title", descKey: "benefits.noUpfront.description" },
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
            <p className="lead text-center">{t("intro.paragraph1")}</p>
            <p className="lead text-center">{t("intro.paragraph2")}</p>
          </Col>
        </Row>

        {/* Benefits Section */}
        <section className="bg-light py-5 px-4 rounded mb-5">
          <h3 className="text-center fw-bold mb-4">{t("benefits.title")}</h3>
          <Row className="g-4">
            {benefits.map((benefit, index) => (
              <Col key={index} md={4}>
                <Card className="h-100 shadow-sm border-0 text-center p-3">
                  <Card.Body>
                    <div className="text-success mb-3">{benefit.icon}</div>
                    <Card.Title className="fw-bold">{t(benefit.titleKey)}</Card.Title>
                    <Card.Text>{t(benefit.descKey)}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Leasing Program Download */}
        <Row className="mb-5">
          <Col md={12}>
            <div className="text-center p-5 bg-light rounded">
              <FaCalendarAlt size={60} className="text-success mb-4" />
              <h3 className="fw-bold mb-3">{t("download.title")}</h3>
              <p className="mb-4">{t("download.description")}</p>
              <a
                href="/downloads/Evergreen Wireless - Device Leasing.pdf"
                className="btn btn-success btn-lg"
                download
              >
                <FaDownload className="me-2" />
                {t("download.buttonText")}
              </a>
            </div>
          </Col>
        </Row>

        {/* Financing Partnership Section */}
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="text-center">
              <FaHandshake size={60} className="text-success mb-3" />
              <h3 className="fw-bold mb-3">{t("financing.title")}</h3>
              <p>{t("financing.description")}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Leasing;
