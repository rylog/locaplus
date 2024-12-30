const tenantId = process.env.TENANT_ID; // Azure AD Tenant ID
const clientId = process.env.CLIENT_ID; // Azure AD App Client ID
const clientSecret = process.env.CLIENT_SECRET; // Azure AD App Client Secret

export const getAccessToken = async (): Promise<string> => {
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

export const verifyReCaptchaToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY || '',
          response: token,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('reCAPTCHA API error:', data);
      throw new Error(data['error-codes'] || 'reCAPTCHA verification failed');
    }

    return data.success;
  } catch (error) {
    console.error('Error verifying reCAPTCHA token:', error);
    return false;
  }
};
