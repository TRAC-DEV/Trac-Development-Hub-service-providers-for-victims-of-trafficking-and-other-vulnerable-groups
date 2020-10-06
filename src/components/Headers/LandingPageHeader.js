import React, { useEffect, createRef } from "react";
// reactstrap components
import { Container } from "reactstrap";

// core components

function LandingPageHeader() {
  let pageHeader = createRef();

  useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        // let windowScrollTop = window.pageYOffset / 3;
        // pageHeader.current.style.transform =
        //   "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/Map-background.png") + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div
            className="photo-container"
            style={{
              width: "200px",
              backgroundColor: "white",
            }}
          >
            <img alt="..." src={require("assets/img/IOM_Logo.png")}></img>
          </div>
          <h2
            style={{
              marginTop: "10px",
            }}
          >
            Service providers for victims of trafficking and other vulnerable
            groups
          </h2>
        </Container>
      </div>
    </>
  );
}

export default LandingPageHeader;
