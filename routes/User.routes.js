const express= require("express")
const {UserModel} = require("../model/User.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



const userRouter = express.Router();

userRouter.post("/register",async(req,res) =>{
    const {name,email,gender,password,age,city} = req.body
    try{
        bcrypt.hash(password, 5 , async (err, hash) =>{
            if(err){
                res.send({"msg":"Something is wring","error":err.message})

            }else{
                const user = new UserModel({name,email,gender,password:hash,age,city})
                 await user.save()
                 res.send({"msg":" New User registerd"})

            }
        })
    }catch(err){
        
        res.send({"msg":"Something is wring","error":err.message})
        console.log(err)

    }

})
userRouter.post("/login", async (req, res) => {
    const { email,password } = (req.body)
    try {
        const user = await UserModel.find({ email })
        console.log(user)
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {

                   const token = jwt.sign({userID:user[0]._id}, 'masai');
                    res.send({ "msg": "Login sucess", "token": token })

                } else {
                    res.send("Wrong Credentilas")
                }
               
            });

        } else {
            res.send("Credentilas not found")
        }
    }
    catch (err) {

        res.send({ "msg": "Somethung went wrong", "error": err.message })
        console.log(err)

    }
})


module.exports = {
    userRouter
}

