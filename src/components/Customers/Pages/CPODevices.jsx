import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Layout/TradeinForm.css";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const CPODevices = () => {
  const { t } = useTranslation("cpo");
  const navigate = useNavigate();

  const bundleItems = t("bundleItems", { returnObjects: true }) || [];
  const refurbSteps = t("refurbSteps", { returnObjects: true }) || [];

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
                  {t("title")}
                </h1>
                <p className="lead text-white-50">{t("heroDescription")}</p>
                <Button
                  variant="success"
                  className="mt-3"
                  onClick={() => navigate("/contact")}
                >
                  {t("heroButton")}
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <h3 className="text-success text-uppercase small mb-2">
                {t("valueHeading")}
              </h3>
              <p className="lead">{t("valueLead")}</p>
              <p className="text-muted">{t("valueFooter")}</p>
            </Col>
            <Col lg={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <h5 className="fw-semibold mb-3">{t("bundleTitle")}</h5>
                  <ListGroup variant="flush">
                    {bundleItems.map((item, idx) => (
                      <ListGroup.Item key={idx} className="border-0 ps-0">
                        - {item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row className="g-4">
            <Col md={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <h4 className="mb-3 text-success">{t("warrantyHeading")}</h4>
                  <p className="mb-4">{t("warrantyDescription")}</p>
                  <Button
                    variant="outline-success"
                    href={t("warrantyLink")}
                    download
                  >
                    {t("warrantyCta")}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <h4 className="mb-3 text-success">{t("refurbHeading")}</h4>
                  <p>{t("refurbDescription")}</p>
                  <ol className="ps-3">
                    {refurbSteps.map((step, idx) => (
                      <li key={idx} className="mb-2">
                        {step}
                      </li>
                    ))}
                  </ol>
                  <Button
                    variant="outline-success"
                    href={t("refurbLink")}
                    download
                  >
                    {t("refurbCta")}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="border-0 shadow-sm text-center">
                <Card.Body>
                  <h4 className="mb-3 text-success">{t("gradingHeading")}</h4>
                  <p className="mb-4">{t("gradingDescription")}</p>
                  <Button variant="success" href={t("gradingLink")} download>
                    {t("gradingCta")}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CPODevices;
