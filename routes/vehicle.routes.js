import express from "express";
import supabase from "../config/supabase.config.js";
import rateLimiter from "../middleware/ratelimiter.middleware.js";
const router=express.Router();

router.post("/add",rateLimiter,async(req,res)=>{
const {owner_id,name,registration_num,allowed_passengers,isavailable,rate_per_km,driver_id}=req.body;
const {data:owner}=await supabase.from("users").select("*").eq("id",owner_id).eq("role","owner").single();
if(!owner){
    return res.status(400).json({error:"Invalid owner_id"})
}
const {data,error}=await supabase.from("vehicles").insert([
    {
        owner_id,
        name,
        registration_num,
        allowed_passengers, 
        isavailable,
        rate_per_km,
        driver_id
    }
])
if(error){
    res.status(400).json({error:error.message})
}else{
    res.status(201).json({message:"Vehicle added successfully",data})
}
});
router.get("/:vehicleId",async(req,res)=>{
    const {vehicleId}=req.params;
    const {data,error}=await supabase.from("vehicles").select("*").eq("id",vehicleId).single();
    if(error){
        res.status(400).json({error:error.message})
    }else{
        res.status(200).json({data})
    }
});
router.patch("assign-driver/:vehicleId",async(req,res)=>{
    const {vehicleId}=req.params;
    const {driver_id}=req.body;
    
    const {data:driver}=await supabase.from("users").select("*").eq("id",driver_id).eq("role","driver").single();
    if(!driver){
        return res.status(400).json({error:"Invalid driver_id"})
    }
    const {data,error}=await supabase.from("vehicles").update({driver_id}).eq("id",vehicleId);
    if(error){
        res.status(400).json({error:error.message})
    }else{
        res.status(200).json({message:"Driver assigned successfully",data})
    }
});
export default router;


//middleware of rate limit