import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Layout/TradeinForm.css"; // Ensure custom CSS for additional styling
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import i18n hook
import { motion } from "framer-motion";

const NewDevices = () => {
  const { t } = useTranslation("newdev"); // Load the 'newdev' namespace
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
            <Col lg={9} md={12}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeVariants}
              >
                <h1 className="animated fadeInUp mb-3 mt-5 text-white">
                  {t("title")}
                </h1>

                <p className="lead text-white mb-4">{t("leadParagraph1")}</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <div className="container-xl my-5">
        <Row className="align-items-center g-5">
          <Col lg={6} className="text-lg-end text-center">
            <img
              src={`/images/trade.jpeg`}
              alt="Premium device assortment"
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col lg={6}>
            <p className="lead">{t("leadParagraph2")}</p>
            <p className="mb-0">{t("leadparagraph3")}</p>
          </Col>
        </Row>
      </div>

      <section className="py-5 bg-light">
        <Container>
          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <h4 className="text-success">{t("para4Title")}</h4>
                  <p className="mb-0">{t("leadparagraph4")}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <h4 className="text-success">{t("para5Title")}</h4>
                  <p className="mb-0">{t("leadparagraph5")}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="text-center">
              <p className="lead mb-4">{t("leadpaaragraph6")}</p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Button variant="success" onClick={() => navigate("/contact")}>
                  Contact Sales
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default NewDevices;
