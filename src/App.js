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
          password:'password',
          getdata:'',
          email1:'test@gmail.com',
          password1:'qwertyuiop'
      }
    this.onName = this.onName.bind(this)
    this.onEmail = this.onEmail.bind(this)
    this.onPhone = this.onPhone.bind(this)
    this.onPassword = this.onPassword.bind(this)
    this.onEmail1 = this.onEmail1.bind(this)
    this.onPassword1 = this.onPassword1.bind(this)
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
  onEmail1(e){
    this.setState({email1: e.target.value})
  }
  onPassword1(f){
    this.setState({password1: f.target.value})
  }
  onQuery = () => {
    fetch('http://localhost:8081/getUsers',{
      method:'get'
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.status ===200) {
        if(result.result !== ''){
          var json = JSON.stringify(result.result)
          console.log("data from frontend:",json)
          this.setState({getdata: json})
          swal("Data Retrieved Successfully","", "success") 
        }
        else if(result.status === 400){
         swal("Bad Request", "Cannot Establish Connection", "error")
        }   
      }
    })     
    .catch((err) => {
        console.log(err);
    });
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
    .then((result) => {
      if (result.status === 200) { 
        swal("Registered Successfully"," ", "success")
      }
      else if(result.status === 409){
        swal("User Already Exists", "Try To Login", "error")
      } 
      else if(result.status === 400){
        swal("Bad Request", "Cannot Establish Connection", "error")
      }        
    })
    .catch((err) => {
        console.log(err);
    });
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
        <br/>
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
        <h2>List Users</h2>
        <br/>
        <Table border="1" width="80%">
        <tbody>
        <tr>
        <td><Button onClick={this.onQuery}>List Users From DB</Button></td>
        </tr>
        <tr>
        <td>{this.state.getdata}</td>
        </tr>
        </tbody>
        </Table>
        <br/>
        </header>
      </div>
    );
  }
}
export default App;
