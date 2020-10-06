/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <nav>
            <ul>
              <li>
                <a href="/index">Home</a>
              </li>
            
              <li>
                <a href="/faq">FAQ</a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, Designed by{" "}
            <a href="https://tracdevelopmenthub.com" target="_blank">
              TRAC
            </a>
            . Coded by{" "}
            <a href="https://tracdevelopmenthub.com" target="_blank">
              TRAC
            </a>
            .
          </div>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
