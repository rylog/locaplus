import { useMutation } from '@tanstack/react-query';

import { Email } from '../types/email';

const sendEmail = async (email: Email) => {
  const response = await fetch('/api/sendEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send email');
  }

  return response.json();
};

export const useSendEmail = () => {
  return useMutation({ mutationFn: sendEmail });
};
