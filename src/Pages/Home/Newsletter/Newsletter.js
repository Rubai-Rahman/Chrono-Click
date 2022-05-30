import React from 'react';
import { Container } from 'react-bootstrap';
import './Newsletter.css';

const Newsletter = () => {
    return (
        <div className='newsLetter'>
            <Container >
            <div className="text">
                <h6>SUBSCRIBE TO THE MAILING LIST</h6>
                <h3>
                    Newsletter
                </h3>
            </div>
            <div className="mail my-5">
                <input type="gmail " placeholder='Your email address' />
                <button > SUBMIT</button>
            </div>
        </Container>
        </div>
    );
};

export default Newsletter;