import React from 'react';
import dna from './icons/dna.gif';
import { Navbar } from 'react-bootstrap';
import {Link} from 'react-router-dom'


function Header(){
  return (
    <Navbar className="navbar-dna">
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/"><img src={dna} className="brandImg" alt="DNA Icon"/>DNA Secondary Structure Representation</Link>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  );
}

export default Header;
