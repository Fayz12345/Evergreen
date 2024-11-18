import React from 'react';
import '../Layout/TermsConditions.css'; // Optional for any custom styling
import { Container, Row, Col} from 'react-bootstrap';
import { Fade } from 'react-reveal'; // Import animation from react-reveal (Install via npm)
const TermsConditions = () => {
    return (
        <>
            <section className="slider text-white bg-dark py-5 mt-5">
                <Container>
                    <Row className="justify-content-center text-center mt-5">
                        <Col lg={9} md={12}>
                            <Fade top>
                                <h1 className="animated fadeInUp mb-3 mt-5 text-white">Terms & Conditions</h1>
                                <p className="lead text-white mb-4"> Your Terms and Conditions section is like a contract between you and your customers. 
                You make information and services available to your customers, and your customers must 
                follow your rules.</p>
                               
                            </Fade>
                        </Col>
                    </Row>
                </Container>
            </section>
        
        
       
        <Container className="my-5" fluid="xl">
          

            <h3 className="mt-4">Common Terms</h3>
            <ul>
                <li>Withdraw and cancel services, and make financial transactions.</li>
                <li>Manage customer expectations, such as liability for information errors or website downtime.</li>
                <li>Explain your copyright rules, such as attribution, adaptation, commercial or non-commercial use, etc.</li>
                <li>Set rules for user behavior, like forbidding unlawful behavior, hate speech, bullying, promotions, spam, etc.</li>
                <li>Disable user accounts.</li>
                <li>Write down any other terms or conditions that protect you or your audience.</li>
            </ul>

            <h1 className="mt-5">Return and Refund Policy</h1>
            <hr className="my-4 w-100 border border-dark" />

            <p>
                This is a place to describe your Return and Refund Policy to buyers.
            </p>

            <h3 className="mt-4">A Return and Refund policy usually consists of:</h3>
            <ul>
                <li>Terms of return (i.e. number of days).</li>
                <li>State of return (e.g. unworn).</li>
                <li>Reason for return (e.g. damaged or wrong product).</li>
                <li>Process for return (i.e. how to initiate a return, how to contact customer service).</li>
                <li>Process of refund (i.e. terms of refund, duration, payment details).</li>
                <li>Contact details.</li>
            </ul>

            <p className="mt-5">
                If you have any questions or need further information, please don't hesitate to contact us.
            </p>
        </Container>

        </>
    );
};

export default TermsConditions;
