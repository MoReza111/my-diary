const Diary = require('./../models/diary')

exports.getAllDiaries = async(req,res,next)=>{
    try{
        const diaries = await Diary.find({})

        res.status(200).json({
            status:'Sucess',
            data:{
                diaries
            }
        })
    }catch(err){
        next(new Error('Something Went Wrong!'))
    }
}