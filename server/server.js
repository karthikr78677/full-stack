const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const app=express();
app.use(cors());
require('dotenv').config();

app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    }
}
connectDB();

connectDB();

const signUpSchema=new mongoose.Schema({
    FirstName:String,
    LastName:String,
    Email:{type:String,unique:true,required:true},
    Password:String,
    ConfirmPassword:String,
    phno:{type:String,unique:true,required:true}
})

const signup=mongoose.model("sign-up",signUpSchema);

app.post("/signup",async(req,res)=>{
    const {FirstName,LastName,Email,Password,ConfirmPassword,phno}=req.body;
    if(!FirstName|| !LastName || !Email || !Password || !ConfirmPassword || !phno){
        return res.status(400).json({success:false,message:"All fields are required"})
    }
    try{
        const exisitingUser=await signup.findOne({Email});
        if(exisitingUser){
            return res.status(200).json({success:false,message:"User already exists with this email"})
             

        }
        const newUser=new signup({
            FirstName,
            LastName,
            Email,
            Password,
            ConfirmPassword,
            phno
        })
        const user=await newUser.save();
        console.log("User created successfully",user);
        return res.status(201).json({success:true,message:"User created successfully",user});
    }
    catch(err){
        console.error("Error creating user",err);
        return res.status(500).json({success:false,message:"Internal server error"});
    }
})

app.post("/signin",async(req,res)=>{
    const {Email,Password}=req.body;
    if(!Email||!Password){
        return res.status(400).json({success:false,message:"All fields are required"});
    }try{
        const user=await signup.findOne({Email});
        if(!user){
        return res.json({success:false,message:"User not found"});
    }
    if(user.Password!=Password){
        return res.json({success:false,message:"Incorrect password"});
    }
    return res.status(200).json({success:true,message:"User signed in successfully",user});
    }
    catch(err){
        console.error("Error signing in user",err);
        return res.status(500).json({success:false,message:"Internal server error"});
    }
    
})



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});