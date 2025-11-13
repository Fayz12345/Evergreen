import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Layout/TradeinForm.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaHandshake } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const programOverviewLink = "/manuals/Device Leasing.pdf"; // Update with the real PDF path when available.

const Leasing = () => {
  const { t } = useTranslation("leasing");
  const navigate = useNavigate();

  const fadeVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      <section className="slider text-white bg-dark py-5 mt-5">
        <Container>
          <Row className="justify-content-center text-center mt-5">
            <Col lg={8} md={10}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeVariants}
              >
                <h1 className="animated fadeInUp mb-3 mt-5 text-white">
                  {t("title")}
                </h1>
                <p className="lead text-white-50">{t("intro")}</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-4 bg-light">
        <Container>
          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <h4 className="text-success mb-3">
                    Short-Term Device Leasing Program
                  </h4>
                  <p className="mb-0">{t("programHighlight")}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <h4 className="text-success mb-3">Predictable Pricing</h4>
                  <p className="mb-0">{t("pricing")}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-1">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <h3 className="text-success text-uppercase small mb-2">
                {t("downloadHeading")}
              </h3>
              <p className="lead">{t("downloadDescription")}</p>
            </Col>
            <Col lg={5} className="text-lg-end text-center">
              <div className="d-flex justify-content-lg-end justify-content-center gap-3 flex-column flex-sm-row">
                <Button
                  variant="success"
                  href={programOverviewLink}
                  download
                  className="border border-2 border-success"
                  style={{ borderWidth: "2px !important" }}
                >
                  {t("downloadCta")}
                </Button>
                <Button
                  variant="outline-success"
                  onClick={() => navigate("/contact")}
                >
                  {t("contactCta")}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-white">
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <Card className="border-0 shadow-sm h-100 text-center">
              <Card.Body>
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <FaHandshake className="text-success fs-1 me-3" />
                  <h4 className="mb-0">{t("partnerTitle")}</h4>
                </div>
                <p className="lead mb-3">{t("partnerIntro")}</p>
                <p className="mb-0 text-muted">{t("salesSupport")}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default Leasing;
