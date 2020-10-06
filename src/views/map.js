/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Control from "react-leaflet-control";
import ReactDOM from "react-dom";

import {
  Map,
  Marker,
  Popup,
  TileLayer,
  LayersControl,
  LayerGroup,
  FeatureGroup,
  Rectangle,
  Polyline,
  ZoomControl,
  Polygon,
  Circle,
} from "react-leaflet";

import { GoogleLayer } from "../../src/googleMap";
import { Icon } from "leaflet";
import * as providerData from "../data/ogun-service-providers.json";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import MapNavbar from "components/Navbars/MapNavbar";

// reactstrap components
import { Button, Col } from "reactstrap";

export const redIcon = new Icon({
  iconUrl: "/redIcon.svg",
  iconSize: [30, 30],
});

export const blueIcon = new Icon({
  iconUrl: "/blueIcon.svg",
  iconSize: [30, 30],
});
const rectangle = [
  [7.14042902000006, 4.82180452300003],
  [7.98750114400002, 6.04214954400004],
];

const key = process.env.REACT_APP_GOOGLE_KEY;
const terrain = "TERRAIN";
const road = "ROADMAP";

const { BaseLayer, Overlay } = LayersControl;

function IomMaps(props) {
  const [activeProvider, setActiveProvider] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <MapNavbar />
      <div className="wrapper">
        <div>
          <Map
            center={[6.998, 3.4737]}
            zoom={8.5}
            style={{
              height: "100vh",
            }}
          >
            <Control position="bottomright">
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.8)",
                  padding: " 6px 8px",
                  font: " 14px/16px Arial, Helvetica, sans-serif",
                  borderRadius: "5px",
                  boxShadow: "0 0 15px rgba(0,0,0,0.2)",
                }}
              >
                <row>
                  <p>
                    <span>
                      {" "}
                      <img src="./redIcon.svg" alt="logo" width="20px" />
                    </span>
                    &nbsp;Shelter
                  </p>
                </row>
                <row>
                  <p>
                    <span>
                      {" "}
                      <img src="./blueIcon.svg" alt="logo" width="20px" />
                    </span>
                    &nbsp;Multi-Service
                  </p>
                </row>
              </div>
            </Control>
            <ZoomControl position="bottomleft" />
            <LayersControl position="bottomleft">
              <BaseLayer name="OpenStreetMap.BlackAndWhite">
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                />
              </BaseLayer>
              <BaseLayer checked name="Google Maps Roads">
                <GoogleLayer googlekey={key} maptype={road} />
              </BaseLayer>
              <BaseLayer name="Google Maps Terrain">
                <GoogleLayer googlekey={key} maptype={terrain} />
              </BaseLayer>

              <Overlay checked name="Ogun">
                <FeatureGroup fillColor="blue" color="purple">
                  <Popup>Providers in Ogun</Popup>
                  {/* <Circle center={[45.4, -75.7]} radius={70000} /> */}

                  {/* <Circle
                    center={[45.4, -75.7]}
                    fillColor="red"
                    radius={45000}
                    stroke={false}
                  /> */}

                  {/* <FeatureGroup>
                    <Circle
                      center={[-75, 45]}
                      color="green"
                      fillColor="green"
                      radius={100}
                    />
                  </FeatureGroup> */}
                </FeatureGroup>
              </Overlay>
              {providerData.features.map((provider) =>
                provider.properties.SERVICE === "MULTI-SHELTER" ? (
                  <Overlay
                    checked
                    key={provider.properties.PROVIDER_ID}
                    name={provider.properties.NAME}
                  >
                    <Marker
                      key={provider.properties.PROVIDER_ID}
                      position={[
                        provider.geometry.coordinates[0],
                        provider.geometry.coordinates[1],
                      ]}
                      onClick={() => {
                        setActiveProvider(provider);
                      }}
                      icon={blueIcon}
                    />
                  </Overlay>
                ) : (
                  ""
                )
              )}

              {providerData.features.map((provider) =>
                provider.properties.SERVICE === "SHELTER" ? (
                  <Overlay
                    checked
                    key={provider.properties.PROVIDER_ID}
                    name={provider.properties.NAME}
                  >
                    <Marker
                      key={provider.properties.PROVIDER_ID}
                      position={[
                        provider.geometry.coordinates[0],
                        provider.geometry.coordinates[1],
                      ]}
                      onClick={() => {
                        setActiveProvider(provider);
                      }}
                      icon={redIcon}
                    />
                  </Overlay>
                ) : (
                  ""
                )
              )}

              {activeProvider && (
                <Popup
                  position={[
                    activeProvider.geometry.coordinates[1],
                    activeProvider.geometry.coordinates[0],
                  ]}
                  onClose={() => {
                    setActiveProvider(null);
                  }}
                >
                  <div>
                    <h2>{activeProvider.properties.NAME}</h2>

                    <p>ADDRESS</p>
                    <p>{activeProvider.properties.ADDRESS}</p>
                    <Button
                      href={activeProvider.properties.DIRECTION}
                      target="_blank"
                      color="info"
                      style={{ color: "white" }}
                    >
                      <i className="now-ui-icons location_pin"></i>
                      Get Direction
                    </Button>
                    <p>PHONE_No: {activeProvider.properties.PHONE}</p>
                    <p>EMAIL: {activeProvider.properties.EMAIL}</p>
                    <p>WEBSITE: {activeProvider.properties.WEBSITE} </p>
                  </div>
                </Popup>
              )}

              {/* <Overlay checked name="Ogun State">
                <LayerGroup>
                  <Circle center={[7, 3.35]} fillColor="blue" radius={40000} />
                   <Circle
                    center={[6.9, 3.4]}
                    fillColor="red"
                    radius={4000}
                    stroke={false}
                  />

                   <LayerGroup>
                    <Circle
                      center={[6.9, 3.4]}
                      color="green"
                      fillColor="green"
                      radius={10}
                    />
                  </LayerGroup> 
                </LayerGroup>
              </Overlay> */}
            </LayersControl>
          </Map>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default IomMaps;
