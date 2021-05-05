const Diary = require('./../models/diary')
const { validationResult } = require('express-validator');

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
        return next(new Error('Something Went Wrong!'))
    }
}

exports.getDiary = async(req,res,next)=>{
    try{
        const { id } = req.params

        const diary = await Diary.findById(id)

        res.status(200).json({
            status:'Sucess',
            data:{
                diary
            }
        })
    }catch(err){
        return next(new Error('Something Went Wrong!'))
    }
}

exports.createDiary = async(req,res,next)=>{
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                status:'fail',
                errors:errors.array()
            })
        }

        const createdDiary = await Diary.create(req.body)

        res.status(201).json({
            status:'success',
            data:{
                diary:createdDiary
            }
        })
    }catch(err){
        return next(new Error('Something Went Wrong!'))
    }
}

exports.updateDiary = async(req,res,next)=>{
    try{
        const { id } = req.params
        
        if(!req.access){
            return res.status(403).json({
                status:'fail',
                message:'شما نمیتوانید این فرایند را انجام دهید!'
            })
        }

        const updatedDiary = await Diary.findByIdAndUpdate(id,{
            topic: req.body.topic,
            content: req.body.content
        },{new:true})

        if(!updatedDiary){
            return res.status(404).json({
                status:'fail',
                message:'هیچ خاطره ای با این مشخصات پیدا نشد!'
            })
        }


        res.status(200).json({
            status:'success',
            data:{
                diary : updatedDiary
            }
        })
    }catch(err){
        console.log(err)
        return next(new Error('Something Went Wrong!'))
    }
}

exports.deleteDiary = async(req,res,next)=>{
    try{
        const { id } = req.params
        
        if(!req.access){
            return res.status(403).json({
                status:'fail',
                message:'شما نمیتوانید این فرایند را انجام دهید!'
            })
        }

        const updatedDiary = await Diary.findByIdAndRemove(id)

        if(!updatedDiary){
            return res.status(404).json({
                status:'fail',
                message:'هیچ خاطره ای با این مشخصات پیدا نشد!'
            })
        }


        res.status(204).json({})
    }catch(err){
        console.log(err)
        return next(new Error('Something Went Wrong!'))
    }
}

exports.checkKey = async(req,res,next)=>{
    try{
        const { id } = req.params
        const { key } = req.body

        const keys = await Diary.findOne({ _id:id , key})

        if(!keys){
            req.user = false
            return next()
        }

        req.access = true
        next()
    }catch(err){
        return next(new Error('Something Went Wrong!'))
    }
}