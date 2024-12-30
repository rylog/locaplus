export const sendEmail = async (
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
