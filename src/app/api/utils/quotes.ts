import sanitizeHtml from 'sanitize-html';

import { QuoteRequest, TempoQuoteRequest } from '@/api/useSendQuoteRequest';

const cleanInput = (input: string) =>
  sanitizeHtml(input, {
    allowedTags: [], // No HTML allowed
    allowedAttributes: {},
  });

export const generateQuotesMessage = ({
  language,
  firstName,
  lastName,
  eventType,
  eventDate,
  location,
  phoneNumber,
  message,
}: QuoteRequest): string => {
  const safeFirstName = cleanInput(firstName);
  const safeLastName = cleanInput(lastName);
  const safeEventType = cleanInput(eventType);
  const safeEventDate = cleanInput(eventDate);
  const safeLocation = cleanInput(location);
  const safePhoneNumber = cleanInput(phoneNumber);
  const safeMessage = cleanInput(message);

  if (language === 'fr') {
    return `
      <h2>Bonjour ${safeFirstName} ${safeLastName},</h2>
      <p>Merci de nous avoir contactés pour votre événement!</p>
      <p><strong>Type d'évènement :</strong> ${safeEventType}</p>
      <p><strong>Date d'évènement :</strong> ${safeEventDate}</p>
      <p><strong>Emplacement :</strong> ${safeLocation}</p>
      <p><strong>Numéro de téléphone :</strong> ${safePhoneNumber}</p>
      <p><strong>Message :</strong> ${safeMessage}</p>
      <p>Un de nos membres de l'équipe vous répondra sous peu.</p>
      <p>Cordialement,</p>
      <p>Locaplus</p>
    `;
  }

  return `
    <h2>Hello ${safeFirstName} ${safeLastName},</h2>
    <p>Thank you for reaching out to us regarding your event!</p>
    <p><strong>Event Type :</strong> ${safeEventType}</p>
    <p><strong>Event Date :</strong> ${safeEventDate}</p>
    <p><strong>Location :</strong> ${safeLocation}</p>
    <p><strong>Phone Number :</strong> ${safePhoneNumber}</p>
    <p><strong>Message :</strong> ${safeMessage}</p>
    <p>One of our team members will get back to you shortly.</p>
    <p>Best regards,</p>
    <p>Locaplus</p>
  `;
};

export const generateTempoQuotesMessage = ({
  language,
  firstName,
  lastName,
  serviceType,
  location,
  dimensions,
  phoneNumber,
  message,
}: TempoQuoteRequest): string => {
  const safeFirstName = cleanInput(firstName);
  const safeLastName = cleanInput(lastName);
  const safeServiceType = cleanInput(serviceType);
  const safeLocation = cleanInput(location);
  const safeDimensions = cleanInput(dimensions);
  const safePhoneNumber = cleanInput(phoneNumber);
  const safeMessage = cleanInput(message);

  if (language === 'fr') {
    return `
      <h2>Bonjour ${safeFirstName} ${safeLastName},</h2>
      <p>Merci de nous avoir contactés pour votre service Tempo!</p>
      <p><strong>Type de service :</strong> ${safeServiceType}</p>
      <p><strong>Emplacement :</strong> ${safeLocation}</p>
      <p><strong>Dimensions :</strong> ${safeDimensions}</p>
      <p><strong>Numéro de téléphone :</strong> ${safePhoneNumber}</p>
      <p><strong>Message :</strong> ${safeMessage}</p>
      <p>Un de nos membres de l'équipe vous répondra sous peu.</p>
      <p>Cordialement,</p>
      <p>Locaplus</p>
    `;
  }

  return `
    <h2>Hello ${safeFirstName} ${safeLastName},</h2>
    <p>Thank you for reaching out to us regarding your Tempo service!</p>
    <p><strong>Service Type :</strong> ${safeServiceType}</p>
    <p><strong>Location :</strong> ${safeLocation}</p>
    <p><strong>Dimensions :</strong> ${safeDimensions}</p>
    <p><strong>Phone Number :</strong> ${safePhoneNumber}</p>
    <p><strong>Message :</strong> ${safeMessage}</p>
    <p>One of our team members will get back to you shortly.</p>
    <p>Best regards,</p>
    <p>Locaplus</p>
  `;
};
