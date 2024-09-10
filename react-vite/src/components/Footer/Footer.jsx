import { Link } from "react-router-dom";

import { FaRegCopyright } from "react-icons/fa6";

import "./Footer.css";

function Footer() {

    const currentYear = new Date().getFullYear();

  return (
    <>
      {/* <h1>ʕ*•ﻌ•ʔฅ</h1> */}
      <footer>
        <div id="footer-container">
          <div id="copyright-pinnovate">
            <FaRegCopyright />
            <span> {currentYear} pinnovate, inc</span>
          </div>
          <div id="contact-links">
            <Link to="https://github.com/cvryn" target="_blank">github</Link>
            <Link to="https://www.linkedin.com/in/carynwang/" target="_blank">LinkedIn</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
