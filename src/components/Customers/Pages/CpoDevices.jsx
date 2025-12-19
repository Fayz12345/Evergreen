import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaShieldAlt, FaBox, FaCertificate, FaTools, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";

const CpoDevices = () => {
  const { t } = useTranslation("cpo");

  const fadeVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const bundleIncludes = [
    { icon: <FaCertificate size={30} />, text: t("bundle.item1") },
    { icon: <FaShieldAlt size={30} />, text: t("bundle.item2") },
    { icon: <FaBox size={30} />, text: t("bundle.item3") },
    { icon: <FaBox size={30} />, text: t("bundle.item4") },
    { icon: <FaBox size={30} />, text: t("bundle.item5") },
    { icon: <FaBox size={30} />, text: t("bundle.item6") },
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
            <p className="lead text-center">{t("intro.paragraph2")}</p>
          </Col>
        </Row>

        {/* Bundle Includes */}
        <section className="bg-light py-5 px-4 rounded mb-5">
          <h3 className="text-center fw-bold mb-4">{t("bundle.title")}</h3>
          <Row className="g-4">
            {bundleIncludes.map((item, index) => (
              <Col key={index} md={6} lg={4}>
                <div className="d-flex align-items-center">
                  <div className="text-success me-3">{item.icon}</div>
                  <p className="mb-0">{item.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* Advance Exchange Section */}
        <Row className="mb-5 align-items-center">
          <Col md={6}>
            <FaShieldAlt size={60} className="text-success mb-3" />
            <h3 className="fw-bold mb-3">{t("advanceExchange.title")}</h3>
            <p>{t("advanceExchange.description")}</p>
            <a
              href="/downloads/Evergreen Wireless - Advance Exchnge Process.pdf"
              className="btn btn-success"
              download
            >
              <FaDownload className="me-2" />
              {t("advanceExchange.buttonText")}
            </a>
          </Col>
          <Col md={6} className="mt-4 mt-md-0">
            <img
              src="/images/warranty-support.jpg"
              alt="Advance Exchange"
              className="img-fluid rounded shadow-sm"
              onError={(e) => {e.target.style.display='none'}}
            />
          </Col>
        </Row>

        {/* Refurbishment Process Section */}
        <section className="bg-light py-5 px-4 rounded mb-5">
          <Row>
            <Col md={6}>
              <FaTools size={60} className="text-success mb-3" />
              <h3 className="fw-bold mb-3">{t("refurbishment.title")}</h3>
              <p>{t("refurbishment.description")}</p>
              <ul>
                <li>{t("refurbishment.step1")}</li>
                <li>{t("refurbishment.step2")}</li>
                <li>{t("refurbishment.step3")}</li>
                <li>{t("refurbishment.step4")}</li>
                <li>{t("refurbishment.step5")}</li>
                <li>{t("refurbishment.step6")}</li>
              </ul>
            </Col>
            <Col md={6} className="d-flex align-items-center justify-content-center">
              <a
                href="/downloads/Evergreen Wireless - Device Refurbishment Process.pdf"
                className="btn btn-success btn-lg"
                download
              >
                <FaDownload className="me-2" />
                {t("refurbishment.buttonText")}
              </a>
            </Col>
          </Row>
        </section>

        {/* Grading Standards Section */}
        <Row className="mb-5">
          <Col md={12}>
            <div className="text-center mb-4">
              <FaCertificate size={60} className="text-success mb-3" />
              <h3 className="fw-bold">{t("grading.title")}</h3>
            </div>
            <p className="text-center">{t("grading.description")}</p>
            <div className="text-center mt-4">
              <a
                href="/downloads/Evergreen Wireless - CPO Grading Standards.pdf"
                className="btn btn-success btn-lg"
                download
              >
                <FaDownload className="me-2" />
                {t("grading.buttonText")}
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CpoDevices;
