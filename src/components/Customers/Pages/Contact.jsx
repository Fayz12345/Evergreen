import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../Layout/ContactForm.css';
import { Container, Row, Col} from 'react-bootstrap';
import { Fade } from 'react-reveal'; // Import animation from react-reveal (Install via npm)
// import Map from './Map';
const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_dpek8vp', // Replace with your EmailJS Service ID
            'template_72ki3ks', // Replace with your EmailJS Template ID
            form.current,
            'rXqF8dWptwdk30yuD' // Replace with your EmailJS Public Key
        )
        .then((result) => {
            console.log(result.text);
            setStatus('Message sent successfully!');
            e.target.reset();
        })
        .catch((error) => {
            console.log(error.text);
            setStatus('Failed to send the message. Please try again later.');
        });
    };
    const data = [
        {
          id: 1,
          name: "Park Slope",
          latitude: "40.6710729",
          longitude: "-73.9988001"
        },
        {
          id: 2,
          name: "Bushwick",
          latitude: "40.6942861",
          longitude: "-73.9389312"
        },
        {
          id: 3,
          name: "East New York",
          latitude: "40.6577799",
          longitude: "-73.9147716"
        }
      ];
      
      data[0].circle = {
        radius: 3000,
        options: {
          strokeColor: "#ff0000"
        }
      };
      
    return (
        <>
        
    <section className="slider text-white bg-dark py-5 mt-5">
                <Container>
                    <Row className="justify-content-center text-center mt-5">
                        <Col lg={9} md={12}>
                            <Fade top>
                                <h1 className="animated fadeInUp mb-3 mt-5 text-white">Contact Us</h1>
                                <p className="lead text-white mb-4">We’d love to hear from you!</p>
                               
                            </Fade>
                        </Col>
                    </Row>
                </Container>
            </section>
        <div className="container-xl my-5">
            
            {/* <div className="row">
                <div className="col-md-6">
                <p> 
                        <strong>Phone Number:</strong> +1(647)-406-1199
                        <br />
                        <strong>Email:</strong> steve.roberts@evergreen-wireless.com
                    <br />
                        <strong>Address:</strong> 2889 Brighton Rd, Oakville, ON L6H 6C9
                    </p>
                </div>
               
            </div> */}
            <div className="row">
                <div className="col-md-6">
                    {/* <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2893.35276478345!2d-79.68224382337517!3d43.51583596130373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3edefe8a3c01%3A0xa7c963bc43166a8!2sBridge%20Wireless%20Solutions%20Inc.!5e0!3m2!1sen!2sca!4v1730921588417!5m2!1sen!2sca" 
                        width="100%"
                        height="100%"
                        frameBorder="1"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        aria-hidden="false"
                        tabIndex="0"
                        title="Our Location"
                        className="border rounded"
                    ></iframe> */}
                    {/* <Map
                        center={{ lat: 43.515550, lng: -79.679270 }}
                        zoom={12}
                        places={data}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key="
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    /> */}
                    <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5786.706220015706!2d-79.68223182451993!3d43.51582876130582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b43a74210acc1%3A0x9fcd452e8cde4cac!2s2889%20Brighton%20Rd%2C%20Oakville%2C%20ON%20L6H%206C9!5e0!3m2!1sen!2sca!4v1731680954495!5m2!1sen!2sca" 
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                    title="Our Location"
                    className="border rounded"></iframe>
                </div>
                <div className="col-md-6 mb-4">
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="form-group mb-3">
                            {/* <label>Name</label> */}
                            <input type="text" name="user_name" className="form-control" required Placeholder="Name*" />
                        </div>
                        <div className="form-group mb-3">
                            {/* <label>Email</label> */}
                            <input type="email" name="user_email" className="form-control" required placeholder='Email*'/>
                        </div>
                        <div className="form-group mb-3">
                            {/* <label>Phone Number</label> */}
                            <input type="tel" name="user_phone" className="form-control" required  placeholder='Phone Number*'/>
                        </div>
                        <div className="form-group mb-3">
                            {/* <label>Subject</label> */}
                            <input type="text" name="subject" className="form-control" required placeholder='Subject*'/>
                        </div>
                        <div className="form-group mb-3">
                            {/* <label>Message</label> */}
                            <textarea name="message" rows="5" className="form-control" required placeholder='Message*'></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">Send</button>
                    </form>
                    {status && <p className="mt-3 text-success">{status}</p>}
                </div>
            </div>
        </div>
        
      </>
    );
};

export default Contact;
