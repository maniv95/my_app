var port = process.env.PORT || 8081;
const db = require('mysql')
const express = require('express')
var bodyParser = require("body-parser")
var app = express()

app.use(bodyParser.json({limit:"10mb"}));

app.use(bodyParser.urlencoded({limit:"10mb", extended:true, parameterLimit:500}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//DB Connection
var connection = db.createConnection({
  host     : 'localhost',
  user     : 'root',
  // password : 'secret',
  database : 'sampledb'
});
connection.connect(function(err) {
  try{
    if (!err) {
      console.log("DB Connected!");
    }
    else{
      console.log("DB Not Connected!");
    }
  }
  catch(err){
    console.log("DB Err!",err);
  }
  
});

//Register API
app.post('/register', async function(req,res){
	var Name=await req.body.Name;
	var Email=await req.body.Email;
	var Phone=await req.body.Phone;
	var Password=await req.body.Password;
  connection.query("SELECT * FROM users where email=?",[Email],function(err,check){
    if(!err){
      if(check.length>0){
        res.send({
          status:409,
          "success":"Account Already Exist With Same Email"
        })
      }
    }
    else{
      connection.query("INSERT INTO users(name,email,phone,password) VALUES(?,?,?,?)",[Name,Email,Phone,Password],function(err,result){
        if(!err){
            res.send({
              status :200,
              "success":"saved in db",
            })
            console.log("Data Saved in DB ",result);
        }
        else{
          console.log("Error:",err.code);  
          res.send({
            status: 400
          })
        }
      })
    }
  })
})

//Login API
app.post('/login',async function(req,res){
  var Email = await req.body.Email;
  var Password =  await req.body.Password;
  connection.query("SELECT * FROM users where email=?",[Email], function(err,result){
    console.log("DB Call",result)
    if(err){
      console.log("error ocurred",err);
        res.send({
            status: 400,
            "failed":"error ocurred"
        })
    }
    else if(result.length >0){
      var pwd = result[0].password
      if(pwd === Password){
        res.send({
          status: 200,
          "success":"Logged In"  
        });
      }
      else{
          res.send({
              status: 400,
              "failed":"Invalid Credentials"
          })
        }
    }
    else{
      res.send({
          status:204,
          "success":"Email does not exits"
      });
    }
  })
})

// Update API
app.put('/UpdateUser', async function(req,res){
  var Name = await req.body.Name;
  var Email = await req.body.Email;
  var Phone = await req.body.Phone;
  var Password = await req.body.Password;
  connection.query("UPDATE ")
})

//Query Users API
app.get('/getUsers',function(req,res){
  connection.query("SELECT * FROM users", function(err,result){
    if (!err){
      if(result.length > 0){
        res.send({
          status: 200,
          "success":"List Retrieved",
          result
        })
        console.log("Data From Server:",result)
      }
      else{
        res.send({
          status: 300,
          "failed":"error in getting list"
        })
      }
    }
    else{
      res.send({
        status: 400,
        "error":"error !"
      })
      console.log("error",err)
    }
  })
  connection.end()
})

//Server 
app.listen(port,() => {
  console.log("Backend Server Started at",port);
})