import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Layout/TradeinForm.css";
import "./CPODevices.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const CPODevices = () => {
  const { t } = useTranslation("cpo");
  const navigate = useNavigate();

  const bundleItems = t("bundleItems", { returnObjects: true }) || [];
  const refurbSteps = t("refurbSteps", { returnObjects: true }) || [];

  const fadeVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
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
                <p className="lead text-white-50 mb-4">
                  {t("heroDescription")}
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="cpo-section cpo-section--light">
        <Container>
          <Row className="gy-4 align-items-stretch">
            <Col lg={5}>
              <motion.div
                className="cpo-value-card h-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeVariants}
              >
                <span className="cpo-eyebrow">{t("valueHeading")}</span>
                <h3 className="mb-3">{t("valueLead")}</h3>
                <p className="mb-0 text-muted">{t("valueFooter")}</p>
              </motion.div>
            </Col>
            <Col lg={7}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeVariants}
              >
                <div className="cpo-panel h-100">
                  <h5 className="mb-3">{t("bundleTitle")}</h5>
                  <div className="cpo-pill-list">
                    {bundleItems.map((item, idx) => (
                      <span key={idx} className="cpo-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="cpo-section">
        <Container>
          <Row className="gy-4">
            <Col lg={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeVariants}
              >
                <div className="cpo-panel h-100 text-center">
                  <span className="cpo-eyebrow text-success">
                    {t("warrantyHeading")}
                  </span>
                  <p className="mb-4">{t("warrantyDescription")}</p>
                  <Button variant="success" href={t("warrantyLink")} download>
                    {t("warrantyCta")}
                  </Button>
                </div>
              </motion.div>
              <br></br>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeVariants}
              >
                <div className="cpo-panel h-100 text-center">
                  <span className="cpo-eyebrow text-success">
                    {t("gradingHeading")}
                  </span>
                  <p className="mb-4">{t("gradingDescription")}</p>
                  <Button variant="success" href={t("gradingLink")} download>
                    {t("gradingCta")}
                  </Button>
                </div>
              </motion.div>
            </Col>

            <Col lg={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeVariants}
              >
                <div className="cpo-panel h-100">
                  <span className="cpo-eyebrow text-success">
                    {t("refurbHeading")}
                  </span>
                  <p className="mb-4">{t("refurbDescription")}</p>
                  <ol className="cpo-stepper list-unstyled mb-4">
                    {refurbSteps.map((step, idx) => (
                      <li key={idx}>
                        <span className="cpo-step-index">{idx + 1}</span>
                        <p className="mb-0">{step}</p>
                      </li>
                    ))}
                  </ol>
                  <Button variant="success" href={t("refurbLink")} download>
                    {t("refurbCta")}
                  </Button>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CPODevices;
