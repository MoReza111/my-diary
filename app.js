const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')

const diaryRouter = require('./routes/diaryRouter')

app.use(cors())
app.use(bodyParser.json())

app.use('/api/diaries',diaryRouter)

module.exports = app