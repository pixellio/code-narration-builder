import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import {thunk} from 'redux-thunk';

const store = configureStore({ 
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
 })

window.addEventListener("DOMContentLoaded", function (e) {
  console.log("ddddddddddd", document.getElementById('root'))
  const root = ReactDOM.createRoot(document.getElementById('root'));
  console.log({ root })
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );
});

reportWebVitals();
