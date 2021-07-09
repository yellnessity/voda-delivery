const express = require('express');
const mongodb = require('mongodb');

const ObjectID = require("mongodb").ObjectID;

const router = express.Router(); 

router.get('/', async (req, res) => {
    const items = await loadItemsCollection();
    let params = req.query;
    console.log(params, typeof params) 
    if (Object.keys(params).length != 0) {
        let query = {}
        Object.keys(params).map((key) => {
            if (params[key] && key === 'category') {
                // params[key] = JSON.parse(params[key]) 
                query[key] = {$in: params[key]}
            }
            if (params[key] && key === 'volume') {
                params[key] = params[key].map(value => parseInt(value))
                query[key] = {$in: params[key]}
            }
            if (params[key] && key === 'pack') {
                query[key] = Boolean(params[key])
            }
            if (params[key] && key === 'id') {
                params[key] = params[key].map(id => ObjectID(id))
                query['_id'] = {$in: params[key]}
            }
        })
        res.send(await items.find(query).toArray());
    }
    else {
        res.send(await items.find({}).toArray());
    }

});

async function loadItemsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://yellnessity:yellnessity123@voda-delivery.oefbx.mongodb.net/voda-delivery?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('voda-delivery').collection('items');
}

module.exports = router;