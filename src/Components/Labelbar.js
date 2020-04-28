import React from "react";
import NavBar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav'
import './LabelBar.css'

export default function LabelBar() {
  return (
   <NavBar bg='dark' expand='lg'>
    <NavBar.Brand href='/home'>GAME NAME</NavBar.Brand>
    <NavBar.Toggle aria-controls='basic-navbar-nav' />
    <NavBar.Collapse id='basic-navbar-nav'>
      <Nav className='mx-auto'>
        <Nav.Link href='/home'>Home</Nav.Link>
        <Nav.Link href='/login'>Login</Nav.Link>
      </Nav>
    </NavBar.Collapse>
   </NavBar>
  );
}
