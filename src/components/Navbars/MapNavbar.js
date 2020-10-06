import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function MapNavbar() {
  const [navbarColor] = React.useState("info");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  useEffect(() => {
    // const updateNavbarColor = () => {
    //   // if (
    //   //   document.documentElement.scrollTop > 399 ||
    //   //   document.body.scrollTop > 399
    //   // ) {
    //   //   setNavbarColor("");
    //   // } else if (
    //   //   document.documentElement.scrollTop < 400 ||
    //   //   document.body.scrollTop < 400
    //   // ) {
    //   //   setNavbarColor("info");
    //   // }
    // };
    // window.addEventListener("scroll", updateNavbarColor);
    // return function cleanup() {
    //   window.removeEventListener("scroll", updateNavbarColor);
    // };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} color="info" expand="lg">
      
        <Container>
          <div className="navbar-translate">
            <NavbarBrand href="/index" id="navbar-brand">
              Home
            </NavbarBrand>

            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            
            <Nav navbar>
            <UncontrolledDropdown nav>
                <DropdownToggle caret color="default" href="#" nav>
                  <i className="now-ui-icons location_map-big"></i>
                  <p>MAPS</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/ogun-map" tag={Link}>
                    <i className="now-ui-icons location_pin"></i>
                    Ogun
                  </DropdownItem>
                 
                </DropdownMenu>
              </UncontrolledDropdown>
             
              <NavItem>
                <NavLink href="/faq">How to use</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" target="_blank" id="twitter-tooltip">
                  <i className="fab fa-twitter"></i>
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
                <UncontrolledTooltip target="#twitter-tooltip">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink href="#" target="_blank" id="facebook-tooltip">
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink href="#" target="_blank" id="instagram-tooltip">
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Follow us on Instagram
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MapNavbar;
