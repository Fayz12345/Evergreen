import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Manuals = () => {
  return (
    <>
      <section className="slider text-white bg-dark py-5 mt-5">
        <Container>
          <Row className="justify-content-center text-center mt-5">
            <Col lg={9} md={12}>
              <h1 className="mb-3 mt-5 text-white">Device Manuals</h1>
              <p className="lead text-white mb-4">
                Download the latest Evergreen Wireless preparation manuals to
                keep your team aligned with our intake standards.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div className="container-xl my-5">
        <div className="text-center mb-5">
          <h3 className="mb-3">Available Downloads</h3>
          <p className="lead">
            Choose your preferred language to download the PDF guide.
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <Button
            variant="success"
            href="/manuals/Sky-65Pro-manual-en.pdf"
            download
            className="border border-2 border-success"
            style={{ borderWidth: "2px !important" }}
          >
            Download Sky 65Pro Manual (EN)
          </Button>
          <Button
            variant="success"
            href="/manuals/Sky-65Pro-manual-fr.pdf"
            download
            className="border border-2 border-success"
            style={{ borderWidth: "2px !important" }}
          >
            Download Sky 65Pro Manual (FR)
          </Button>
        </div>
      </div>
    </>
  );
};

export default Manuals;
