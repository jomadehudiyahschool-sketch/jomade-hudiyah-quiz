const Competition = require("../models/Competition");

exports.getSettings = async(req,res)=>{

    let settings=await Competition.findOne();

    if(!settings){

        settings=await Competition.create({});

    }

    res.json(settings);

};

exports.saveSettings=async(req,res)=>{

    let settings=await Competition.findOne();

    if(!settings){

        settings=await Competition.create(req.body);

    }

    else{

        Object.assign(settings,req.body);

        await settings.save();

    }

    res.json({
        success:true,
        settings
    });

};