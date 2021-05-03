const app = require('express')()
const bodyParser = require('body-parser')

const diaryRouter = require('./routes/diaryRouter')

app.use(bodyParser.json())

app.use('/api/diaries',diaryRouter)

module.exports = app