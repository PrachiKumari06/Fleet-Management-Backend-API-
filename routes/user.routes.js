import express from "express";
import supabase from "../config/supabase.config.js";
const router=express.Router();

router.post("/signup",async(req,res)=>{
    const{name,email,password,role}=req.body;
    if(!["customer","owner","driver"].includes(role)){
        return res.status(400).json({error:"Role must be either customer ,owner or driver"})
    }
    const {data,error}=await supabase.from("users").insert([
        {
            name,
            email,
            password,
           role
        }
    ])
    if(error){
        res.status(400).json({error:error.message})
    }else{
        res.status(201).json({message:"User created successfully",data})
    }
})
export default router;