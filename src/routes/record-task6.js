const express = require('express');
const Joi = require('joi');

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

const records = [
    {
      _id: 'record-1',
      name: 'Running',
      timestamp: new Date(),
      duration: 4000,
      calories: 200,
      description: 'I don not know what to write',
      location : 'BKK'
    },
    {
      _id: 'record-2',
      aname: 'Running',
      timestamp: new Date(),
      duration: 4000,
      calories: 200,
      description: 'I know who you are',
      location : 'CNX'
    },
    {
      _id: 'record-3',
      activityName: 'Running',
      timestamp: new Date(),
      duration: 4000,
      calories: 200,
      description: 'Let run together right now',
      location : 'Moon'
    },
  ];

//   validate if data is exist
recordRouter.use('/:recordId', (req, res, next)=>{
    const recordIndex = records.findIndex((record) => record._id === req.params.recordId);
    const foundRecord = records[recordIndex];
    if (!foundRecord){
        return res.status(404).send('Your requested record is not exist.')
    } else {
        res.status(200).send(foundRecord);
        // pass variables to the next middleware
        req.record = foundRecord ;
        req.recordIndex = recordIndex ;
        return next();
    }
})

recordRouter.get('/', (req, res, next)=>{
    res.status(200).send(records);
});
recordRouter.get('/:recordId', (req, res, next)=>{
    res.status(200).send(req.record)
});

recordRouter.post('/', (req, res, next)=>{
    const body = req.body ;
    console.log('body: ', body);

    const validateResult = createRequestSchema.validate(body);
    if(validateResult.error){
        return res.status(400).send('Invalid Request.');
    }

    const newRecord = {
        _id : 'record-' + (records.length + 1),
        ...body,
    }
    records.push(newRecord);
    return res.status(201).send(newRecord);
});

recordRouter.put('/:recordId', (req, res, next)=>{
    const body = req.body ;
    const index = req.params.recordId ;
    console.log('body: ', body);

    const validateResult = updateRequestSchema.validate(body);
    if(validateResult.error){
        return res.status(400).send('Invalid Request.');
    }

    const updatedRecord = {
        _id : index,
        ...body,
    }
    console.log('updated data', )

    records[req.recordIndex] = updatedRecord;
    return res.status(201).send(records[req.recordIndex]);

});

recordRouter.delete('/:recordId', (req, res, next)=>{
    const index =  req.recordIndex ;
    records.splice(index, 1);
    return res.status(204).send()
});

module.exports = recordRouter ;


/* original route
app.get('/users/me/records', (req, res, next)=>{});
app.get('/users/me/records/recordId', (req, res, next)=>{});
app.post('/users/me/records', (req, res, next)=>{});
app.put('/users/me/records/recordId', (req, res, next)=>{});
app.delete('/users/me/records/recordId', (req, res, next)=>{});
*/