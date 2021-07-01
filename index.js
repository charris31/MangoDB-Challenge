const express = require('express');
const app = express();
const MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

let db;
const port = 3000;
app.use(express.json())
const uri = "mongodb+srv://charris31:072204cW!@cluster0.bbe36.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
MongoClient.connect(uri, {useUnifiedTopology:true}, function(err,client){
    console.log("Connected to MongoDB successfully");
    db = client.db("mongodb-lecture");
})

app.listen(port, function(req,res){
    console.log("listening at port: " + port)
})

app.get('/getHeroes',function (req,res){
    db.collection('heroes').find({}).toArray(function(error,document){
        if (error) throw error;
        for(let counter = 0; counter < document.length;counter++){
            res.write(" Name:" + document[counter].title + " Universe:" + document[counter].content + '\n');
        }
        res.end();
    })
})

// app.get('/getHeroes',function (req,res){
//     db.collection('heroes').find({}).toArray(function(error,document){
//         if (error) throw error;
//         for(let counter = 0; counter < document.length;counter++){
//             res.write(" Title " + document[counter].title + " Description " + document[counter].content + " ObjectID: " + document[counter]._id + '\n' );
//         }
//         res.end();
//     })
// })

app.get('/getHeroById', function (req,res){
    db.collection('heroes').findOne({
    _id: req.body._id
    })
    db.collection('heroes').find({"_id" : ObjectId(req.body._id)}).toArray( function(error, documents){
    if (error) throw error;
    console.log(documents)
    res.send(documents)
    })
})

// app.get('/getHeroById', function (req,res){
//     db.collection('blogs').findOne({
//     _id: ObjectId()
//     }, function(err,result){
//         if(err) throw err;
//         });
//         console.log(req.body);
// })

app.post('/customHero', function (req,res){
    db.collection('heroes').insertOne({
        title: req.body.name,
        content: req.body.universe
    },
    function(err,result){
        if(err) throw err;
        res.send ('Hero Added successfully');
        })
})

