import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Subscription name is required"], minLength: 2, maxLength: 50, trim: true},
    price: {type: Number, required: [true, "Price is required"], min: 0},
    currency: {type: String, enum: ["USD", "EUR", "GBP"], default: "USD"},
    frequency: {type: String, enum: ["daily", "weekly", "monthly", "yearly"]},
    category: {type: String, enum: ["entertainment", "education", "productivity", "other"], required: true},
    paymentMethod: {type: String, required: true, trim: true},
    status: {type: String, enum: ["active", "canceled", "expired"], default: "active"},
    startDate: {type: Date, required: true, validate: {
        validator: (val) => val <= new Date(),
        message: "Start date cannot be in the future"
        }},
    renewalDate: {type: Date, validate: {
        validator: function(val) {
            return val > this.startDate;
        },
        message: "Renewal date must be after start date"
        }},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true}
}, {timestamps: true});

subscriptionSchema.pre('save', function() {
    if (!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
})

export const Subscription = mongoose.model("Subscription", subscriptionSchema);