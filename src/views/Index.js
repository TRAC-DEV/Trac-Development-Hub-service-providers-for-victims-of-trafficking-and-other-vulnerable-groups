import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import {
  Form,
  Input,
  Container,
  Label,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardText,
  CardFooter,
  Button,
  Row,
  Col,
} from "reactstrap";

// core components
import MappingNavbar from "components/Navbars/MappingNavbar";
import LandingPageHeader from "components/Headers/LandingPageHeader";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import Paginations from "components/Pagination";
import * as providerData from "../data/service-providers.json";

function Index(props) {
  let history = useHistory();

  const [providers, setProviders] = useState(providerData.features);
  const [filterState, setFilterState] = useState({ STATE: "", SERVICE: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const [providersPerPage] = useState(5);

  const indexOfLastProvider = currentPage * providersPerPage;
  const indexOfFirstProvider = indexOfLastProvider - providersPerPage;
  const currentProviders = providers.slice(
    indexOfFirstProvider,
    indexOfLastProvider
  );

  //Filter
  const onChange = (e) => {
    setFilterState({
      ...filterState,
      [e.target.name]: e.target.value,
    });
  };

  const filterProviders = (e) => {
    e.preventDefault();

    if (filterState.STATE === "" && filterState.SERVICE === "") {
      setProviders(providerData.features);
    } else {
      if (filterState.STATE !== "" && filterState.SERVICE === "") {
        const filteredData = providerData.features.filter((providers) => {
          return providers.properties.STATE.includes(filterState.STATE);
        });
        setProviders(filteredData);
      }

      if (filterState.STATE === "" && filterState.SERVICE !== "") {
        const filteredData = providerData.features.filter((providers) => {
          return providers.properties.SERVICE.includes(filterState.SERVICE);
        });
        setProviders(filteredData);
      }
      if ((filterState.STATE !== "") & (filterState.SERVICE !== "")) {
        const filteredData = providerData.features.filter((providers) => {
          return (
            providers.properties.STATE.includes(filterState.STATE) &&
            providers.properties.SERVICE.includes(filterState.SERVICE)
          );
        });

        setProviders(filteredData);
      }
    }
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <LandingPageHeader />
        <div className="section">
          <Container>
            <div className="button-container">
              <Form onSubmit={filterProviders}>
                <Row
                  //className="form-row justify-content-center"
                  style={{
                    backgroundColor: "#43a2ca",
                    padding: "20px",
                    margin: "10px",
                  }}
                >
                  <Col md="4">
                    <Label style={{ color: "white" }}>
                      Filter by State
                      <Input
                        name="STATE"
                        id="STATE"
                        value={filterState.STATE}
                        onChange={onChange}
                        type="select"
                      >
                        <option value="">All</option>
                        <option value="Ogun State.">Ogun </option>
                        <option value="Lagos State.">Lagos</option>
                        <option value="Edo State.">Edo</option>
                        <option value="Delta State.">Delta</option>
                        <option value="FCT">Abuja</option>
                      </Input>
                    </Label>
                  </Col>
                  <Col md="4">
                    <Label style={{ color: "white" }}>
                      Filter by Service
                      <Input
                        name="SERVICE"
                        id="SERVICE"
                        value={filterState.SERVICE}
                        onChange={onChange}
                        type="select"
                      >
                        <option value="">All</option>
                        <option value="Psychosocial support">
                          Psychosocial support
                        </option>
                        <option value="Shelter">Shelter</option>
                        <option value="Empowerment">Empowerment</option>
                        <option value="Health">Health</option>
                        <option value="Legal">Legal</option>
                        <option value="Family tracing">Family tracing</option>
                      </Input>
                    </Label>
                  </Col>

                  <Col md="4">
                    <Button type="submit">Submit</Button>
                  </Col>
                </Row>
              </Form>
            </div>
            <h3 className="title">Service Providers</h3>
            {currentProviders.map((provider) => {
              return (
                <Card className="text-center" key={provider.properties.PARK_ID}>
                  {provider.properties.LOGO === null ? (
                    ""
                  ) : (
                    <div style={{ marginTop: "20px" }}>
                      <img
                        src={provider.properties.LOGO}
                        alt="logo"
                        width="150px"
                      />
                    </div>
                  )}
                  <CardHeader className="mt-2">
                    <CardTitle tag="h4">{provider.properties.NAME}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row
                      style={{
                        display: "grid",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CardText>{provider.properties.ADDRESS}</CardText>
                    </Row>
                    <Button
                      color="primary"
                      href="/provider-page"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push(
                          "/provider-page/" + provider.properties.NAME
                        );
                      }}
                      style={{ backgroundColor: "#43a2ca" }}
                    >
                      Details
                    </Button>
                  </CardBody>
                  <CardFooter className="text-muted mb-2">
                    UPDATE: 2 days ago
                  </CardFooter>
                </Card>
              );
            })}
            <div
              style={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {currentProviders.length === 0 && (
                <span>No records found to display!</span>
              )}
            </div>
          </Container>
          <Paginations
            providersPerPage={providersPerPage}
            totalProviders={providers.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default Index;
