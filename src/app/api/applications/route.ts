import { NextRequest, NextResponse } from 'next/server';

import { ApplicationRequest } from '@/api/useSendApplicationRequest';
import { UploadedFile } from '@/types/UploadedFile';

import { getAccessToken, verifyReCaptchaToken } from '../services/authService';
import { sendEmail } from '../services/emailService';
import {
  generateApplicantMessage,
  generateEmployerMessage,
} from '../utils/applications';
import { isValidEmail } from '../utils/emailValidator';

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    const applicationRequest = await req.json();
    const locaplusEmail = process.env.LOCAPLUS_EMAIL;

    const { reCaptchaToken, recipient, documents, language } =
      applicationRequest as ApplicationRequest;

    const isValidReCaptchaToken = await verifyReCaptchaToken(reCaptchaToken);

    if (!isValidReCaptchaToken) {
      return NextResponse.json(
        { error: 'Invalid or expired reCAPTCHA token' },
        { status: 400 },
      );
    }

    // // Validate the applicant email
    if (!recipient || !isValidEmail(recipient)) {
      return NextResponse.json(
        { error: 'Invalid recipient email address' },
        { status: 400 },
      );
    }

    // Validate employer
    if (!locaplusEmail || !isValidEmail(locaplusEmail)) {
      return NextResponse.json(
        { error: 'Invalid sales representative email address' },
        { status: 400 },
      );
    }

    const attachments =
      documents?.map((file: UploadedFile) => ({
        '@odata.type': '#microsoft.graph.fileAttachment',
        name: file.name, // Assuming documents have fileName property
        contentBytes: file.base64, // Assuming documents have base64Content property
      })) || [];

    const applicantMessageContent =
      generateApplicantMessage(applicationRequest);
    const employerMessageContent = generateEmployerMessage(applicationRequest);

    const applicantEmailData = {
      message: {
        subject:
          language === 'fr'
            ? `Merci pour votre candidature – Locaplus`
            : `Votre candidature a été reçue – Locaplus`,
        body: {
          contentType: 'HTML',
          content: applicantMessageContent,
        },
        toRecipients: [
          {
            emailAddress: {
              address: recipient,
            },
          },
        ],
      },
    };

    const employerEmailData = {
      message: {
        subject:
          language === 'fr'
            ? `Nouvelle candidature reçue`
            : `New Application Received`,
        body: {
          contentType: 'HTML',
          content: employerMessageContent,
        },
        toRecipients: [
          {
            emailAddress: {
              address: locaplusEmail,
            },
          },
        ],
        attachments: attachments,
      },
    };

    const accessToken = await getAccessToken();

    await sendEmail(applicantEmailData, accessToken);
    await sendEmail(employerEmailData, accessToken);

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
