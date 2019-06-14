const router = require('express').Router()
const verify = require('./verifyToken');

router.get('/',verify,(req,res)=>{
    res.send("i know its you ")
})


module.exports = router;