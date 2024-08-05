const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const seaCreatureSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    phylum: { type: String, required: true }, 
    description: { type: String, required: true }, 
    mightKillYou: { type: Boolean, default: false }, 
});

const Seacreature = mongoose.model('seaCreature', seaCreatureSchema); 

module.exports = Seacreature; 