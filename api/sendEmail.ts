import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

// Simple email validation regex
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const tenantId = process.env.TENANT_ID; // Azure AD Tenant ID
const clientId = process.env.CLIENT_ID; // Azure AD App Client ID
const clientSecret = process.env.CLIENT_SECRET; // Azure AD App Client Secret

const getAccessToken = async (): Promise<string> => {
  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  if (tenantId == null || clientId == null || clientSecret == null) {
    return '';
  }
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'https://graph.microsoft.com/.default',
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Failed to fetch access token:', error);
    throw new Error(error.error_description || 'Unable to fetch access token');
  }

  const data = await response.json();
  return data.access_token;
};

const sendEmail = async (
  emailData: {
    message: {
      subject: string;
      body: {
        contentType: string;
        content: string;
      };
      toRecipients: {
        emailAddress: {
          address: string;
        };
      }[];
      ccRecipients?: {
        emailAddress: {
          address: string;
        };
      }[]; // Optional CC field
    };
  },
  accessToken: string,
) => {
  const response = await fetch(
    'https://graph.microsoft.com/v1.0/users/no-reply@locaplus.net/sendMail',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    console.error('Failed to send email:', error);
    throw new Error(error.error.message || 'Failed to send email');
  }
};

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const emailData = req.body; // Validate and sanitize this input as needed
    const recipientEmail = emailData.recipient;
    const locaplusEmail = process.env.LOCAPLUS_EMAIL; // Get sales rep email from env variable
    const language = emailData.language || 'en'; // Default to English if no language is provided

    // Validate the recipient email
    if (!recipientEmail || !isValidEmail(recipientEmail)) {
      return res.status(400).json({ error: 'Invalid recipient email address' });
    }

    // Validate the sales rep email
    if (!locaplusEmail || !isValidEmail(locaplusEmail)) {
      return res
        .status(400)
        .json({ error: 'Invalid sales representative email address' });
    }

    // Create the email content based on the language
    let messageContent = '';
    if (language === 'fr') {
      messageContent = `
        <h2>Bonjour ${emailData.firstName} ${emailData.lastName},</h2>
        <p>Merci de nous avoir contactés pour votre événement !</p>
        <p><strong>Type d'événement :</strong> ${emailData.eventType}</p>
        <p><strong>Numéro de téléphone :</strong> ${emailData.phoneNumber}</p>
        <p><strong>Message :</strong> ${emailData.message}</p>
        <p>Un de nos membres de l'équipe vous répondra sous peu.</p>
        <p>Cordialement,</p>
        <p>Locaplus</p>
      `;
    } else {
      messageContent = `
        <h2>Hello ${emailData.firstName} ${emailData.lastName},</h2>
        <p>Thank you for reaching out to us regarding your event!</p>
        <p><strong>Event Type:</strong> ${emailData.eventType}</p>
        <p><strong>Phone Number:</strong> ${emailData.phoneNumber}</p>
        <p><strong>Message:</strong> ${emailData.message}</p>
        <p>One of our team members will get back to you shortly.</p>
        <p>Best regards,</p>
        <p>Locaplus</p>
      `;
    }

    const message = {
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
              address: recipientEmail,
            },
          },
        ],
        ccRecipients: [
          {
            emailAddress: {
              address: locaplusEmail, // Sales rep CC'd
            },
          },
        ],
      },
    };

    const accessToken = await getAccessToken();
    await sendEmail(message, accessToken);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error in API route:', error);
    return res.status(500).json({ error: error.message });
  }
};
