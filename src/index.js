import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
// import { register } from "./registerServiceWorker";
import "./serviceWorker";

const routing = (
  <Router>
    <div>
      <Route path="/" component={App} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
//register();
