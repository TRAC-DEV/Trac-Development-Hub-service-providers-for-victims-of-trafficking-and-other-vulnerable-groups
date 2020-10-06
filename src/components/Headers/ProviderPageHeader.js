import React, { useEffect, useState, createRef } from "react";
import { useParams } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
import * as providerData from "../../data/service-providers.json";

// core components

function ProviderPageHeader() {
  let providerName = new useParams({}).id;
  const [providers] = useState(providerData.features);
  const [currentProvider, setCurrentProvider] = useState({});
  let pageHeader = createRef();

  useEffect(() => {
    const activeProvider = providers.filter(function (provider) {
      return provider.properties.NAME === providerName;
    });
    setCurrentProvider(activeProvider[0]);
  }, [providerName, providers]);
  const providerProperties = { ...currentProvider }.properties;
  const logo = { ...providerProperties }.LOGO;
  const service = { ...providerProperties }.SERVICE_LIST;
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
            backgroundImage: "",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          {logo === null ? "" : <img src={logo} alt="logo" width="150px" />}

          <h1 className="title">{providerName}</h1>
          <p className="category" style={{ color: "#1E90FF" }}>
            SERVICEs OFFERED: <span style={{ color: "white" }}>{service}</span>
          </p>
        </Container>
      </div>
    </>
  );
}

export default ProviderPageHeader;
