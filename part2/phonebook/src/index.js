import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import service from "./services/util.js";

const persons = service.getAll();

ReactDOM.render(<App persons={persons} />, document.getElementById("root"));
