import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import client from "./shared/graphql/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>
);
