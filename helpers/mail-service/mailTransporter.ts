"use server";
import nodemailer from "nodemailer";
import { Buffer } from "buffer";
import { mailService } from "../../config";

// Configure the transporter
const transporter = nodemailer.createTransport({
  host: mailService.host,
  port: Number(mailService.port),
  secure: false, // true for 465, false for other ports
  auth: {
    user: mailService.user,
    pass: mailService.password, // Use environment variables for sensitive info
  },
});

// Function to send emails
export async function sendEmails(
  to: string,
  subject: string,
  html: string,
  imgData?: string // Base64 image data
) {
  try {
    // Define mail options
    const mailOptions: any = {
      from: mailService.user,
      to: to,
      subject: subject,
      html: html,
    };

    // Add image as an attachment if provided
    if (imgData) {
      const buffer = Buffer.from(imgData.split(",")[1], "base64");
      mailOptions.attachments = [
        {
          filename: "invoice.png",
          content: buffer,
          encoding: "base64",
        },
      ];
    }

    // Send email
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    // console.error("Error sending email: ", error);
    return { success: false, error: (error as Error).message };
  }
}