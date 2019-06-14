const router = require('express').Router()
const verify = require('./verifyToken');
const Post = require('../models/Post')
const User = require('../models/User')

router.get('/',verify,async(req,res)=>{
    res.send("i know its you subs")
})

//Crud
//creating one
router.post('/post',verify,async (req,res)=>{
    const newPost = new Post({
      title  :req.body.title,
      content:req.body.content  
    })
    try {
        //if(newPost.isModified){return res.send("Nothin is changed")}
        savedPost = await newPost.save() 
        res.status(201).send(savedPost)
        next()

    } catch (error) {
        res.status(400).send(error)
    }
})

//getting one sub
router.get('/:id',verify,getPost,async(req,res)=>{
    res.send(res.post.title)
})

//getting all 
router.post('/posts',verify,async(req,res)=>{
    try {
        const posts = await Post.find()
        res.json(posts)
        next()
    } catch (error) {
        res.status(500).send(error)
    }
})

//updating one
router.patch('/:id',verify,getPost,async(req,res)=>{
    if(req.body.title != null){
        res.post.title = req.body.title
        res.post.content = req.body.content
    }
    try {
        const updatedPost = await res.post.save()
        res.send('updated to') 
        next()
    } catch (error) {
        res.send(error)
    }
})

//deleting one
router.delete('/:id',verify,getPost,async(req,res)=>{
    try {
        await res.post.remove()
        res.send("kicked that post out")
    } catch (error) {
        res.status(500).send(error)
    }
})

async function getPost(req,res,next){
    let post
    try {
        post = await Post.findById(req.params.id)
        if (post == null){
            return res.status(404).send("doesnt exist my man")
        }

    } catch (error) {
        res.send(error)
    }
    res.post = post
    next()
}

module.exports = router;
