const mongoose = require("mongoose")

const schema = new mongoose.Schema({
code : {
    type : Number,
    require : true,
},
phone : {
    type : String,
    require : true,
},
expireAt : {
    type : Number,
    require : true,
},
uses : {
    type : Number,
    default : 0,
},
})



const model = mongoose.model("Otp", schema)
modeule.exports = model