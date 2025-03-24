import * as nodemailer from "nodemailer";

export async function sendEmail(subject: string, body: string, attachments: any[] = []) {
    const SENDER_EMAIL = "automationreport477@gmail.com";
    const SENDER_PASSWORD = "jepgjwtiwkdblajf";
    const RECEIVER_EMAIL = "test@gmail.com";

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: SENDER_EMAIL,
            pass: SENDER_PASSWORD,
        },
    });

    const mailOptions: any = {
        from: SENDER_EMAIL,
        to: RECEIVER_EMAIL,
        subject: subject,
        text: body,
        attachments: attachments, // Send attachments
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error(`Failed to send email: ${error}`);
    }
}
