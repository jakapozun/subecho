import {createRequire} from "module";

const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');
import {Subscription} from "../models/subscription.model.js";
import dayjs from "dayjs";
import {sendReminderEmail} from "../utils/send-email.js";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscriptions(context, subscriptionId);

    if (!subscription || subscription.status !== "active") return;

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log("renewal date has passed subscription")
        return;
    }

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
        }

        if (dayjs().isSame(reminderDate, 'day')) {
            await triggerReminder(context, `Reminder ${daysBefore} days before`, subscription);
        }
    }
});

const fetchSubscriptions = async (context, subscriptionId) => {
    return await context.run('get subscriptions', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}

const sleepUntilReminder = async (context, label, date) => {
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        await sendReminderEmail({
            to: subscription.user.email,
            type: label
        })
    })
}