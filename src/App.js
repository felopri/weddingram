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
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      })
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

  handleUpload (event) {
		const file = event.target.files[0];
		const storageRef = firebase.storage().ref(`/pictures/${file.name}`);
		const tasks = storageRef.put(file);

		tasks.on('state_changed', snapshot => {
			let percentage = (snapshot.bytesTransfered / snapshot.totalBytes)*100;
			this.setState({
				uploadValue : percentage
			})
		}, error => {
			console.error(error.message)
		}, () => {
			const record = {
        photoURL: this.state.user.photoURL,
        displayName: this.state.user.displayName,
        image: tasks.snapshot.downloadURL
      };
      const dbReference = firebase.database().ref('pictures');
      const newPicture = dbReference.push();
      newPicture.set(record);
		});
	}

  renderLoginButton(){
    if(this.state.user){
      return (
        <div>
          <figCaption className="App-card-footer">
            <img className="App-card-avatar" alt={this.state.user.displayName}
              src={this.state.user.photoURL}></img>
            <span className="App-card-name">{this.state.user.displayName}</span>
            <button onClick={this.handleLogout}>Cerrar sesión</button>
          </figCaption>
          <FileUpload onUpload={this.handleUpload}/>
          {
            this.state.pictures.map(picture=>(
                <div className="App-card">
                  <figure className="App-card-image">
                    <img alt="description" src={picture.image}></img>
                    <figCaption className="App-card-footer">
                      <img className="App-card-avatar" alt={picture.displayName} src={picture.photoURL}></img>
                      <span className="App-card-name">{picture.displayName}</span>
                    </figCaption>
                  </figure>
                </div>
            )).reverse()
          }
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
          <h1>Weddingram</h1>
        </div>
        <p className="App-intro">
          Bienvenidos a la boda de Moises y Mª Sol
        </p>
        { this.renderLoginButton() }
      </div>
    );
  }

}

export default App;
