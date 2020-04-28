import React from "react";
import NavBar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import './LabelBar.css'

export default function LabelBar() {
  return (
      <>
   <NavBar bg='dark' expand='lg'>
    <NavBar.Brand href='/'>GAME NAME</NavBar.Brand>
    <NavBar.Toggle aria-controls='basic-navbar-nav' />
    <NavBar.Collapse id='basic-navbar-nav'>
        <Nav className='mx-auto'>
            {localStorage.token && <Nav.Link href='/'> HOME </Nav.Link>}
            {localStorage.token && <Nav.Link href='/login'> LOGIN </Nav.Link>}
            {localStorage.token && <Nav.Link href='/register'> REGISTER </Nav.Link>}
            {localStorage.token && <Nav.Link href='/play'> PlAY </Nav.Link>}

        </Nav>
    </NavBar.Collapse>
   </NavBar>
   </>
  );
}
