import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendEmail } from './services/emailService';
import { getAccessToken, verifyReCaptchaToken } from './services/authService';
import { isValidEmail } from './utils/emailValidator';
import { generateMessageContent } from './utils/generateMessageContent';

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const quoteRequest = req.body;
    const locaplusEmail = process.env.LOCAPLUS_EMAIL;

    const {
      reCaptchaToken,
      recipient,
      language,
      firstName,
      lastName,
      eventType,
      phoneNumber,
      message,
    } = quoteRequest;

    const isValidReCaptchaToken = await verifyReCaptchaToken(reCaptchaToken);

    if (!isValidReCaptchaToken) {
      return res
        .status(400)
        .json({ error: 'Invalid or expired reCAPTCHA token' });
    }

    // Validate the recipient email
    if (!recipient || !isValidEmail(recipient)) {
      return res.status(400).json({ error: 'Invalid recipient email address' });
    }

    // Validate the sales rep email
    if (!locaplusEmail || !isValidEmail(locaplusEmail)) {
      return res
        .status(400)
        .json({ error: 'Invalid sales representative email address' });
    }

    let messageContent = generateMessageContent({
      language,
      firstName,
      lastName,
      eventType,
      phoneNumber,
      message,
    });

    const emailData = {
      message: {
        subject:
          language === 'fr'
            ? `Demande de soumission reçue`
            : `Quote request received`,
        body: {
          contentType: 'HTML',
          content: messageContent,
        },
        toRecipients: [
          {
            emailAddress: {
              address: recipient,
            },
          },
        ],
        ccRecipients: [
          {
            emailAddress: {
              address: locaplusEmail,
            },
          },
        ],
      },
    };

    const accessToken = await getAccessToken();
    await sendEmail(emailData, accessToken);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error in API route:', error);
    return res.status(500).json({ error: error.message });
  }
};
