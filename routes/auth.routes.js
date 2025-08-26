import {Router} from "express";

const authRouter = Router();

authRouter.get("/sign-up" , (req, res) => {
    res.send({"message": "sign-up route"})
})

export default authRouter;