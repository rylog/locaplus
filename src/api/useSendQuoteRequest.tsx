import { useMutation } from '@tanstack/react-query';

export interface QuoteRequest {
  recipient: string;
  firstName: string;
  lastName: string;
  eventType: string;
  eventDate: string;
  location: string;
  phoneNumber: string;
  message: string;
  language?: string;
  reCaptchaToken: string;
}

const sendQuoteRequest = async (quoteRequest: QuoteRequest) => {
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

export const useSendQuoteRequest = () => {
  return useMutation({ mutationFn: sendQuoteRequest });
};
