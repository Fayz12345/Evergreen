import React from 'react';

import { Container, Row, Col} from 'react-bootstrap';
import { Fade } from 'react-reveal'; // Import animation from react-reveal (Install via npm)
const PrivacyPolicy = () => {
  return (
    <>
    <section className="slider text-white bg-dark py-5 mt-5">
        <Container>
            <Row className="justify-content-center text-center mt-5">
                <Col lg={9} md={12}>
                    <Fade top>
                        <h1 className="animated fadeInUp mb-3 mt-5 text-white">Privacy Policies</h1>
                        <p className="lead text-white mb-4"> Effective Date: [Insert Date]</p>
                        <p  className="lead text-white mb-4">
                            At <strong>Evergreen Wireless</strong>, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and disclose information when you use our website and services.
                          </p>
                       
                    </Fade>
                </Col>
            </Row>
        </Container>
    </section>


    <div className="container-xl my-4">
     
     

      <h2 className="mt-4 text-left">1. Information We Collect</h2>
      <p>We may collect various types of information, including:</p>
      <ul>
        <li>Personal Information: Name, email address, phone number, etc.</li>
        <li>Usage Data: IP address, browser type, pages visited, etc.</li>
        <li>Cookies and Tracking Data: Information stored in cookies to improve user experience.</li>
      </ul>

      <h2 className="mt-4 text-left">2. How We Use Your Information</h2>
      <p>We may use your information for purposes such as:</p>
      <ul>
        <li>Providing and maintaining our services</li>
        <li>Improving our website and services</li>
        <li>Sending you promotional information if you have opted in</li>
        <li>Complying with legal obligations</li>
      </ul>

      <h2 className="mt-4 text-left">3. Sharing Your Information</h2>
      <p>We do not share your personal data with third parties, except:</p>
      <ul>
        <li>With your consent</li>
        <li>For processing with trusted service providers who adhere to our privacy policies</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2 className="mt-4 text-left">4. Data Security</h2>
      <p>We use industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>

      <h2 className="mt-4 text-left">5. Your Rights</h2>
      <p>
        You have the right to access, update, or delete your personal information. Contact us at <strong>[Contact Email]</strong> to exercise your rights.
      </p>

      <h2 className="mt-4 text-left">6. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy periodically. The latest version will always be available on this page.</p>

      <h2 className="mt-4 text-left">Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at <strong>[Contact Email]</strong>.</p>
    </div>
    </>
  );
};

export default PrivacyPolicy;
