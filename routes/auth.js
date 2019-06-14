const router = require('express').Router();
const User = require('../models/User');
const {registerVal,loginVal} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//routes with asyncs saves
//register
router.post('/register',async (req,res)=>{
    
    //validate data
    const {error} = registerVal(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    //check conditions
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) {return res.status(400).send("Email already exists")}
    
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password,salt);


    //model saves
    const new_user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
    })

    const savedUser = await new_user.save();
    res.send({user: new_user._id});
    
})
//login
router.post('/login',async (req,res)=>{
    
    //validate data
    const {error} = loginVal(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Email does not exist")

    const passCor = await bcrypt.compare(req.body.password , user.password).then(function (result){
        if(result == false) {
            return res.send("invalid password")
        }})
 
    //Create token 

    const token = jwt.sign({_id:user._id}, process.env.token_secret)
    res.header('auth-token',token).send(token);

})
module.exports = router;