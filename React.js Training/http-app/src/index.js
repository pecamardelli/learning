import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import * as Sentry from "@sentry/react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

Sentry.init({ dsn: "https://cec649572c73405e91812dde55bfb353@o444219.ingest.sentry.io/5418868" });

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
