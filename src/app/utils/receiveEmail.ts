import nodemailer from 'nodemailer';
// import config from '../config';

export const receiveEmail = async (to:string, subject:string, message:string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, 
      auth: {
        user: 'finalyearproject147@gmail.com',
        pass: 'qgjf jtmu cebz smnj',
      },
    });

    // console.log(from)
    
    await transporter.sendMail({
      from:'finalyearproject147@gmail.com',
      to,
      subject: subject,
      text: message, 
      html: `<div>
      <p> ${message}</p>
      <p>from : ${to}</p>
     </div>`, 
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
