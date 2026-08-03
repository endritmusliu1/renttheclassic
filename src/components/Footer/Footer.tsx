import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-section brand-section">
          <h2 className="footer-logo">RENT THE <span>CLASSIC</span></h2>
          <p className="footer-tagline">Experience the golden age of automotive history.</p>
          <div className="hours-info">
            <h4>Fleet Operations</h4>
            <p>Monday - Sunday: 08:00 - 20:00</p>
            <p>Support: 24/7 </p>
            <p>Location: Prishtina Airport Adem Jashari </p>
          </div>
        </div>
        <div className="footer-section support-section">
          <h3>Reservation Support</h3>
          <p className="support-highlight">
            Need to cancel your reservation, modify your pick-up date, or get more detailed information about our fleet?
          </p>
          <p className="support-action">
            Our priority team is standing by to assist you.
          </p>
          <a className="footer-email-btn">
            Contact Support
          </a>
        </div>
        <div className="footer-section contact-section">
          <h3>Get In Touch</h3>
          <ul className="contact-list">
            <li>
              <span className="icon">📱</span> 
              <span>+383 38 555 019</span>
            </li>
            <li>
              <span className="icon">📍</span> 
              <span>Pristina, Kosovo</span>
            </li>
            <li>
              <span className="icon">✉️</span> 
              <span>info@classicdrive.com</span>
            </li>
          </ul>
          
          <div className="social-links">
            <a href="#instagram" aria-label="Instagram">Instagram</a>
            <a href="#facebook" aria-label="Facebook">Facebook</a>
            <a href="#twitter" aria-label="Twitter">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} RENT THE CLASSIC. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#terms">Terms of Service</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;