import React from 'react';
import '../Layout/TermsConditions.css'; // For any custom styling
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Import i18n hook

const TermsConditions = () => {
    const { t } = useTranslation('terms'); // Load the 'terms' namespace
    const { t:c } = useTranslation('common'); // Load the 'common' namespace

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
                                <h2 className="animated fadeInUp mb-3 mt-5 text-white">{t('welcomeMessage')}</h2>
                                <p className="lead text-white mb-4">{t('introText')}</p>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <div className="container-xl my-5 bg-light shadow p-5 rounded">
                {/* Section 1 */}
                <section className="mb-4">
                    <h2 className="text-start fw-bold text-primary">{t('sections.0.title')}</h2>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">{t('sections.0.subsections.0.title')}</h5>
                        <ul className="text-muted">
                            <li>{t('sections.0.subsections.0.details.detail1')}</li>
                            <li>{t('sections.0.subsections.0.details.detail2')}</li>
                        </ul>
                    </div>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">{t('sections.0.subsections.1.title')}</h5>
                        <ul className="text-muted">
                            <li>{t('sections.0.subsections.1.details.detail1')}</li>
                        </ul>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="mb-4">
                    <h2 className="text-start fw-bold text-primary">{t('sections.1.title')}</h2>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">{t('sections.1.subsections.0.title')}</h5>
                        <ul className="text-muted">
                            <li>{t('sections.1.subsections.0.details.detail1')}</li>
                            <li>{t('sections.1.subsections.0.details.detail2')}</li>
                        </ul>
                    </div>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">{t('sections.1.subsections.1.title')}</h5>
                        <ul className="text-muted">
                            <li>{t('sections.1.subsections.1.details.detail1')}</li>
                        </ul>
                    </div>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">{t('sections.1.subsections.2.title')}</h5>
                        <ul className="text-muted">
                            <li>{t('sections.1.subsections.2.details.detail1')}</li>
                        </ul>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="mb-4">
                    <h2 className="text-start fw-bold text-primary">{t('sections.2.title')}</h2>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">{t('sections.2.subsections.0.title')}</h5>
                        <ul className="text-muted">
                            <li>{t('sections.2.subsections.0.details.detail1')}</li>
                            <li>{t('sections.2.subsections.0.details.detail2')}</li>
                        </ul>
                        <h5 className="fw-semibold text-secondary">{t('sections.2.subsections.1.title')}</h5>
                        <ul className="text-muted">
                            <li>{t('sections.2.subsections.1.details.detail1')}</li>
                        </ul>
                        <h5 className="fw-semibold text-secondary">{t('sections.2.subsections.2.title')}</h5>
                        <ul className="text-muted">
                            <li>{t('sections.2.subsections.2.details.detail1')}</li>
                        </ul>
                    </div>
                </section>

                {/* Section 4 */}
                <section className="mb-4">
                    <h2 className="text-start fw-bold text-primary">{t('sections.3.title')}</h2>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">{t('sections.3.subsections.0.title')}</h5>
                        <ul className="text-muted">
                            <li>{t('sections.3.subsections.0.details.detail1')}</li>
                            <li>{t('sections.3.subsections.0.details.detail2')}</li>
                        </ul>
                        <h5 className="fw-semibold text-secondary">{t('sections.3.subsections.1.title')}</h5>
                        <ul className="text-muted">
                            <li>{t('sections.3.subsections.1.details.detail1')}</li>
                            <li>{t('sections.3.subsections.1.details.detail2')}</li>
                        </ul>
                    </div>
                </section>

                {/* Section 5 */}
                <section className="mb-4">
                    <h2 className="text-start fw-bold text-primary">{t('sections.4.title')}</h2>
                    <div className="ms-5">
                        <h5 className="fw-semibold text-secondary">{t('sections.4.subsections.0.title')}</h5>
                        <ul className="text-muted">
                            <li>{t('sections.4.subsections.0.details.detail1')}</li>
                        </ul>
                        <h5 className="fw-semibold text-secondary">{t('sections.4.subsections.1.title')}</h5>
                        <ul className="text-muted">
                            <li>{t('sections.4.subsections.1.details.detail1')}</li>
                        </ul>
                    </div>
                </section>

                {/* Section 10 */}
                <section className="mb-4">
                    <h2 className="text-start fw-bold text-primary">{t('sections.5.title')}</h2>
                    <div className="ms-5">
                        <ul className="text-muted">
                            <li>{c('email')}: <a href="mailto:info@bridge-wireless.com" className="text-primary text-decoration-none">{t('sections.5.details.email')}</a></li>
                            <li> {c('phone')}: <a href="tel:+16474061199" className="text-primary text-decoration-none">{t('sections.5.details.phone')} </a></li>
                        </ul>
                    </div>
                </section>
                <p className="mt-4 text-muted">
                    <strong>{t('acknowledgment.title')}:</strong> {t('acknowledgment.text')}
                </p>
            </div>
        </>
    );
};

export default TermsConditions;
