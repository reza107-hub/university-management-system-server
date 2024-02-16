import nodemailer from 'nodemailer';
import config from '../config';

export const receiveEmail = async (
  from: string,
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

    await transporter.sendMail({
      from,
      to: 'finalyearproject147@gmail.com',
      subject: subject,
      text: message,
      html: `<div>
      <p> ${message}</p>
      <p>from : ${from}</p>
     </div>`,
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
