const data={};
export default function rateLimiter(data,res,next){
    const ip=data.ip;
    const now=Date.now();
    if(!data[ip]){
        data[ip]=[];
    }
    data[ip]=data[ip].filter(time=>now-time<60000);
    if(data[ip].length>=3){
        return res.status(429).json({error:"Too many requests. Please try again later."});
    }
    data[ip].push(now);
    next();
}