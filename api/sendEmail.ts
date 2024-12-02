// api/sendEmail.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { to, subject, text, html } = req.body;

    // Set up the transporter to use Outlook's SMTP server
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: 'ryanlomtl@outlook.com',
        pass: 'Rylo7868office!!',
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'ryanlomtl@outlook.com', // Your Outlook email address
      to: 'recipient-email@example.com', // The recipient email address
      subject: 'Test Email from Nodemailer',
      text: 'This is a test email sent from Nodemailer using Outlook.',
      html: '<p>This is a test email sent from <b>Nodemailer</b> using Outlook.</p>',
    };

    try {
      // Send the email using the defined transporter
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.log(error);
      console.error('Error sending email:', error);
      res.status(500).json({ error: error });
    }
  } else {
    // If the HTTP method is not POST, return 405 Method Not Allowed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
