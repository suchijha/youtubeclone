import express from "express"
import { config } from "dotenv";
import cors from "cors"
import morgan from "morgan";

import auth from "./route/auth.route.js"
import video from "./route/video.route.js"
import comment from "./route/comment.route.js"
import channel from "./route/channel.route.js"
import JWTverify from "./middleware/JWTverify.js";
import mongoose from "mongoose";

config();
   try {
       
        await mongoose.connect("mongodb://127.0.0.1:27017/youtube");
        console.log('database connected successfully')
        const app = express();
        app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
const port = 3000;
app.get('/isLogin',JWTverify,(req,res)=>{
    res.status(200).json(req.user);
})
app.use('/api/auth',auth)
app.use('/api/video',video)
app.use('/api/comment',comment)
app.use('/api/channel',channel)

app.listen(port , ()=>console.log(`Server listen at ${port}`));
    } catch (error) {
        console.log('Internal error',error.message)
        process.exit(1);
    }

