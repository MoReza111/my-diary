const {Router} = require('express')
const {body, check} = require('express-validator')

const { getAllDiaries, createDiary, checkKey, getDiary, updateDiary, deleteDiary } = require('./../controllers/diaryController')

const router = Router()

// 
router.route('/').get(getAllDiaries).post([
    body('topic').not().isEmpty().withMessage('هر خاطره باید یک عنوان داشته باشد!'),
    body('content').not().isEmpty().withMessage('لطفا متن خاطره را نیز وارد کنید!'),
], createDiary)

router.route('/:id').get(getDiary).put(checkKey,updateDiary).delete(checkKey,deleteDiary)

module.exports = router