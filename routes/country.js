const router = require('express').Router();
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
let Country = require('../models/country.model');

router.route('/').get((req,res) => {
    Country.find()
        .then(country => res.json(country))
        .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/add').post((req,res) => {
    

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        // check for all fields
        const { name, contigent, rank } = fields;
console.log("field"+fields.contigent)
        if (!name || !contigent || !rank) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        let country = new Country(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 4000000) {
                return res.status(400).json({
                    error: 'Image should be less than 4mb in size'
                });
            }
            country.photo.data = fs.readFileSync(files.photo.path);
            country.photo.contentType = files.photo.type;
        }

        country.save((err, result) => {
            if (err) {
                console.log('country CREATE ERROR ', err);
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
});

router.route('/:id').get((req,res) => {
    Country.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: '+err));
});


router.route('/:id').delete((req,res) => {
    Country.findByIdAndDelete(req.params.id)
        .then(exercise => res.json('country deleted'))
        .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;