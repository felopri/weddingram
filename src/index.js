import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';
import './index.css';

firebase.initializeApp({
  apiKey: "AIzaSyDxz6sVD0ISOUmB0i98HIpzzW8j8H8X_N0",
  authDomain: "weddingram-35ee8.firebaseapp.com",
  databaseURL: "https://weddingram-35ee8.firebaseio.com",
  storageBucket: "weddingram-35ee8.appspot.com",
  messagingSenderId: "197137961452"
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
