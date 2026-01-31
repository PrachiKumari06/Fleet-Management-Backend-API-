import express from "express";
import supabase from "../config/supabase.config.js";
const router=express.Router();

router.get("/",async(req,res)=>{
    const customer=await supabase.from("users").select("*",{count:"exact"}).eq("role","customer");
    const owner=await supabase.from("users").select("*",{count:"exact"}).eq("role","owner");
    const driver=await supabase.from("users").select("*",{count:"exact"}).eq("role","driver");
    const vehicles=await supabase.from("vehicles").select("*",{count:"exact"});
    const trips=await supabase.from("trip").select("*",{count:"exact"});
    res.status(200).json({
        total_customers:customer.count,
        total_owners:owner.count,
        total_drivers:driver.count,
        total_vehicles:vehicles.count,
        total_trips:trips.count
    })
});

export default router;