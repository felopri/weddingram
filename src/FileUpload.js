import React, { Component } from 'react';
import firebase from 'firebase';
class FileUpload extends Component {
	constructor () {
		super();
		this.state = {
			uploadValue: 0,
			picture: null
		};
		this.handleUpload = this.handleUpload.bind(this);
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
			this.setState({
				uploadValue : 100,
				picture: tasks.snapshot.downloadURL
			});
		});
	}
	render () {
		return (
			<div>
				<progress value={this.state.uploadValue} max='100'>
					{this.state.uploadValue} %
				</progress>
				<br/>
				<input type="file" onChange={this.handleUpload}/>
				<br/>
				<img width="320" src={this.state.picture} alt=""/>
			</div>
		)
	}
}
export default FileUpload;
