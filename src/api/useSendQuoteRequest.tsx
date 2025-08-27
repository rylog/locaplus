import { useMutation } from '@tanstack/react-query';

import { trackEvent } from '@/utils/ga';

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
    trackEvent({
      action: 'form_submit_error',
      category: 'Quote',
      label: 'Quote Form',
    });

    const error = await response.json();
    throw new Error(error.error || 'Failed to send email');
  }

  trackEvent({
    action: 'form_submit_success',
    category: 'Quote',
    label: 'Quote Form',
  });

  return response.json();
};

export const useSendQuoteRequest = () => {
  return useMutation({ mutationFn: sendQuoteRequest });
};
