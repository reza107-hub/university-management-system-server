import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (
  to: string,
  subject: string,
  message: string,
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: config.EMAIL,
        pass: config.EMAIL_PASS,
      },
    });

    const res = await transporter.sendMail({
      from: 'finalyearproject147@gmail.com',
      to,
      subject: subject,
      text: message,
    });
    return res;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
