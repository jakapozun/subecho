import {Router} from "express";
import {authorize} from "../middlewares/auth.middleware.js";
import {
    createSubscription, deleteSubscription,
    getSubscriptionDetails,
    getSubscriptions,
    getUserSubscriptions
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getSubscriptions);

subscriptionRouter.get("/:id", authorize, getSubscriptionDetails)

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions)

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) => {
    res.send({"message": "UPDATE subscription"})
})

subscriptionRouter.put("/:id/cancel", (req, res) => {
    res.send({"message": "CANCEL subscription"})
})

subscriptionRouter.delete("/:id", authorize, deleteSubscription)

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
    res.send({"message": "GET upcoming renewals"})
})

export default subscriptionRouter;