import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
import dotenv from "dotenv";

dotenv.config();

const getAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.userId = user._id;
        req.auth = user; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default getAuth;
