const mongoose = require("mongoose");

const competitionSchema = new mongoose.Schema({

    title:{
        type:String,
        default:"Jomade Hudiyah School Quiz Competition"
    },

    timer:{
        type:Number,
        default:5
    },

    wrongMark:{
        type:Number,
        default:15
    },

    unansweredMark:{
        type:Number,
        default:10
    },

    deductionPerTenth:{
        type:Number,
        default:1
    },

    started:{
        type:Boolean,
        default:false
    },

    currentQuestion:{
        type:Number,
        default:0
    }

},{
    timestamps:true
});

module.exports = mongoose.model(
    "Competition",
    competitionSchema
);