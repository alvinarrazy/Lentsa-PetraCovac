import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Footer.css'

function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="footer-wrap">
          <h1 className="footer-logo">
            <Link to='/'>
              <img src={`${window.location.origin + "/images/lentsa.png"}`}>
              </img>
            </Link>
          </h1>
          <hr />
          <p>Lentsa Petracovac. All rights reserved</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
