import React from "react";
import "./FooterLinks.scss";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logoImg from "../../assets/shopito_logo.png";

const FooterLinks = () => {
  return (
    <>
      {/*  // ! section 1 */}
      <section className="contact-section">
        <div className="container contact">
          <div className="contact-icon">
            <FaFacebookF className="i" />
            <FaTwitter className="i" />
            <FaInstagram className="i" />
            <FaYoutube className="i" />
          </div>
          <h2>Let's Connect?</h2>
          <a href="#home" className="btn btn-dark">
            Make an enquiry!
          </a>
        </div>
      </section>

      {/* // ! section 2 */}
      <section className="footer-section">
        <div className="container footer">
          <div className="footer-logo">
            {/* <img src={logoImg} alt="logo" /> */}
            <h3>
              Kei<span>py</span>
            </h3>
          </div>

          <div className="footer-menu">
            <p className="link-heading">Features</p>
            <ul className="nav-ul footer-links">
              <li>
                <a href="#home">Link Shortening</a>
              </li>
              <li>
                <a href="#home">Branded Links</a>
              </li>
              <li>
                <a href="#home">Analytics</a>
              </li>
              <li>
                <a href="#home">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-menu">
            <p className="link-heading">Resources</p>
            <ul className="nav-ul footer-links">
              <li>
                <a href="#home">Link Shortening</a>
              </li>
              <li>
                <a href="#home">Branded Links</a>
              </li>
              <li>
                <a href="#home">Analytics</a>
              </li>
              <li>
                <a href="#home">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-menu">
            <p className="link-heading">Company</p>
            <ul className="nav-ul footer-links">
              <li>
                <a href="#home">Link Shortening</a>
              </li>
              <li>
                <a href="#home">Branded Links</a>
              </li>
              <li>
                <a href="#home">Analytics</a>
              </li>
              <li>
                <a href="#home">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-menu">
            <p className="link-heading">Partners</p>
            <ul className="nav-ul footer-links">
              <li>
                <a href="#home">Link Shortening</a>
              </li>
              <li>
                <a href="#home">Branded Links</a>
              </li>
              <li>
                <a href="#home">Analytics</a>
              </li>
              <li>
                <a href="#home">Blog</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default FooterLinks;
