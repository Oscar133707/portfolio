import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, services } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const servicesList: string[] = [];
  if (services?.webDev) servicesList.push('Webbutveckling');
  if (services?.aiAutomation) servicesList.push('AI-Automation');

  try {
    await transporter.sendMail({
      from: `"Kontaktformulär" <${process.env.GMAIL_USER}>`,
      to: 'oscarjohansson07@gmail.com',
      replyTo: email,
      subject: `Ny förfrågan från ${name}`,
      html: `
        <h2>Ny förfrågan från kontaktformuläret</h2>
        <p><strong>Namn:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${servicesList.length > 0 ? `<p><strong>Intresserad av:</strong> ${servicesList.join(', ')}</p>` : ''}
        <p><strong>Meddelande:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
