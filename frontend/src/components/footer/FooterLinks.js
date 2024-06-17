import React from "react";
import "./FooterLinks.scss";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterLinks = () => {
  // ! To get the current year
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      {/*  // ! section 1 */}
      <section className="contact-section">
        <div className="container contact">
          <div className="contact-icon">
            <Link to="https://www.linkedin.com/in/kevin-pudihang-138130141/">
              <FaLinkedin className="i" />
            </Link>
            <Link to="https://github.com/kevinandris">
              <FaGithub className="i" />
            </Link>
          </div>
          <h2>Let's Connect?</h2>
          <a href={"mailto:kevinandris27@gmail.com"} className="btn btn-dark">
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
            <p className="link-heading">About us</p>
            <ul className="nav-ul footer-links">
              <li>
                <a href="#home">Blog</a>
              </li>
              <li>
                <a href="#home">Social Media</a>
              </li>
              <li>
                <a href="#home">Program</a>
              </li>
              <li>
                <a href="#home">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="footer-menu">
            <p className="link-heading">Features</p>
            <ul className="nav-ul footer-links">
              <li>
                <a href="#home">Popular books</a>
              </li>
              <li>
                <a href="#home">Popular Categories</a>
              </li>
              <li>
                <a href="#home">Discounted books</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default FooterLinks;
