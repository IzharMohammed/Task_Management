import { NextFunction, Request, Response } from "express";
const admin = require("../config/firebase-config");
const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token
    // console.log(`token:- ${token}`);
    
    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        (req as any).user = decodedToken; // Attach decoded token to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export default verifyFirebaseToken;