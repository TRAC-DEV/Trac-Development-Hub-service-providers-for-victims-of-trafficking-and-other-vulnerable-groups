/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Control from "react-leaflet-control";

import {
  Map,
  Marker,
  Popup,
  TileLayer,
  LayersControl,
  FeatureGroup,
  ZoomControl,
  Polygon,
} from "react-leaflet";

import { GoogleLayer } from "../../src/googleMap";
import { Icon } from "leaflet";
import * as providerData from "../data/ogun-service-providers.json";
import * as ogunBorder from "../data/ogun-highlight.json";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import MapNavbar from "components/Navbars/MapNavbar";

// reactstrap components
import { Button } from "reactstrap";

export const PEIcon = new Icon({
  iconUrl: "/PE-Icon.svg",
  iconSize: [100, 100],
});

export const PEFIcon = new Icon({
  iconUrl: "/PEF-Icon.svg",
  iconSize: [100, 100],
});

export const PFIcon = new Icon({
  iconUrl: "/PF-Icon.svg",
  iconSize: [100, 100],
});

export const SHEFIcon = new Icon({
  iconUrl: "/SHEF-Icon.svg",
  iconSize: [100, 100],
});

export const SHPEIcon = new Icon({
  iconUrl: "/SHPE-Icon.svg",
  iconSize: [100, 100],
});

export const SPLEFIcon = new Icon({
  iconUrl: "/SPLEF-Icon.svg",
  iconSize: [100, 100],
});

const polyLines = ogunBorder.lines.map((poly) => {
  return poly.reverse();
});

const key = process.env.REACT_APP_GOOGLE_KEY;
const terrain = "TERRAIN";
const road = "ROADMAP";

const { BaseLayer, Overlay } = LayersControl;

function OgunMap(props) {
  const [activeProvider, setActiveProvider] = useState(null);
  const [legend, setLegend] = useState(
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.8)",
        padding: " 6px 8px",
        font: " 14px/16px Arial, Helvetica, sans-serif",
        borderRadius: "5px",
        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
      }}
    >
      <h6>Legend</h6>
      <row>
        <p>
          <span>
            {" "}
            <img src="./familyTracing-Icon.svg" alt="icon" width="30px" />
          </span>
          &nbsp;Family tracing
        </p>
      </row>
      <row>
        <p>
          <span>
            {" "}
            <img src="./Shelter-Icon.svg" alt="icon" width="30px" />
          </span>
          &nbsp;Shelter
        </p>
      </row>
      <row>
        <p>
          <span>
            {" "}
            <img src="./healthCare-Icon.svg" alt="icon" width="30px" />
          </span>
          &nbsp;Health Care
        </p>
      </row>
      <row>
        <p>
          <span>
            {" "}
            <img src="./psychosocialSupport-Icon.svg" alt="icon" width="30px" />
          </span>
          &nbsp;psychosocial support
        </p>
      </row>
      <row>
        <p>
          <span>
            {" "}
            <img src="./Legal-Icon.svg" alt="icon" width="30px" />
          </span>
          &nbsp;Legal
        </p>
      </row>
      <row>
        <p>
          <span>
            {" "}
            <img src="./empowerment-Icon.svg" alt="icon" width="30px" />
          </span>
          &nbsp;Empowerment
        </p>
      </row>
    </div>
  );

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
            <Control position="topright">
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.8)",
                  padding: " 6px 8px",
                  font: " 14px/16px Arial, Helvetica, sans-serif",
                  borderRadius: "5px",
                  boxShadow: "0 0 15px rgba(0,0,0,0.2)",
                  marginTop: "60px",
                }}
              >
                <row>
                  <h5> Service Provider Locations</h5>
                  <h6>Ogun State</h6>
                </row>
              </div>
            </Control>
            <Control position="bottomleft">
              <button
                aria-label="Close"
                className="close"
                type="button"
                onClick={() => setLegend(null)}
              >
                <span aria-hidden={true}>×</span>
              </button>
              {legend}
            </Control>
            <ZoomControl position="bottomright" />
            <LayersControl position="bottomright">
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

              <Overlay checked name="Highlight Ogun State">
                <FeatureGroup fillColor="blue" color="purple">
                  <Popup>Providers in Ogun</Popup>
                  <Polygon positions={polyLines} />
                </FeatureGroup>
              </Overlay>
              {providerData.features.map((provider) =>
                provider.properties.SERVICE.length === 2 &&
                provider.properties.SERVICE.includes("Empowerment") ? (
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
                      icon={PEIcon}
                    />
                  </Overlay>
                ) : (
                  ""
                )
              )}

              {providerData.features.map((provider) =>
                provider.properties.SERVICE.length === 3 ? (
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
                      icon={PEFIcon}
                    />
                  </Overlay>
                ) : (
                  ""
                )
              )}
              {providerData.features.map((provider) =>
                provider.properties.SERVICE.length === 2 &&
                provider.properties.SERVICE.includes("Family tracing") ? (
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
                      icon={PFIcon}
                    />
                  </Overlay>
                ) : (
                  ""
                )
              )}

              {providerData.features.map((provider) =>
                provider.properties.SERVICE.length === 4 &&
                provider.properties.SERVICE.includes("Family tracing") ? (
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
                      icon={SHEFIcon}
                    />
                  </Overlay>
                ) : (
                  ""
                )
              )}

              {providerData.features.map((provider) =>
                provider.properties.SERVICE.length === 4 &&
                provider.properties.SERVICE.includes("Psychosocial support") ? (
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
                      icon={SHPEIcon}
                    />
                  </Overlay>
                ) : (
                  ""
                )
              )}
              {providerData.features.map((provider) =>
                provider.properties.SERVICE.length === 5 ? (
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
                      icon={SPLEFIcon}
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
            </LayersControl>
          </Map>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default OgunMap;
