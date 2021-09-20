import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { AiFillRocket } from 'react-icons/ai';
const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" >
    <Container>
      <Navbar.Brand>
      <AiFillRocket/>
        {' '}
      Spacetagram
      </Navbar.Brand>
    </Container>
  </Navbar>
    </>
  );
};

export default NavBar;
