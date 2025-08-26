import express from 'express';
import {PORT} from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import {connectToDb} from "./database/mongodb.js";

const app  = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscription', subscriptionRouter);

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(PORT, async () => {
    console.log(`server is running on port ${PORT}`)

    await connectToDb();
})