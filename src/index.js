import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";


//Import bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

//Import hooks
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";

//Import deployment req
import {disableReactDevTools} from "@fvilers/disable-react-devtools"

if(process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


