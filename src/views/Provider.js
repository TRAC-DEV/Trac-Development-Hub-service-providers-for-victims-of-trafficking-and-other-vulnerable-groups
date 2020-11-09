import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// reactstrap components
import {
  Container,
  Col,
  Row,
  Button,
  UncontrolledTooltip,
  Badge,
} from "reactstrap";

// core components

import ProviderPageHeader from "components/Headers/ProviderPageHeader";
import MappingNavbar from "components/Navbars/MappingNavbar";
import * as providerData from "../data/service-providers.json";
import DefaultFooter from "components/Footers/DefaultFooter.js";

function Provider(props) {
  let providerName = new useParams({}).id;
  const [providers] = useState(providerData.features);
  const [currentProvider, setCurrentProvider] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const activeProvider = providers.filter(function (provider) {
      return provider.properties.NAME === providerName;
    });
    setCurrentProvider(activeProvider[0]);
  }, [providerName, providers]);

  const providerProperties = { ...currentProvider }.properties;
  const state = { ...providerProperties }.STATE;

  const mapView = (e) => {
    e.preventDefault();
    if (state === "Ogun State.") {
      props.history.push("/ogun-map");
    }
    if (state === "Lagos State.") {
      props.history.push("/lagos-map");
    }

    if (state === "Edo State.") {
      props.history.push("/edo-map");
    }

    if (state === "Delta State.") {
      props.history.push("/delta-map");
    }

    if (state === "FCT.") {
      props.history.push("/abuja-map");
    }
  };

  useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  return (
    <>
      <MappingNavbar />
      <div className="wrapper">
        <ProviderPageHeader />
        <div className="section">
          <Container>
            <div
              style={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></div>
            <div className="button-container">
              <Button className="btn-round" color="info" size="lg">
                Social Media
              </Button>
              <Button
                className="btn-round btn-icon"
                color="default"
                id="tooltip515203352"
                size="md"
                href={{ ...providerProperties }.TWITTER}
                target="_blank"
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip515203352">
                Twitter Page
              </UncontrolledTooltip>
              <Button
                className="btn-round btn-icon"
                color="default"
                id="tooltip515203354"
                size="md"
                href={{ ...providerProperties }.FACEBOOK}
                target="_blank"
              >
                <i className="fab fa-facebook"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip515203354">
                Facebook Page
              </UncontrolledTooltip>
              <Button
                className="btn-round btn-icon"
                color="default"
                id="tooltip340339239"
                size="md"
                href={{ ...providerProperties }.INSTAGRAM}
                target="_blank"
              >
                <i className="fab fa-instagram"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip340339239">
                Instagram Page
              </UncontrolledTooltip>
            </div>
            <Row style={{ marginTop: "30px" }}>
              <Col md="6">
                <div style={{ border: "5px solid #696969" }}>
                  <img src={{ ...providerProperties }.MAP} alt="logo" />
                </div>
              </Col>
              <Col md="6">
                <Row
                  style={{
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                >
                  <h6>PHONE NUMBER</h6>
                  <p>{{ ...providerProperties }.PHONE}</p>
                  <h6>EMAIL ADDRESS</h6>
                  <p>{{ ...providerProperties }.EMAIL}</p>
                  <h6>WEBSITE</h6>
                  <p>{{ ...providerProperties }.WEBSITE}</p>

                  <h6>OFFICE ADDRESS</h6>
                  <p>{{ ...providerProperties }.ADDRESS}</p>
                  <h6>STATE</h6>
                  <p>{{ ...providerProperties }.STATE}</p>
                  <Badge
                    href="/#"
                    color="default"
                    onClick={mapView}
                    style={{ width: "100px" }}
                  >
                    View on map
                  </Badge>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default Provider;
