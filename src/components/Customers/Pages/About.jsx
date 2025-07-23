import React from "react";
import "../Layout/About.css"; // Optional for any additional custom CSS
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaRecycle, FaHandsHelping, FaMobileAlt } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import i18n hook
const About = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { t } = useTranslation("about"); // Load the 'navigation' namespace

  // Animation Variants
  const fadeVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const zoomVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 1 } },
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
                  {t("our_mission_title")}
                </h1>
                <p className="lead text-white mb-4">
                  {t("our_mission_description")}
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="my-5" fluid="xl">
        <Row className="text-center mb-4">
          <Col>
            <h2>{t("our_values_title")}</h2>
            <p>{t("our_values_description")}</p>
          </Col>
        </Row>

        <Row className="g-4">
          {[
            {
              icon: <FaHandsHelping size={40} className="text-success mb-3" />,
              title: t("values.expertise_title"),
              text: t("values.expertise_description"),
            },
            {
              icon: <FaMobileAlt size={40} className="text-success mb-3" />,
              title: t("values.quality_title"),
              text: t("values.quality_description"),
            },
            {
              icon: <FaRecycle size={40} className="text-success mb-3" />,
              title: t("values.sustainability_title"),
              text: t("values.sustainability_description"),
            },
          ].map((value, index) => (
            <Col md={4} key={index}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={zoomVariants}
                className="card shadow-sm p-3 h-100"
              >
                <div className="card-body">
                  {value.icon}
                  <h4 className="card-title">{value.title}</h4>
                  <p className="card-text">{value.text}</p>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="my-5 mt-5" fluid="xl">
        <Row>
          <Col md={6} className="mb-5">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeVariants}
            >
              <h3>{t("why_trade_in_title")}</h3>
              <p>{t("why_trade_in_description")}</p>
            </motion.div>
          </Col>

          <Col md={6} className="mb-5">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeVariants}
            >
              <h3>{t("how_it_works_title")}</h3>
              <ol>
                <li>{t("how_it_works_steps.step1")}</li>
                <li>{t("how_it_works_steps.step2")}</li>
                <li>{t("how_it_works_steps.step3")}</li>
              </ol>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <Container className="my-5 text-center " fluid="xl">
        <Row>
          <Col>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeVariants}
            >
              <h3>{t("join_us_title")}</h3>
              <p>{t("join_us_description")}</p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
