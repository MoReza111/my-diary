const mongoose = require('mongoose')

const diarySchema = new mongoose.Schema({
    topic:{
        type:String,
        required:true
    },
    content:{
        type:String,
        reuired:true
    },
    key:{
        type:String,
        select:false
    },
    slug:String,
})

const Diary = mongoose.model('Diary',diarySchema)
module.exports = Diary