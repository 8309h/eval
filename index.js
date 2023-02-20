const express = require("express");
const connection = require("./config/db")
require('dotenv').config()
const { userRouter } = require("./routes/User.routes");
const { postRouter } = require("./routes/Post.routes")
const {authonticate} = require("./middleware/authonticate.middleware")
const {UserModel} = require("./model/User.model")
const cors = require("cors");


const app = express();
app.use(express.json())
app.use(cors())

app.get("/",(req,res) => {
    res.send("Home_Page of LinkedIn")
})
app.use("/users",userRouter)
app.get("/userdata",async(req,res) => {
    let query = req.query
    console.log(query)
    try{
        const users = await UserModel.find(query)
       res.send(users)
  
    }catch(err){ 
        res.send({"msg":"Cannot find the User","error":err.message})
      
    }
    
})
app.use(authonticate)
app.use("/posts",postRouter)





app.listen(process.env.port, async() => {
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err)
        console.log("Can not conected")
    }
    console.log(`Server Runs at port ${process.env.port}`)
})