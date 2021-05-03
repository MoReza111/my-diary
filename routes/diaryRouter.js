const {Router} = require('express')
const {body} = require('express-validator')

const { getAllDiaries, createDiary } = require('./../controllers/diaryController')

const router = Router()

// 
router.route('/').get(getAllDiaries).post([
    body('topic').not().isEmpty().withMessage('هر خاطره باید یک عنوان داشته باشد!'),
    body('content').not().isEmpty().withMessage('لطفا متن خاطره را نیز وارد کنید!'),
], createDiary)

module.exports = router