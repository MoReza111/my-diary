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

        const diay = await Diary.findById(id)

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

exports.checkKey = async(req,res,next)=>{
    try{
        const { id } = req.params
        const { key } = req.body

        const keys = await Diary.find({ _id:id , key})

        if(keys.length == 0){
            req.access = false
            return res.status(403).json({
                staus:'fail',
                messag:"شما نیمتوانید این فرایند را انجام دهید!"
            })
        }

        req.access = true

        res.status(200).json({
            status:'success'
        })
    }catch(err){
        return next(new Error('Something Went Wrong!'))
    }
}