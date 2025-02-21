const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // e.g. your Gmail address
    pass: process.env.EMAIL_PASS, // e.g. your app password or Gmail password
  },
});
const sendPurchaseNotification = async (toEmail, ticketDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Ticket Purchase Confirmation",
    text: `Thank you for your purchase!

Ticket Details:
- Event: ${ticketDetails.event}
- Ticket: ${ticketDetails.name}
- Price: $${ticketDetails.price}
- Quantity: ${ticketDetails.quantity}

Enjoy the event!`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendPurchaseNotification };
