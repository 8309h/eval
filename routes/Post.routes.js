const express= require("express")
const {PostModel} = require("../model/Post.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



const postRouter = express.Router();
postRouter.get("/" , async (req,res) => {

    const post = await PostModel.find()
    res.send(post)


})
postRouter.post("/add" , async (req,res) => {
    const  data = req.body
    try{
        const post = new PostModel(data)
        await post.save()
        res.send({"msg":"Post Adeed sucessfully"})
    }catch(err){
        res.send({"msg":"Can not addeed","error":err.message})
        console.log(err)
    }
})
postRouter.patch("/update/id", async(req,res) => {
       const id  = req.params.id
       const payload = req.body
       const post = await PostModel.findOne({"_id":id})
       console.log(post)
       const userid_inpost  = post.userID
       const user_make_req = req.body.userID
       try{
        if(user_make_req !== userid_inpost){
            res.send("You are not Athorised user")
        }else{
            await PostModel.findByIdAndUpdate({_id:id,payload})
            res.send({"msg":"Post Updated Sucess"})

        }
       }catch(err){
        res.send({"msg":"Post not  Updated ","error":err.message})
        console.log(err)
       }
})
postRouter.delete("/update/id", async(req,res) => {
    const id  = req.params.id
    
    const post = await PostModel.findOne({"_id":id})
    console.log(post)
    const userid_inpost  = post.userID
    const user_make_req = req.body.userID
    try{
     if(user_make_req !== userid_inpost){
         res.send("You are not Athorised user")
     }else{
         await PostModel.findByIdAndDelete({"_id":id})
         res.send({"msg":"Post deleted Sucess"})

     }
    }catch(err){
     res.send({"msg":"Post not deletd ","error":err.message})
     console.log(err)
    }
})

module.exports= {
    postRouter
}