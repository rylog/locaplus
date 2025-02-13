import { useMutation } from '@tanstack/react-query';

export interface ApplicationRequest {
  recipient: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  language: string;
  reCaptchaToken: string;
}

const sendApplicationRequest = async (quoteRequest: ApplicationRequest) => {
  const response = await fetch('/api/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quoteRequest),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send email');
  }

  return response.json();
};

export const useSendApplicationRequest = () => {
  return useMutation({ mutationFn: sendApplicationRequest });
};
