import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import './index.css'
import { store } from "./store/store";


import { IonApp } from '@ionic/react';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <IonApp> {/* <- Wrap your app in Ionic */}
        <App />
      </IonApp>
    </Provider>
  </React.StrictMode>
);
