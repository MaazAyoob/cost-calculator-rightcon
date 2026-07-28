import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "Cost Calculator | Home Construction Planning & Estimation",
  description = "Configure every aspect of your home before construction begins. Deterministic IS-code cost estimates, material quantities, BOQ, and payment roadmaps.",
  canonicalUrl = "https://costcalculator.app/",
}) => {
  useEffect(() => {
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
  }, [title, description, canonicalUrl]);

  return null;
};
