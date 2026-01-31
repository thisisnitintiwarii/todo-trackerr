import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const middleware = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt
    
        // validate the token
    
        if(!token){
            return res.status(500).json({
                message:"token not found"
            })
        }
    
        const verifyToken = await jwt.verify(token,process.env.JWT_SECRET_KEY);
    
        if(!verifyToken){
            return res.status(500).json({
                message:"token not verified"
            })
        }
    
        const userId = verifyToken.userId;
    
        req.userId = userId;
        next();
    } catch (error) {
            res.status(500).json({
            message:"token verification error catch"
        })
    }

}