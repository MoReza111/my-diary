const {Router} = require('express')

const { getAllDiaries } = require('./../controllers/diaryController')

const router = Router()

// 
router.route('/').get(getAllDiaries)

module.exports = router