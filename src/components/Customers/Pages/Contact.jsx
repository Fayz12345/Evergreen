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
        <div className="row g-4 align-items-stretch">
          <div className="col-md-6 d-flex flex-column">
            <div className="contact-intro mb-3">
              <p className="mb-0">
                {/* {t("phone")}:{" "}
                <a
                  href="tel:+16474061199"
                  className="text-success text-decoration-none"
                >
                  +1(647)-406-1199
                </a>
                <br /> */}
                {t("email")}:{" "}
                <a
                  href="mailto:support@evergreen-wireless.com"
                  className="text-success text-decoration-none"
                >
                  support@evergreen-wireless.com
                </a>
                <br />
                {t("address")}:{" "}
                <a
                  href="https://www.google.com/maps/place/2889+Brighton+Rd,+Oakville,+ON+L6H+6C9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-decoration-none"
                >
                  2889 Brighton Rd, Oakville, ON L6H 6C9
                </a>
              </p>
            </div>
            <div className="contact-map flex-grow-1 d-flex">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5786.706220015706!2d-79.68223182451993!3d43.51582876130582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b43a74210acc1%3A0x9fcd452e8cde4cac!2s2889%20Brighton%20Rd%2C%20Oakville%2C%20ON%20L6H%206C9!5e0!3m2!1sen!2sca!4v1731680954495!5m2!1sen!2sca"
                width="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                title="Our Location"
                className="border rounded flex-fill"
              ></iframe>
            </div>
          </div>
          <div className="col-md-6 mb-4 d-flex flex-column">
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
