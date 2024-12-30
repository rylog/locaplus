export interface QuoteRequest {
  recipient: string;
  firstName: string;
  lastName: string;
  eventType: string;
  phoneNumber: string;
  message: string;
  language?: string;
  reCaptchaToken: string;
}