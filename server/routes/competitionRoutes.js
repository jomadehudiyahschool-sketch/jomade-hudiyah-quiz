const express=require("express");

const router=express.Router();

const {

getSettings,

saveSettings

}=require("../controllers/competitionController");

router.get("/",getSettings);

router.put("/",saveSettings);

module.exports=router;