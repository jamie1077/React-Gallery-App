import React from 'react';
import {NavLink} from 'react-router-dom';


const Nav = () => (
  <nav className="main-nav">
    <ul>
      <li><NavLink exact to="/">Cats</NavLink></li>
      <li><NavLink to="/about">Dogs</NavLink></li>
      <li><NavLink to="/teachers">Birds</NavLink></li>
    </ul>    
  </nav>
);

export default Nav;