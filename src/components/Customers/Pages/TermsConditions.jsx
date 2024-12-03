import React from 'react';
import '../Layout/TermsConditions.css'; // For any custom styling
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

const TermsConditions = () => {
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
                            <motion.div initial="hidden" animate="visible" variants={fadeVariants}>
                                <h2 className="animated fadeInUp mb-3 mt-5 text-white">Welcome to Evergreen Wireless</h2>
                                <p className="lead text-white mb-4">
                                    These Terms and Conditions govern your use of our mobile trade-in services and data wipe testing solutions.
                                    By accessing or using the Site and its services, you agree to comply with and be bound by these Terms. If you do not agree, you must not use our services.
                                </p>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <div className="container-xl my-5 bg-light shadow p-5 rounded">
                <section className="mb-4">
                    <h2 className="text-start fw-bold text-primary">1. Services Provided</h2>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">1.1 Mobile Trade-In</h5>
                        <ul className="text-muted">
                            <li>Users can submit their eligible mobile devices for trade-in to receive a valuation based on the condition and specifications of the device.</li>
                            <li>Device valuation is subject to inspection and verification by our team.</li>
                        </ul>
                    </div>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">1.2 Data Wipe Testing</h5>
                        <ul className="text-muted">
                            <li>As part of the trade-in process, we provide data wipe testing using the data erasure tool to ensure all personal data is securely removed from your device.</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-4">
                    <h2 className="text-start fw-bold text-primary">2. User Responsibilities</h2>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">2.1 Device Ownership</h5>
                        <ul className="text-muted">
                            <li>By trading in a device, you confirm that you are the rightful owner or have the legal right to trade in the device.</li>
                            <li>Stolen or illegally obtained devices are prohibited and will be reported to law enforcement authorities.</li>
                        </ul>
                    </div>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">2.2 Device Condition</h5>
                        <ul className="text-muted">
                            <li>You must accurately describe the condition of your device during the submission process. Misrepresentation may result in changes to the valuation or rejection of the trade-in.</li>
                        </ul>
                    </div>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">2.3 Data Backup</h5>
                        <ul className="text-muted">
                            <li>It is your responsibility to back up all personal data from your device before initiating the trade-in process. We are not liable for any loss of data.</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-4">
                    <h2 className="text-start fw-bold text-primary">3. Data Wipe Testing</h2>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">3.1 Data Erasure</h5>
                        <ul className="text-muted">
                            <li>We use certified data wiping software to ensure the secure erasure of all personal data on devices.</li>
                            <li>A certificate of data erasure may be provided upon request.</li>
                        </ul>
                        <h5 className="fw-semibold text-secondary">3.2 No Liability for Residual Data</h5>
                        <ul className="text-muted">
                            <li>While our tools are designed for thorough data erasure, we cannot guarantee against the recovery of residual data if the device has been tampered with or modified.</li>
                        </ul>
                        <h5 className="fw-semibold text-secondary">3.3 Compliance</h5>
                        <ul className="text-muted">
                            <li>The data erasure process complies with NIST.</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-4">
                    <h2 className="text-start fw-bold text-primary">4. Trade-In Valuation and Payment</h2>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">4.1 Valuation</h5>
                        <ul className="text-muted">
                            <li>Device valuation is determined based on the device’s condition, model, and specifications, as described during the submission process.</li>
                            <li>Final valuation is subject to inspection by our team.</li>
                        </ul>
                        <h5 className="fw-semibold text-secondary">4.2 Payment</h5>
                        <ul className="text-muted">
                            <li>Payments will be processed via [Payment Methods] after the device passes inspection and data wipe testing.</li>
                            <li>If your device fails inspection, you will be notified, and revised terms will be offered.</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-4">
                    <h2 className="text-start fw-bold text-primary">5. Device Rejection Policy</h2>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">5.1 Non-Eligible Devices</h5>
                        <ul className="text-muted">
                            <li>Devices that do not meet the eligibility criteria will be returned to the user or responsibly recycled at our discretion.</li>
                        </ul>
                        <h5 className="fw-semibold text-secondary">5.2 Disputes</h5>
                        <ul className="text-muted">
                            <li>Any disputes regarding device valuation or rejection must be submitted within 7 buisness days of notification.</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-4">
                    <h2 className="text-start fw-bold text-primary">6. Warranties and Disclaimers</h2>
                    <div className="ms-5">
                        <ul className="text-muted">
                            <li><strong>No Guarantee of Value:</strong> Trade-in values are subject to market fluctuations and are not guaranteed until confirmed during inspection.</li>
                            <li><strong>Disclaimer of Liability:</strong> We are not liable for any loss, damage, or data breaches occurring before the device is received and processed by us.</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-4">
                    <h2 className="text-start fw-bold text-primary">7. User Data Privacy</h2>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">7.1 Collection and Use</h5>
                        <ul className="text-muted">
                            <li>We may collect certain information during the trade-in process, including your personal details and device specifications.</li>
                        </ul>
                        <h5 className="fw-semibold text-secondary">7.2 Data Protection</h5>
                        <ul className="text-muted">
                            <li>Tools ensure secure data erasure, but users are responsible for removing sensitive accounts (e.g., Google or Apple IDs) before submission.</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-4">
                    <h2 className="text-start fw-bold text-primary">8. Governing Law and Dispute Resolution</h2>
                    <div className="ms-5">
                        <ul className="text-muted">
                            <li> Any disputes arising under these Terms shall be governed by and construed in accordance with the Governing laws.</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-4">
                    <h2 className="text-start fw-bold text-primary">9. Changes to These Terms</h2>
                    <div className="ms-5">
                        <p className="text-muted">We reserve the right to update or modify these Terms at any time. Continued use of the Site constitutes acceptance of the updated Terms.</p>
                    </div>
                </section>

                <section className="mb-4">
                    <h2 className="text-start fw-bold text-primary">10. Contact Us</h2>
                    <div className="ms-5">
                        <p className="text-muted">If you have any questions or concerns about these Terms, please contact us at:</p>
                        <ul className="text-muted">
                        <li>
                        Email: <a href="mailto:info@bridge-wireless.com" className="text-primary text-decoration-none">
                            info@bridge-wireless.com
                        </a>
                    </li>
                    <li>
                    Phone: <a href="tel:+16474061199" className="text-primary text-decoration-none">
                           +1(647)-406-1199
                        </a>
                    </li>
                        </ul>
                    </div>
                </section>

                <p className="mt-4 text-muted">
                    <strong>Acknowledgment:</strong> By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
                </p>
            </div>
        </>
    );
};

export default TermsConditions;