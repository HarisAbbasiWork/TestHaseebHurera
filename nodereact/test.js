const express = require('express')
var request =require('request')
const app = express()

const bcrypt = require("bcrypt")

var bodyParser = require('body-parser')
const saltRounds = 10;
const port = 5000
const vari = "haris"
var cors = require('cors')
var url = "mongodb://localhost:27017/Jobweb";
app.use(cors())
const mongoose = require('mongoose'); 
 
 mongoose.Promise = global.Promise;
 
 mongoose.connect('mongodb+srv://hariskiller:y2rh9zDeCxajtVkx@cluster0.9zwax.mongodb.net/myFirstDatabase?retryWrites=true/Jobweb', {
  dbName: 'Jobweb',
  user: 'hariskiller',
  pass: 'y2rh9zDeCxajtVkx',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
 }, function (err) {
 
  if (err) throw err;
  
  console.log('Successfully connected');
  
  });
 //mongoose.connect('mongodb://localhost:27017/Jobweb', function (err) {
 
  //  if (err) throw err;
  
  //  console.log('Successfully connected');
  
 //});
 var db=mongoose.connection;
 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
var ObjectId = require('mongodb').ObjectID;
var useremail="Login";
var name="Login";
var islogged="false";
app.post('/deleteJob', function(req,res){
  console.log("we deleting")
  console.log(req.body.id)
  db.collection('jobs').findOneAndDelete({'_id': ObjectId(req.body.id)}, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
  });
})
app.get('/getloggedemail',function(req,res){
  res.send({
    email:useremail,
    name:name,
    islogged:islogged
  })


})
app.post('/logout',function(req,res){
  email="Login"
  name="Login"
  islogged="false"
})
app.post('/getufavs',function(req,res){
  console.log(req.body.useremail)
  db.collection('details').findOne({"email": req.body.useremail}, function(err, creden) {
    console.log("creden Found",creden.favs)
    var favs1=creden.favs
  })


})
app.post('/addtofav', function(req,res){
  console.log("we adding fav")
  console.log(req.body.id)
  console.log(req.body.useremail)
  db.collection('details').findOne({"email": req.body.useremail}, function(err, creden) {
    console.log("creden Found",creden.favs)
    var favs1=creden.favs
    favs1.push(req.body.id)
    console.log("updated favs of "+favs1)
    const query = {"email": req.body.useremail}

    const update = {
      "$set": {
        "favs": favs1,
        
      }
    };
    db.collection('details').findOneAndUpdate(query,update)
});
})

app.get('/getjobs', function(req,res){
  db.collection('jobs').find({}).toArray(function(err, reviews) {
    if (err) {
        console.log("Error mongo main hai")
        console.log(err);
    } else {
        res.json(reviews);
        console.log("Sent jobs to frontend", reviews)
    }
});

})
app.get('/:id', function(req,res){
  let id = req.params.id;
  db.collection('jobs').findOne({"_id": ObjectId(req.params.id)}, function(err, job) {
    console.log("Job Found",job)
    res.json(job)
});

})
app.post('/addjob', function (req, res) {
  var jobelements = req.body;
  console.log("Job i recieved in nodejs (Backend)", jobelements)
  var data = { 
    "jobtype": jobelements.jobtype,
    "jobdescription": jobelements.jobdescription, 
    "useremail": jobelements.useremail,
    "city": jobelements.city,
    "date": jobelements.date
    
    
  } 
  db.collection('jobs').insertOne(data,function(err, collection){ 
    if (err) throw err; 
    console.log("Job inserted Successfully"); 
    return res.send({
      message: 'Job inserted Successfully'
    });
          
});
  
});
app.post('/updatejob', function (req, res) {
  var jobelements = req.body;
  console.log("Job for update i recieved in nodejs (Backend)", jobelements)
  var data = { 
    "jobtype": jobelements.jobtype,
    "jobdescription": jobelements.jobdescription, 
    "useremail": jobelements.useremail,
    "city": jobelements.city,
    "date": jobelements.date
    
    
  } 
  db.collection('jobs').findOneAndReplace({"_id": ObjectId(jobelements._id)},data,function(err, collection){ 
    if (err) throw err; 
    console.log("Job updated Successfully"); 
    return res.send({
      message: 'Job updated Successfully'
    });
          
});
  
});
app.post('/sign-up', function (req, res) {
  var countValue = req.body;
  console.log("CountValue is", countValue.email, countValue.fname, countValue.lname);
  db.collection('details').findOne({email:countValue.email},function(err,user){
    if(user) return res.status(400).json({ auth : false, message :"Email Already Exits"});
  
  bcrypt.hash(req.body.pass, saltRounds, async (err, hash) => {
  var data = { 
    "firstname": countValue.fname, 
    "lastname": countValue.lname,
    "email":countValue.email, 
    "password":hash
    



} 
console.log("HashedPwd: ", hash)
  db.collection('details').insertOne(data,function(err, collection){ 
    if (err) throw err; 
    console.log("Record inserted Successfully"); 
    res.status(400).json({ auth : true, message :"You are now a user please login"});
          
}); 
});
});

});
app.post('/sign-in', function (req, res) {
  var countValue = req.body;
  console.log("U are ", countValue.email);
  
db.collection('details').findOne({ email: countValue.email }, function(err, collection){
  if(err){
      console.log("Invalid User");
      return res.send({
        success: false,
        message: 'User not exists'
      });
  }else{
    
    if (collection!=null){
      console.log("User found");
      bcrypt.compare(countValue.pass, collection.password, function(err, resi) {
        console.log(resi)
      if (resi === true){
        console.log("Correct details found");
        console.log(collection.firstname+ countValue.email+collection._id)
        useremail=countValue.email
        name=collection.firstname+" "+collection.lastname
        islogged="true"
        return res.send({
          success: true,
          message: 'Correct Details',
          fname: collection.firstname,
          lname: collection.lastname,
          id: collection._id
        });
      }else{
        return res.send({
          success: false,
          message: 'Error: Email and Pass Dont Match'
        });
       
      }
    });
      
    }else{
      console.log("User not found");
      return res.send({
        success: false,
        message: 'Error: Incorrect User, Recheck Your Email'
      });
    }
  }
   
});
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})