import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{ minHeight: "120px" }}>
      <div
        className="p-4 text-white position-absolute bottom-0 w-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.70)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div>
                <h2>
                  <em>
                    Audit <br></br>Management
                  </em>
                </h2>
              </div>
            </div>
            <div className="col-lg-4 " style={{ fontSize: "30px" }}>
              <div className="col-lg-12 justify-content-around d-flex">
                <a
                  href=""
                  target={"_blank"}
                  className="text-decoration-none text-reset"
                >
                  <FaGithub />
                </a>

                <a
                  href=""
                  target={"_blank"}
                  className="text-decoration-none text-reset"
                >
                  <FaLinkedin />
                </a>
                <a
                  href=""
                  target={"_blank"}
                  className="text-decoration-none text-reset"
                >
                  <FaFacebook />
                </a>
                <a
                  href=""
                  target={"_blank"}
                  className="text-decoration-none text-reset"
                >
                  <FaTwitter />
                </a>
                <a
                  href=""
                  target={"_blank"}
                  className="text-decoration-none text-reset"
                >
                  <FaInstagram />
                </a>
              </div>
              <div
                className="col-lg-12 justify-content-around d-flex mt-4"
                style={{ fontSize: "18px" }}
              >
                ©AuditManagement: All rights reserved
              </div>
            </div>
            <div className="col-lg-4 justify-content-end d-flex">
              <div>
                <div>About Us</div>
                <div>Contact Us</div>
                <div>Careers</div>
                <div>Privacy Policy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
