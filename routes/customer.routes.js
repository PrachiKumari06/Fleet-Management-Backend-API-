import express from "express";
import supabase from "../config/supabase.config.js";
const router=express.Router();

async function isCustomer(userId){
    const {data}=await supabase.from("users").select("*").eq("id",userId).eq("role","customer").single();
    return data!==null;
}

router.post("/create",async(req,res)=>{
    const {customer_id,vehicle_id,start_date,end_date,location,distance_km,passengers,tripCost,isCompleted}=req.body;
    const is_customer=await isCustomer(customer_id);
    if(!is_customer){
        return res.status(400).json({error:"Invalid customer_id"})
    }
    const {data:vehicle}=await supabase.from("vehicles").select("*").eq("id",vehicle_id).single();
    if(!vehicle.isAvailable){
        return res.status(400).json({error:"Vehicle is not available"})
    }
    if(passengers>vehicle.allowed_passengers){
        return res.status(400).json({error:"Number of passengers exceeds allowed limit"})
    }
    const {data,error}=await supabase.from("trip").insert([
        {
            customer_id,
            vehicle_id,
            start_date,
            end_date,
            location,
            distance_km,
            passengers,
            tripCost,
            isCompleted
        }
    ])
    if(error){
        res.status(400).json({error:error.message})
    }else{
        res.status(201).json({message:"Trip created successfully",data})
    }
});

router.get("/:tripId",async(req,res)=>{
    const {tripId}=req.params;
    const {data,error}=await supabase.from("trip").select("*").eq("id",tripId).single();
    if(error){
        res.status(400).json({error:error.message})
    }else{
        res.status(200).json({data})
    }   
});
router.patch("/update/:tripId",async(req,res)=>{
     const is_customer=await isCustomer(customer_id);
    if(!is_customer){
        return res.status(400).json({error:"Invalid customer_id"})
    }
    const {tripId}=req.params;
    const {end_date,location,distance_km,passengers,tripCost,isCompleted}=req.body;
    const {data,error}=await supabase.from("trip").update({end_date,location,distance_km,passengers,tripCost,isCompleted}).eq("id",tripId);
    if(error){
        res.status(400).json({error:error.message})
    }else{
        res.status(200).json({message:"Trip updated successfully",data})
    }
});
router.delete("/delete/:tripId",async(req,res)=>{
     const is_customer=await isCustomer(customer_id);
    if(!is_customer){
        return res.status(400).json({error:"Invalid customer_id"})
    }
    const {tripId}=req.params;
    const {data,error}=await supabase.from("trip").delete().eq("id",tripId);
    if(error){
        res.status(400).json({error:error.message})
    }
    else{   
        res.status(200).json({message:"Trip deleted successfully",data})
    }
}); 
// end of trip routes
router.patch("/end/:tripId",async(req,res)=>{
    const {tripId}=req.params;
    const {end_date,isCompleted}=req.body;
    if(!isCompleted){
        return res.status(400).json({error:"isCompleted must be true to end the trip"})
    }
    const {data:trip}=await supabase.from("trip").select("distance_km,vehicle_id").eq("id",tripId).single();
const cost=trip.distance_km* (await supabase.from("vehicles").select("rate_per_km").eq("id",trip.vehicle_id).single()).data.rate_per_km;
    const {data,error}=await supabase.from("trip").update({end_date,isCompleted,tripCost:cost}).eq("id",tripId);
    if(error){
        res.status(400).json({error:error.message})
    }
    else{   
        res.status(200).json({message:"Trip ended successfully",data})
    }
});

export default router;
