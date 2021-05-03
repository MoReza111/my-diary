const mongoose = require('mongoose')

const app = require('./app')

mongoose.connect('mongodb://localhost:27017/diary',{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false
}).then(()=>{
        console.log('Connected To DB')
    }).catch(err=>{
        console.error(err)
    })

const PORT = 5000 || process.env.PORT

app.listen(PORT,()=>{
    console.log(`Listening On port:${PORT}`)
})