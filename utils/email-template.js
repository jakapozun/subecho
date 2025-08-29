export const generateEmailTemplate = ({
    userName,
    subscriptionName,
    renewalDate,
    planName,
    price,
    paymentMethod,
    accountSettingsLink,
    supportLink,
    daysLeft }) => {
    return `<div>
<h1>${subscriptionName}</h1>
</div>`
}