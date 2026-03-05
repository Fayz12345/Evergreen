import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../Layout/ContactForm.css";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // Import i18n hook
// import Map from './Map';
const Contact = () => {
  const { t } = useTranslation("common"); // Load the 'navigation' namespace
  const form = useRef();
  const [status, setStatus] = useState("");
  const fadeVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_dpek8vp", // Replace with your EmailJS Service ID
        "template_72ki3ks", // Replace with your EmailJS Template ID
        form.current,
        "rXqF8dWptwdk30yuD" // Replace with your EmailJS Public Key
      )
      .then((result) => {
        console.log(result.text);
        setStatus(t("alertMessageSent"));
        e.target.reset();
      })
      .catch((error) => {
        console.log(error.text);
        setStatus(t("alertMessageFailed"));
      });
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
                  {t("contactHeading")}
                </h1>
                <p className="lead text-white mb-4">{t("contactSubHeading")}</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="container-xl my-5">
        {/* Warranty Support Note */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="alert alert-info border-start border-primary border-4">
              <h5 className="fw-bold mb-2">{t("warrantySupport.title")}</h5>
              <p className="mb-0">{t("warrantySupport.description")}</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <p>
              {t("phone")}:{" "}
              <a
                href="tel:+16474061199"
                className="text-success text-decoration-none"
              >
                +1(647)-406-1199
              </a>
              <br />
              {t("email")}:{" "}
              <a
                href="mailto:support@evergreen-wireless.com"
                className="text-success text-decoration-none"
              >
                support@evergreen-wireless.com
              </a>
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 mb-4 d-flex flex-column">
            <div className="contact-intro mb-3">
              <p className="text-muted medium fw-semibold mb-0">
                For warranty support, please include details including the
                original purchase date, copy of your purchase invoice, and the
                device IMEI (serial number) for faster service.
              </p>
            </div>
            <form ref={form} onSubmit={sendEmail}>
              <div className="form-group mb-3">
                {/* <label>Name</label> */}
                <input
                  type="text"
                  name="user_name"
                  className="form-control"
                  required
                  placeholder={t("placeholderName")}
                />
              </div>
              <div className="form-group mb-3">
                {/* <label>Email</label> */}
                <input
                  type="email"
                  name="user_email"
                  className="form-control"
                  required
                  placeholder={t("placeholderEmail")}
                />
              </div>
              <div className="form-group mb-3">
                {/* <label>Phone Number</label> */}
                <input
                  type="tel"
                  name="user_phone"
                  className="form-control"
                  required
                  placeholder={t("placeholderPhone")}
                />
              </div>
              <div className="form-group mb-3">
                {/* <label>Subject</label> */}
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  required
                  placeholder={t("placeholderSubject")}
                />
              </div>
              <div className="form-group mb-3">
                {/* <label>Message</label> */}
                <textarea
                  name="message"
                  rows="5"
                  className="form-control"
                  required
                  placeholder={t("placeholderMessage")}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success">
                {t("send")}
              </button>
            </form>
            {status && <p className="mt-3 text-success">{status}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
