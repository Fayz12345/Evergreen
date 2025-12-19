import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaRecycle,
  FaMobileAlt,
  FaBox,
  FaCog,
  FaSimCard,
  FaCalendarAlt,
  FaShieldAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Layout/Home2.css";

const Home = () => {
  const { t } = useTranslation("home");

  const services = [
    {
      icon: <FaRecycle size={40} />,
      titleKey: "buyback_title",
      descKey: "buyback_desc",
      link: "/tradein"
    },
    {
      icon: <FaMobileAlt size={40} />,
      titleKey: "cpo_title",
      descKey: "cpo_desc",
      link: "/cpo"
    },
    {
      icon: <FaBox size={40} />,
      titleKey: "new_devices_title",
      descKey: "new_devices_desc",
      link: "/new-devices"
    },
    {
      icon: <FaCog size={40} />,
      titleKey: "custom_kitting_title",
      descKey: "custom_kitting_desc",
      link: "/contact"
    },
    {
      icon: <FaSimCard size={40} />,
      titleKey: "connected_bundles_title",
      descKey: "connected_bundles_desc",
      link: "/new-devices"
    },
    {
      icon: <FaCalendarAlt size={40} />,
      titleKey: "leasing_title",
      descKey: "leasing_desc",
      link: "/leasing"
    },
    {
      icon: <FaShieldAlt size={40} />,
      titleKey: "warranty_title",
      descKey: "warranty_desc",
      link: "/contact"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="slider">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 col-md-12">
              <div className="text-center">
                <h1 className="animated fadeInUp mb-4 text-white">
                  {t("title")}
                </h1>
                <p className="lead text-white mb-4">
                  {t("subtitle")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <p className="lead text-center mb-4">
              {t("intro_paragraph")}
            </p>
          </Col>
        </Row>
      </Container>

      {/* Services Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="g-4 justify-content-center">
            {services.map((service, index) => (
              <Col key={index} md={6} lg={4}>
                <Card className="h-100 shadow-sm border-0 text-center p-4">
                  <Card.Body className="d-flex flex-column">
                    <div className="text-success mb-3">
                      {service.icon}
                    </div>
                    <Card.Title className="fw-bold mb-3">
                      {t(service.titleKey)}
                    </Card.Title>
                    <Card.Text className="flex-grow-1 mb-3">
                      {t(service.descKey)}
                    </Card.Text>
                    <Link
                      to={service.link}
                      className="btn btn-outline-success btn-sm mt-auto"
                    >
                      {t("learn_more")}
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Bridge Wireless Partnership */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <p className="text-center text-muted">
              {t("bridge_partnership")}
            </p>
          </Col>
        </Row>
      </Container>

      {/* Certification Badges */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <img
              src="/images/R2Footer.png"
              alt="ISO Certifications and R2 Certified"
              className="img-fluid"
              style={{ maxHeight: '100px', width: 'auto' }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
