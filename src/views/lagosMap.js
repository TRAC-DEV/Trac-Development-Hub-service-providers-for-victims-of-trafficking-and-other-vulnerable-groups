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
import * as providerData from "../data/lagos-service-providers.json";
import * as lagosBorder from "../data/lagos-highlight.json";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import MapNavbar from "components/Navbars/MapNavbar";

// reactstrap components
import { Button } from "reactstrap";

export const MIcon = new Icon({
  iconUrl: "/M-Icon.svg",
  iconSize: [30, 30],
});

export const EIcon = new Icon({
  iconUrl: "/E-Icon.svg",
  iconSize: [30, 30],
});

export const LIcon = new Icon({
  iconUrl: "/L-Icon.svg",
  iconSize: [30, 30],
});

export const PIcon = new Icon({
  iconUrl: "/P-Icon.svg",
  iconSize: [30, 30],
});

export const SIcon = new Icon({
  iconUrl: "/S-Icon.svg",
  iconSize: [30, 30],
});

export const HIcon = new Icon({
  iconUrl: "/H-Icon.svg",
  iconSize: [30, 30],
});

export const FIcon = new Icon({
  iconUrl: "/F-Icon.svg",
  iconSize: [30, 30],
});
const polyLines = lagosBorder.lines.map((poly) => {
  return poly.reverse();
});

const key = process.env.REACT_APP_GOOGLE_KEY;
const terrain = "TERRAIN";
const road = "ROADMAP";

const { BaseLayer, Overlay } = LayersControl;

function LagosMap(props) {
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
            <img src="./Family legend-icon.svg" alt="icon" width="30px" />
          </span>
          &nbsp;Family tracing
        </p>
      </row>
      <row>
        <p>
          <span>
            {" "}
            <img src="./Shelter legend-icon.svg" alt="icon" width="30px" />
          </span>
          &nbsp;Shelter
        </p>
      </row>
      <row>
        <p>
          <span>
            {" "}
            <img src="./Health legend-icon.svg" alt="icon" width="30px" />
          </span>
          &nbsp;Health Care
        </p>
      </row>
      <row>
        <p>
          <span>
            {" "}
            <img src="./Psychosocial legend-icon.svg" alt="icon" width="30px" />
          </span>
          &nbsp;psychosocial support
        </p>
      </row>
      <row>
        <p>
          <span>
            {" "}
            <img src="./Legal legend-icon.svg" alt="icon" width="30px" />
          </span>
          &nbsp;Legal
        </p>
      </row>
      <row>
        <p>
          <span>
            {" "}
            <img src="./Empowerment legend-icon.svg" alt="icon" width="30px" />
          </span>
          &nbsp;Empowerment
        </p>
      </row>
      <row>
        <p>
          <span>
            {" "}
            <img src="./Multi legend-icon.svg" alt="icon" width="30px" />
          </span>
          &nbsp;Multi Sectorial
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
            center={[6.45407, 3.39467]}
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
                  <h6>Lagos State</h6>
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
                  <Popup>Providers in Lagos</Popup>
                  <Polygon positions={polyLines} />
                </FeatureGroup>
              </Overlay>

              {providerData.features.map((provider) =>
                provider.properties.SERVICE.length === 1 &&
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
                      icon={EIcon}
                    />
                  </Overlay>
                ) : (
                  ""
                )
              )}

              {providerData.features.map((provider) =>
                provider.properties.SERVICE.length === 1 &&
                provider.properties.SERVICE.includes("Health") ? (
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
                      icon={HIcon}
                    />
                  </Overlay>
                ) : (
                  ""
                )
              )}

              {providerData.features.map((provider) =>
                provider.properties.SERVICE.length === 1 &&
                provider.properties.SERVICE.includes(
                  "Psycho-social support"
                ) ? (
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
                      icon={PIcon}
                    />
                  </Overlay>
                ) : (
                  ""
                )
              )}

              {providerData.features.map((provider) =>
                provider.properties.SERVICE.length === 1 &&
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
                      icon={FIcon}
                    />
                  </Overlay>
                ) : (
                  ""
                )
              )}

              {providerData.features.map((provider) =>
                provider.properties.SERVICE.length === 1 &&
                provider.properties.SERVICE.includes("Shelter") ? (
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
                      icon={SIcon}
                    />
                  </Overlay>
                ) : (
                  ""
                )
              )}

              {providerData.features.map((provider) =>
                provider.properties.SERVICE.length === 1 &&
                provider.properties.SERVICE.includes("Legal") ? (
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
                      icon={LIcon}
                    />
                  </Overlay>
                ) : (
                  ""
                )
              )}

              {providerData.features.map((provider) =>
                provider.properties.SERVICE.length > 1 ? (
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
                      icon={MIcon}
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

export default LagosMap;
