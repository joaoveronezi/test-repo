import React from 'react';
import { Provider } from "react-redux";
import configureStore from "./store";
import Routes from './routes';
import "./styles/styles.css";


const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

export default App;
