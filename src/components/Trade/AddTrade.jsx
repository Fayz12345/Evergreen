import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import { motion } from "framer-motion";
import useRecaptcha from "../Captcha";
import ReCAPTCHA from "react-google-recaptcha";

import { useTranslation } from "react-i18next"; // Import i18n hook
import "../Admin/Layout/trade.css";
const AddTrade = () => {
  const { t } = useTranslation("trade"); // Load the 'navigation' namespace

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();

  const [batchErrors, setBatchErrors] = useState({});

  const [activeTab, setActiveTab] = useState("single");
  const [batchFile, setBatchFile] = useState(null); // State to store selected file

  const navigate = useNavigate();

  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow && iframe.contentDocument) {
      const doc = iframe.contentDocument;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { margin: 0; }
            </style>
          </head>
          <body>
            <div class="buyback-widget"></div>
            <script src="https://widget.reusely.com/v3.js"></script>
            <script>
              window.onload = function() {
                new Buyback({
                  tenantId: "d83d36c95a12aa520cf608adc2fca2d02527879d4ff31c0f1457c295d6712519",
                  apiKey: "56KS2BgfJCaQKceYLXgtd5uHPZGF0rmPgM5JRBZrtQvAD3BdRv2avr3a9eLAiRTV",
                  disableFloatButton: false
                });
              }
            </script>
          </body>
        </html>
      `);
      doc.close();
    }
  }, []);

  const handleFileSelect = (event) => {
    setBatchFile(event.target.files[0]);
  };

  const handleBatchUploadFile = async () => {
    const errors = {};
    if (!username) errors.username = "Company name is required.";
    if (!email) errors.email = "Email is required.";
    if (!batchFile) errors.file = "CSV file is required.";
    if (!capchaToken) errors.captcha = "Captcha is required.";

    setBatchErrors(errors);

    if (Object.keys(errors).length > 0) {
      return; // Stop if there are errors
    }
    console.log("username:", username);
    console.log("email:", email);
    const formData = new FormData();
    formData.append("file", batchFile);
    formData.append("companyName", username);
    formData.append("email", email);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/batch`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Batch file uploaded successfully.");
      // Optionally, show a success message or reset state
      navigate("/trade-history");
    } catch (error) {
      console.error("Error uploading batch file:", error);
    }
  };
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
                  {t("tradeInQuote")}
                </h1>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <div className="container-xl mb-5">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-5 mt-5"
        >
          {/* Single Trade Tab */}
          <Tab
            eventKey="single"
            title={t("singleTradeIn")}
            tabClassName="text-success"
          >
            <div className="my-5 d-flex justify-content-center">
              <iframe
                ref={iframeRef}
                title="Buyback Widget"
                width="800"
                height="500"
                style={{
                  border: "none",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              />
            </div>
          </Tab>

          {/* Batch Upload Tab */}
          <Tab
            eventKey="batch"
            title={t("batchUpload")}
            tabClassName="text-success"
          >
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card p-4 text-center">
                  <>
                    <p>{t("batchUploadTitle")}</p>
                    <p className="mt-3">{t("batchUploadDescription")}</p>
                    <Button
                      variant="light"
                      className="mt-3"
                      href={`${process.env.REACT_APP_URL}/sample-trades.csv`}
                      download
                    >
                      {t("downloadSampleCsv")}
                    </Button>

                    <input
                      type="file"
                      accept=".csv"
                      className={`form-control mt-3 ${
                        batchErrors.file ? "is-invalid" : ""
                      }`}
                      onChange={(e) => {
                        handleFileSelect(e);
                        if (batchErrors.file && e.target.files.length > 0) {
                          setBatchErrors((prev) => ({
                            ...prev,
                            file: undefined,
                          }));
                        }
                      }}
                    />
                    {batchErrors.file && (
                      <div className="invalid-feedback">{batchErrors.file}</div>
                    )}

                    <div className="card-body text-left">
                      <form>
                        <div className="form-group mb-3">
                          <label htmlFor="username">Company Name</label>
                          <input
                            type="text"
                            className={`form-control ${
                              batchErrors.username ? "is-invalid" : ""
                            }`}
                            id="username"
                            placeholder=""
                            value={username}
                            onChange={(e) => {
                              setUsername(e.target.value);
                              if (
                                batchErrors.username &&
                                e.target.value.trim() !== ""
                              ) {
                                setBatchErrors((prev) => ({
                                  ...prev,
                                  username: undefined,
                                }));
                              }
                            }}
                          />
                          {batchErrors.username && (
                            <div className="invalid-feedback">
                              {batchErrors.username}
                            </div>
                          )}
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            className={`form-control ${
                              batchErrors.email ? "is-invalid" : ""
                            }`}
                            id="email"
                            placeholder=""
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (
                                batchErrors.email &&
                                e.target.value.trim() !== ""
                              ) {
                                setBatchErrors((prev) => ({
                                  ...prev,
                                  email: undefined,
                                }));
                              }
                            }}
                          />
                          {batchErrors.email && (
                            <div className="invalid-feedback">
                              {batchErrors.email}
                            </div>
                          )}
                        </div>
                      </form>
                    </div>

                    <div className="text-center">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                        onChange={(token) => {
                          handleRecaptcha(token);
                          if (batchErrors.captcha && token) {
                            setBatchErrors((prev) => ({
                              ...prev,
                              captcha: undefined,
                            }));
                          }
                        }}
                      />{" "}
                      {batchErrors.captcha && (
                        <div className="text-danger mt-2">
                          {batchErrors.captcha}
                        </div>
                      )}
                    </div>

                    <Button
                      variant="success"
                      className="mt-3"
                      onClick={handleBatchUploadFile}
                    >
                      {t("processBatchUpload")}
                    </Button>
                  </>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default AddTrade;
