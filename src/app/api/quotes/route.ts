import { NextRequest, NextResponse } from 'next/server';
import sanitizeHtml from 'sanitize-html';

import { QuoteRequest, TempoQuoteRequest } from '@/api/useSendQuoteRequest';

import { getAccessToken, verifyReCaptchaToken } from '../services/authService';
import { sendEmail } from '../services/emailService';
import { isValidEmail } from '../utils/emailValidator';
import {
  generateQuotesMessage,
  generateTempoQuotesMessage,
} from '../utils/quotes';

const cleanInput = (input: string) =>
  sanitizeHtml(input, {
    allowedTags: [], // No HTML allowed
    allowedAttributes: {},
  });

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    const rawBody = await req.text(); // Get raw JSON as a string
    const sanitizedBody = cleanInput(rawBody); // Sanitize entire JSON string
    const quoteRequest = JSON.parse(sanitizedBody) as
      | QuoteRequest
      | TempoQuoteRequest; // Parse into an object
    const locaplusEmail = 'ryanlomtl@gmail.com';

    const { reCaptchaToken, recipient, language } = quoteRequest;

    const isValidReCaptchaToken = await verifyReCaptchaToken(reCaptchaToken);

    if (!isValidReCaptchaToken) {
      return NextResponse.json(
        { error: 'Invalid or expired reCAPTCHA token' },
        { status: 400 },
      );
    }

    // // Validate the recipient email
    if (!recipient || !isValidEmail(recipient)) {
      return NextResponse.json(
        { error: 'Invalid recipient email address' },
        { status: 400 },
      );
    }

    // Validate the sales rep email
    if (!locaplusEmail || !isValidEmail(locaplusEmail)) {
      return NextResponse.json(
        { error: 'Invalid sales representative email address' },
        { status: 400 },
      );
    }

    let messageContent: string = '';
    switch (quoteRequest.type) {
      case 'standard':
        messageContent = generateQuotesMessage(quoteRequest);
        break;
      case 'tempo':
        messageContent = generateTempoQuotesMessage(quoteRequest);
        break;
    }

    const emailData = {
      message: {
        subject:
          quoteRequest.type === 'tempo'
            ? language === 'fr'
              ? 'Demande de soumission Tempo reçue'
              : 'Tempo quote request received'
            : language === 'fr'
              ? 'Demande de soumission reçue'
              : 'Quote request received',
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
    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
};
