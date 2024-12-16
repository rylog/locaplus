import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

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

  console.log(params.toString());

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
    };
  },
  accessToken: string,
) => {
  const response = await fetch(
    'https://graph.microsoft.com/v1.0/users/Contact@Locapluscanada.onmicrosoft.com/sendMail',
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
    console.log('body', req.body);
    const emailData = req.body; // Validate and sanitize this input as needed

    const message = {
      message: {
        subject: emailData.subject,
        body: {
          contentType: 'Text',
          content: emailData.body,
        },
        toRecipients: [
          {
            emailAddress: {
              address: emailData.recipient,
            },
          },
        ],
      },
      from: {
        emailAddress: {
          address: 'no-reply@locaplus.net',
        },
      },
    };

    console.log('message', message);
    console.log('toRecipients', emailData.recipient);
    const accessToken = await getAccessToken();
    await sendEmail(message, accessToken);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: error.message });
  }
};
