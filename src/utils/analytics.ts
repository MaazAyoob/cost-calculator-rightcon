// ============================================================
// ANALYTICS & EVENT TRACKING UTILITY
// Event dispatchers for GA4, GTM, Meta Pixel & custom funnel metrics
// ============================================================

export type AnalyticsEvent =
  | 'planning_started'
  | 'wizard_step_completed'
  | 'quality_tier_changed'
  | 'brand_selected'
  | 'report_generated'
  | 'pdf_downloaded'
  | 'excel_downloaded'
  | 'csv_downloaded'
  | 'consultation_booked'
  | 'activity_compared';

interface EventPayload {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

export function trackEvent(eventName: AnalyticsEvent, payload: EventPayload = {}): void {
  const timestamp = new Date().toISOString();

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Track] 📊 ${eventName}`, payload);
  }

  // 1. Google Analytics (gtag.js)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      ...payload,
      timestamp,
    });
  }

  // 2. Google Tag Manager Data Layer
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...payload,
      timestamp,
    });
  }

  // 3. Meta / Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('trackCustom', eventName, payload);
  }
}
