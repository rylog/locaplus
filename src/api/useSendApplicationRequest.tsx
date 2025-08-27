import { useMutation } from '@tanstack/react-query';

import { UploadedFile } from '@/types/UploadedFile';
import { trackEvent } from '@/utils/ga';

export interface ApplicationRequest {
  recipient: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  documents: UploadedFile[];
  language: string;
  reCaptchaToken: string;
}

const sendApplicationRequest = async (quoteRequest: ApplicationRequest) => {
  const response = await fetch('/api/applications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quoteRequest),
  });

  if (!response.ok) {
    trackEvent({
      action: 'form_submit_error',
      category: 'Careers',
      label: 'Careers Form',
    });

    const error = await response.json();
    throw new Error(error.error || 'Failed to send email');
  }

  trackEvent({
    action: 'form_submit_success',
    category: 'Careers',
    label: 'Careers Form',
  });

  return response.json();
};

export const useSendApplicationRequest = () => {
  return useMutation({ mutationFn: sendApplicationRequest });
};
