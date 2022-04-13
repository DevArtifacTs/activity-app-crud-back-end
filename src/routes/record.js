const express = require('express');
const Joi = require('joi');

// import Record Model
const RecordModel = require('../models/recordModel');

// Joi validation
const createRequestSchema = Joi.object({
    name : Joi.string().min(3).required(),
    description : Joi.string().min(10).allow('').required()  ,
    duration : Joi.number().min(0).required() ,
    location : Joi.string().min(3).max(10).required() ,
    timestamp : Joi.string().required(),
    calories : Joi.number().min(0).required()
});

const updateRequestSchema = Joi.object({
    name : Joi.string(),
    description : Joi.string(),
    duration : Joi.number().min(0),
    location : Joi.string().min(3).max(10),
    timestamp : Joi.string(),
    calories : Joi.number().min(0)
})

const recordRouter = express.Router();

//   validate if data is exist
recordRouter.use('/:recordId', async (req, res, next)=>{
    const foundRecord = await RecordModel.findById(req.params.recordId);
    if (!foundRecord){
        return res.status(404).send('Record not found.');
    } else {
        // pass variables to the next middleware
        console.log('found record', foundRecord);
        req.record = foundRecord;
        req.recordId = req.params.recordId;
        return next();
    }
})


recordRouter.get('/:recordId', async (req, res, next)=>{
    return res.status(400).send(req.record)
});

recordRouter.get('/', async (req, res, next)=>{
    const records = await RecordModel.find({});
    return res.status(400).send(records);
});

recordRouter.post('/', async (req, res, next)=>{
    const body = req.body ;
    const newRecord = new RecordModel(body);
    const errors = newRecord.validateSync();

    if(errors){
        const errorFieldName = object.keys(errors.errors);
        if(errorFieldName.length > 0){
        return res.status(400).send(errors.errors[errorFieldName[0]].message);
    }}

    await newRecord.save();
    return res.status(201).send(newRecord);
});

recordRouter.put('/:recordId', async (req, res, next)=>{
    const body = req.body ;
    const index = req.recordId;
    // find the request doc by it's id
    const recordToBeUpdated = await RecordModel.findOne({_id : index})

    const errors = recordToBeUpdated.validateSync();
    if(errors){
        const errorFieldName = object.keys(errors.errors);
        if(errorFieldName.length > 0){
        return res.status(400).send(errors.errors[errorFieldName[0]].message);
    }}
    // prepare data to update by using object dot operator
    const updatedRecord = {
        _id : index,
        ...body,
    }
    // log out what we get for updating document
    console.log('updated data', updatedRecord )
    // update exist doc by using Model.overwrite method 
    recordToBeUpdated.overwrite(updatedRecord);
    await recordToBeUpdated.save();
    // return res.status(201).send(records[index]);
    return res.status(201).send(recordToBeUpdated);
});

recordRouter.delete('/:recordId', async (req, res, next)=>{
    // delete exist document by using .deleteOne method 
    await RecordModel.deleteOne({ _id : req.recordId});
    return res.status(204).send() ; // 204 = No content which mean it successfully removed
});

module.exports = recordRouter ;


