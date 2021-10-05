const express = require('express');
const router = express.Router();
const Rating = require('../models/ratingModel.js');
const auth = require('../middleware/auth');
const {updateRating} = require('../utils/userUtils');
 
router.post('/rate/lens',auth.verifyUser,(req,res)=>{
    let rating = parseInt(req.body['rating']);
    let lens_id = req.body['lensId'];
  
    Rating.findOne({"user_id":req.result._id,"lens_id":lens_id}).then((data)=>{
        if(data!=null)
        {
           
            
                Rating.updateOne({"user_id":req.result._id,"lens_id":lens_id},{$set:{"rating":parseInt(rating),"ratedAt":new Date()}}).then((result)=>{
                    
                    updateRating(lens_id);
                    return res.status(200).json({"success":true,"message":"Rated!!"});
                }).catch((err)=>{
                    return res.status(404).json({"success":false,"message":err});
                })
        
           
 
        }
        else
        {
            const rate = new Rating({"user_id":req.result._id,"lens_id":lens_id,"rating":parseInt(rating),"ratedAt":new Date()});
            rate.save().then((result)=>{
                updateRating(lens_id);
                return res.status(200).json({"success":true,"message":"Rated!!"});
            }).catch((err)=>{
                return res.status(404).json({"success":false,"message":err});
            })
        }
    })
})


 
router.post('/retrieveRating',auth.verifyUser,(req,res)=>{
    let lensId = req.body.lensId;
    Rating.findOne({"user_id":req.result._id,"lens_id":lensId}).then((data)=>{
        if(data == null)
        {
            return res.status(202).json({"success":false,"message":"Not rated!!","data":data});
        }
        else
        {
            return res.status(200).json({"success":true,"message":"Rated!!","data":data});
        }
    })
})
 
module.exports = router;