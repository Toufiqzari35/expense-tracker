import React from 'react';
import {NavLink} from 'react-router-dom';
import './index.css';

const Navbar = () => {
    return (
    <>
      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <div className="container">
        <a href="../" className="navbar-brand">Expense -Tracker</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink activeClassName="active-class" className="nav-link" to="/">+ New Entry</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active-class" className="nav-link" to="/yearly">Yearly</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active-class" className="nav-link" to="/records">Records</NavLink>
            </li>
          </ul>

        </div>
      </div>
    </div>
    </>
    )
}

export default Navbar;
