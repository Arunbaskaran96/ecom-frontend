import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { register } from "swiper/element/bundle";
import { Provider } from "react-redux";
import store from "./redux/store";
register();

const root = document.getElementById("root");

createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
