import express from "express"
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser"
import todoRouter from "./routes/todo.routes.js";
import cors from "cors"

const app = express();
dotenv.config();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRouter);
app.use("/api/user",todoRouter);


app.listen(PORT,()=>{
    connectDb();
    console.log(`connected ${PORT}`);
})