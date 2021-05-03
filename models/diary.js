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
    createdAt:Date,
    slug:String,
})

diarySchema.pre('save',async function(next){
    this.slug = this.topic.split(' ').join('-')
    

    const docBySlug = await Diary.find({$or: [{slug:this.slug}, {slug:{$regex : `.*${this.slug}.*`}}]})
    if(docBySlug.length != 0){
        this.slug = `${this.slug}-${docBySlug.length +1}`
    }

    this.createdAt = new Date()
    this.key = [...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')

    next()
})

const Diary = mongoose.model('Diary',diarySchema)
module.exports = Diary