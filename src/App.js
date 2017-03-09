import React, { Component } from 'react';
import firebase from 'firebase';
import FileUpload from './FileUpload';
import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      pictures: [],
      user: null
    };
    //this.handleLogin = this.handleLogin.bind(this);
    //this.handleLogout = this.handleLogout.bind(this);
    this.renderLoginButton = this.renderLoginButton.bind(this);
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      //ES6 this.setState({ user: user });
    });
  }

  handleLogin () {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} ha iniciado sesión`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout () {
    firebase.auth().signOut()
    .then(result => console.log(`Te has desconectado`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  renderLoginButton(){
    if(this.state.user){
      return (
        <div>
          <p>Hola {this.state.user.displayName} </p>
          <img width="200px" src={this.state.user.photoURL} alt="AVATAR" />
          <br/>
          <button onClick={this.handleLogout}>Cerrar sesión con Google</button>
          <FileUpload />

        </div>
        )
    }else{
      return ( //Un solo elemento html
        <button onClick={this.handleLogin} className="App-btn">
          Iniciar sesión con Google
        </button>
        )
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to T3chFest</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        { this.renderLoginButton() }

      </div>
    );
  }

}

export default App;
