import { ApplicationRequest } from '@/api/useSendApplicationRequest';

export const generateApplicantMessage = ({
  firstName,
  lastName,
  language,
}: ApplicationRequest): string => {
  if (language === 'fr') {
    return `
        <h2>Bonjour ${firstName} ${lastName},</h2>
        <p>Merci d'avoir soumis votre candidature à <strong>Locaplus</strong></p>
        <p>Notre équipe examinera votre candidature avec attention et nous vous contacterons si votre profil correspond à nos besoins actuels.</p>
        <p>Merci encore de votre intérêt pour Locaplus, et au plaisir de vous lire bientôt !</p>
        <p><strong>L’équipe Locaplus</strong></p>
      `;
  }

  return `
      <h2>Hello ${firstName} ${lastName},</h2>
      <p>Thank you for submitting your application to <strong>Locaplus</strong></p>
      <p>Our team will review your application carefully and will contact you if your profile matches our current needs.</p>
      <p>Thank you again for your interest in Locaplus, and we look forward to hearing from you soon!</p>
      <p><strong>The Locaplus Team</strong></p>
    `;
};

export const generateEmployerMessage = ({
  firstName,
  lastName,
  phoneNumber,
  recipient,
  language,
}: ApplicationRequest): string => {
  if (language === 'fr') {
    return `
        <h2>Nouvelle candidature reçue</h2>
        <p>Vous avez reçu une nouvelle candidature pour le poste chez <strong>Locaplus</strong>. Voici les détails :</p>
        <ul>
          <li><strong>Prénom :</strong> ${firstName}</li>
          <li><strong>Nom :</strong> ${lastName}</li>
          <li><strong>Numéro de téléphone :</strong> ${phoneNumber}</li>
          <li><strong>Email :</strong> ${recipient}</li>
        </ul>
      `;
  }

  return `
      <h2>New Application Received</h2>
      <p>You have received a new application for the position at <strong>Locaplus</strong>. Below are the details:</p>
      <ul>
        <li><strong>First Name:</strong> ${firstName}</li>
        <li><strong>Last Name:</strong> ${lastName}</li>
        <li><strong>Phone Number:</strong> ${phoneNumber}</li>
        <li><strong>Email:</strong> ${recipient}</li>
      </ul>
    `;
};
