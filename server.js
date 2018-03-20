const express = require('express')
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authors')
app.use(express.static(__dirname +'/authors-app/dist'));

var AuthorsSchema = new mongoose.Schema({
name: {type: String, required: true, minlength: 3}  
});
mongoose.model('Authors', AuthorsSchema);
var Authors = mongoose.model('Authors')
//Getting all authors from DB
app.get('/authors', (req, res)=> {
    console.log("in all route")
    Authors.find({},null,{sort: {name: 1}}, (err,authors)=>{
        if(err){
            console.log(err);
            res.json({message: "Error", error: err})
        }
        else{
            res.json({message: "Success", data: authors})
        }
    })
})
app.get('/authors/:id', (req, res)=>{
    Authors.findOne({_id: req.params.id}, (err, author)=>{
        if(err){
            console.log (err)
            res.json({message: "Error", error: err})
        }
        else{
            res.json({message: "Success", data: author})
        }
    })
})
//Create Author Page
app.post('/authors', (req,res)=>{
    var newAuthors = new Authors({name:req.body.name})
    newAuthors.save((err)=>{
        if(err){
            console.log(newAuthors.errors)
            res.json({message: "Error", error: err})
        }
        else{
            res.json({message: "Success"})
        }
    })
})
// Update Author
app.put('/authors/:id', (req,res)=>{
    var author = Authors.update({_id: req.params.id}, {name: req.body.name}, (err)=>{
        if(err){
            console.log(err);
            res.json({message: "Error", error: err})
        }
        else{
            res.json({message: "Successful Update!"})
        }
    })
})
//Delete Author
app.delete('/authors/:id', (req,res)=>{
    Authors.remove({_id: req.params.id}, (err)=>{
        if(err){
            console.log(err);
            res.json({message: "Error", error: err})
        }
        else{
            res.json({message: "Successful removal"})
        }
    
    })

    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./authors-app/dist/index.html"))
      });
})

app.listen(port, ()=>{
    console.log(`We are on port ${port}`);
})