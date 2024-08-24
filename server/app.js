import express from "express";
import cors from "cors";
import router from "./routes/route.js";
import dotenv from 'dotenv';
import helmet from "helmet";
import rateLimit from "express-rate-limit";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: "Too many requests from this IP, please try again in 15 minutes.",
    headers: true,
});



app.use(limiter);
app.use('/api', router, limiter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});