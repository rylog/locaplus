interface MessageDetails {
  language?: string;
  firstName: string;
  lastName: string;
  eventType: string;
  eventDate: string;
  location: string;
  phoneNumber: string;
  message: string;
}

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
  if (language === 'fr') {
    return `
      <h2>Bonjour ${firstName} ${lastName},</h2>
      <p>Merci de nous avoir contactés pour votre événement !</p>
      <p><strong>Type d'évènement :</strong> ${eventType}</p>
      <p><strong>Date d'évènement :</strong> ${eventDate}</p>
      <p><strong>Emplacement :</strong> ${location}</p>
      <p><strong>Numéro de téléphone :</strong> ${phoneNumber}</p>
      <p><strong>Message :</strong> ${message}</p>
      <p>Un de nos membres de l'équipe vous répondra sous peu.</p>
      <p>Cordialement,</p>
      <p>Locaplus</p>
    `;
  }

  return `
    <h2>Hello ${firstName} ${lastName},</h2>
    <p>Thank you for reaching out to us regarding your event!</p>
    <p><strong>Event Type :</strong> ${eventType}</p>
    <p><strong>Event Date :</strong> ${eventDate}</p>
    <p><strong>Location :</strong> ${location}</p>
    <p><strong>Phone Number :</strong> ${phoneNumber}</p>
    <p><strong>Message :</strong> ${message}</p>
    <p>One of our team members will get back to you shortly.</p>
    <p>Best regards,</p>
    <p>Locaplus</p>
  `;
};
