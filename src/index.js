import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import "./serviceWorker";

const routing = (
  <Router>
    <Route path="/" component={App} />
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
