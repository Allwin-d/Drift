import rateLimit from "express-rate-limit";


const rateLimiter = rateLimit({
    limit : 5 ,
    windowMs : 15 * 60 * 1000,
    message : {
        success : false,
        message : "Too many attempts . Please try again later"
    },
    standardHeaders : "draft-7",
    legacyHeaders : false
})

export default rateLimiter;