import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import swal from 'sweetalert';
import {Button,Table} from 'reactstrap';

class App extends Component {
  constructor(props){
      super(props)
      this.state = {
          name:'test1',
          email:'test1@gmail.com',
          phone:'9848022338',
          password:'password'
      }
    this.onName = this.onName.bind(this)
    this.onEmail = this.onEmail.bind(this)
    this.onPhone = this.onPhone.bind(this)
    this.onPassword = this.onPassword.bind(this)
  }
  onName(a){
    this.setState({name: a.target.value})
  }
  onEmail(b){
    this.setState({email: b.target.value})
  }
  onPhone(c){
    this.setState({phone: c.target.value})
  }
  onPassword(d){
    this.setState({password: d.target.value})
  }
  onRegister = () => {
    var formBody = [];
    formBody.push("Name="+encodeURIComponent(this.state.name));
    formBody.push("Email="+encodeURIComponent(this.state.email));
    formBody.push("Phone="+encodeURIComponent(this.state.phone));
    formBody.push("Password="+encodeURIComponent(this.state.password));
    formBody = formBody.join("&")
    console.log("Data from UI:",formBody)
    fetch('http://localhost:8081/register',{
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Accept-Charset': 'utf-8'
                },
                body: formBody
    })
    .then((response) => response.json())
    .then((status) => {
      if (status.status === 200) { 
        swal("Registered Successfully"," ", "success") 
      }
      else if(status.status === 400){
        swal("Bad Request", "Cannot Establish Connection", "error")
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
        <h2><b>Register User</b></h2>
        <div>
        <label>Name</label><br/>
        <input type="text" value={this.state.name} onChange={this.onName}/>
        </div>
        <br/>
        <div>
        <label>Email</label><br/>
        <input type="email" value={this.state.email} onChange={this.onEmail}/>
        </div>
        <br/>
        <div>
        <label>Phone</label><br/>
        <input type="tel" value={this.state.phone} onChange={this.onPhone}/>
        </div>
        <br/>
        <div>
        <label>Password</label><br/>
        <input type="password" value={this.state.password} onChange={this.onPassword}/>
        </div>
        <br/>
        <div>
        <Button onClick={this.onRegister}>Submit</Button>
        </div>
        </header>
      </div>
    );
  }
}
export default App;
