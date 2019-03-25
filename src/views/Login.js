import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import swal from 'sweetalert';
import {Button,Table} from 'reactstrap';

class App extends Component {
  constructor(props){
      super(props)
      this.state = {
          email1:'test@gmail.com',
          password1:'12345678'
      }
    this.onName = this.onName.bind(this)
    this.onEmail = this.onEmail.bind(this)
    this.onPhone = this.onPhone.bind(this)
    this.onPassword = this.onPassword.bind(this)
    this.onEmail1 = this.onEmail1.bind(this)
    this.onPassword1 = this.onPassword1.bind(this)
  }
  onEmail1(e){
    this.setState({email1: e.target.value})
  }
  onPassword1(f){
    this.setState({password1: f.target.value})
  }
  onLogin = () => {
    var formBody = [];
    formBody.push("Email="+encodeURIComponent(this.state.email1));
    formBody.push("Password="+encodeURIComponent(this.state.password1));
    formBody = formBody.join("&")
    fetch('http://localhost:8081/login',{
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Accept-Charset': 'utf-8'
                },
                body: formBody
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      if (result.status === 200) { 
        swal("Logged In Successfully"," ", "success") 
      }
      else if(result.status === 400){
        swal("Error In Credentials", "Please Verify Again", "error")
      } 
      else if(result.status === 204){
        swal("Email does not exits", "Please Verify Again", "error")
      }        
    })
    .catch((err) => {
        console.log(err);
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div>
        <h2>Login</h2>
        <br/>
        <div>
        <label>Email</label><br/>
        <input type="email" value={this.state.email1} onChange={this.onEmail1}/>
        </div>
        <br/>
        <div>
        <label>Password</label><br/>
        <input type="password" value={this.state.password1} onChange={this.onPassword1}/>
        </div>
        <br/>
        <Button onClick = {this.onLogin}>Login</Button>
        </div>
        <br/>
        </header>
      </div>
    );
  }
}
export default App;
