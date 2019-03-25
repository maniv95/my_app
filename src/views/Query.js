import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import swal from 'sweetalert';
import {Button,Table} from 'reactstrap';

class App extends Component {
  constructor(props){
      super(props)
      this.state = {
          getdata:'',
      }
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h2>List Users</h2>
        <div>
        <Button onClick={this.onQuery}>Query</Button>
        </div>
        <br/>
        <Table border="1" width="100%">
        <td>{this.state.getdata}</td>
        </Table>
        </header>
      </div>
    );
  }
}
export default App;
