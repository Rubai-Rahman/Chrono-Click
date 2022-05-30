import React, { useState } from "react";
import {
  Button,
  CloseButton,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import "./Banner.css";

function Banner() {
  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow(true);
  };
  const closeModal =() =>{
    setShow(false);
  }
  return (
    <div className="banner">
      <div className="dialog my-4">
        <h3>Chrono Click ... Time Is Ticking Away!</h3>
        <h5>DECIDE NOW TO UPDATE</h5>
        <button style={{backgroundColor:'none'}} onClick={openModal}>
        <ion-icon name="play-circle-outline"></ion-icon>
        </button>
      </div>
      <Modal show={show}  >
        <ModalHeader style={{backgroundColor:"black"}}>
         
          <button style={{backgroundColor:'transparent', fontSize:50,width:20,color:'#9c7c38'}} onClick={closeModal}><ion-icon name="close-outline"></ion-icon></button>
        </ModalHeader>
        <ModalBody style={{backgroundColor:'black'}} >
        <iframe width="465" height="315" src="https://www.youtube.com/embed/p0ZHRJ0xcd8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </ModalBody>
        
      </Modal>
    </div>
  );
}

export default Banner;
