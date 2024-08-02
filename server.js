const dotenv = require('dotenv');
dotenv.config(); 

const express = require('express'); 

const bodyParser = require('body-parser'); 

const app = express(); 

const mongoose = require('mongoose'); 

const methodOverride = require('method-override'); 

const morgan = require('morgan'); 

const MONGODB_URI = process.env.MONGO_URI; 

const Seacreature = require('./models/seacreature.js'); 

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); 
app.use(morgan('dev')); 
app.use(express.json()); ; 
app.set('view engine' ,'ejs'); 
app.use(bodyParser.json()); 




mongoose.connect(process.env.MONGODB_URI); 

mongoose.connection.once("open", () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}.`);
});

mongoose.connection.on('error', () => {
    console.log('mongo not connecting'); 
}); 


//ROUTES 


app.get('/', (req, res) => {
    res.render('index.ejs');
  });

app.get('/seacreatures/new', (req, res) => {
    res.render('seacreatures/new.ejs');
});   

app.get('/seacreatures/:Id', async (req, res) => {
    const specificCreature = await Seacreature.findById(req.params.Id);
    res.render('seacreatures/show.ejs', {seaCreature: specificCreature});
}); 



app.post('/seacreatures', async (req, res) => {
    if(req.body.mightKillYou ==='on') {
        req.body.mightKillYou = true; 
       } else {
        req.body.mightKillYou = false; 
       }
    try { 
        const collectedCreature = await Seacreature.create(req.body);
        res.redirect('/seacreatures'); 

    } catch (error) {
        res.status(400).json({msg: error.message}); 
    }
}); 


app.get('/seacreatures', async (req,res) => {
    const allCreatures = await Seacreature.find(); 
    console.log(allCreatures); 
    res.render('seaCreatures/index.ejs', {seaCreatures: allCreatures}); 
}); 

app.delete("/seacreatures/:Id", async (req, res) => {
    const deletedCreature = await Seacreature.findByIdAndDelete (req.params.Id);
    res.redirect('/seacreatures')
}); 
  

app.listen(3000, () => {
    console.log("listening on port 3000"); 
}); 

