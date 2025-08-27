declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// utils/ga.ts
interface GAEventParams {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

export const trackEvent = ({
  action,
  category,
  label,
  value,
}: GAEventParams) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
