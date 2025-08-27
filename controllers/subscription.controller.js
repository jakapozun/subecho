import {Subscription} from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })

        res.status(201).json({success: true, data: subscription});
    }catch (error) {
        next(error);
    }
}

export const getSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({success: true, data: subscriptions});
    }catch (error) {
        next(error);
    }
}

export const getSubscriptionDetails = async (req, res, next) => {
    try {
        const existingSubscription = await Subscription.findById(req.params.id);
        if (!existingSubscription){
            const error = new Error("Subscription not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json({success: true, data: existingSubscription});
    } catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if(req.user._id !== req.params.id){
            const error = new Error("Forbidden: You can only access your own subscriptions");
            error.status = 403;
            throw error;
        }

        const existingSubscriptions = await Subscription.find({user: req.params.id});
        if (!existingSubscriptions || existingSubscriptions.length === 0){
            const error = new Error("No subscriptions found for this user");
            error.status = 404;
            throw error;
        }

        res.status(200).json({success: true, data: existingSubscriptions});
    } catch (error) {
        next(error);
    }
}

export const deleteSubscription = async (req, res, next) => {
    try {
        const existingSubscription = await Subscription.findById(req.params.id);
        if (!existingSubscription){
            const error = new Error("Subscription not found");
            error.status = 404;
            throw error;
        }

        if (existingSubscription.user.toString() !== req.user._id.toString()){
            const error = new Error("Forbidden: You can only delete your own subscriptions");
            error.status = 403;
            throw error;
        }

        await existingSubscription.deleteOne();
        res.status(200).json({success: true, message: "Subscription deleted successfully"});
    } catch (error) {
        next(error);
    }
}