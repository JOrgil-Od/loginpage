import configureHrsStore from "./redux/store";
import { Provider } from "react-redux";
import "./assets/css/sass/main.scss";
import "./assets/css/bootstrap/bootstrap.min.css";
import MainRoute from "./routes";
import React from "react";
function App() {
  return (
    <Provider store={configureHrsStore()}>
      <MainRoute />
    </Provider>
  );
}

export default App;
