import React from "react";
import NavBar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import './LabelBar.css'

export default function LabelBar() {
  return (
      <>
   <NavBar style={{backgroundColor: '#b81c2a'}} expand='lg'>
    <NavBar.Brand href='/' style={{color: 'white'}}>GAME NAME</NavBar.Brand>
    <NavBar.Toggle aria-controls='basic-navbar-nav' />
    <NavBar.Collapse id='basic-navbar-nav'>
        <Nav className='mx-auto'>
            {localStorage.token && <Nav.Link href='/login' style={{color: 'white'}}> LOGIN/Register </Nav.Link>}
            {localStorage.token && <Nav.Link href='/play'  style={{color: 'white'}}> PLAY </Nav.Link>}
        </Nav>
    </NavBar.Collapse>
   </NavBar>
   </>
  );
}
