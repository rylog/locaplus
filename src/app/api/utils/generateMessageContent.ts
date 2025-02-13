import sanitizeHtml from 'sanitize-html';

interface MessageDetails {
  language: string;
  firstName: string;
  lastName: string;
  eventType: string;
  eventDate: string;
  location: string;
  phoneNumber: string;
  message: string;
}

const cleanInput = (input: string) =>
  sanitizeHtml(input, {
    allowedTags: [], // No HTML allowed
    allowedAttributes: {},
  });

export const generateMessageContent = ({
  language,
  firstName,
  lastName,
  eventType,
  eventDate,
  location,
  phoneNumber,
  message,
}: MessageDetails): string => {
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
      <p>Merci de nous avoir contactés pour votre événement !</p>
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
