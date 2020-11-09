import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";
// pages for this kit
import Index from "views/Index.js";
import Provider from "views/Provider";
import OgunMap from "views/ogunMap";
import LagosMap from "views/lagosMap";
import EdoMap from "views/edoMap";
import DeltaMap from "views/deltaMap";
import AbujaMap from "views/abujaMap";
// import LayersControlExample from "views/test";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/index" render={(props) => <Index {...props} />} />
        <Route
          path="/provider-page/:id"
          render={(props) => <Provider {...props} />}
        />
        <Route path="/lagos-map" render={(props) => <LagosMap {...props} />} />
        <Route path="/edo-map" render={(props) => <EdoMap {...props} />} />
        <Route path="/delta-map" render={(props) => <DeltaMap {...props} />} />
        <Route path="/abuja-map" render={(props) => <AbujaMap {...props} />} />
        {/* <Route
          path="/test"
          render={(props) => <LayersControlExample {...props} />}
        /> */}
        <Route path="/ogun-map" render={(props) => <OgunMap {...props} />} />
        <Redirect to="/index" />
        <Redirect from="/" to="/index" />
      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
