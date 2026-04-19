import React from 'react';

type JsonLdValue = string | number | boolean | null | JsonLdValue[] | { [key: string]: JsonLdValue };

interface JsonLdProps {
  data: Record<string, JsonLdValue>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

// Pre-built schema components for common use cases

interface WebSiteSchemaProps {
  name: string;
  description: string;
  url: string;
}

export const WebSiteSchema: React.FC<WebSiteSchemaProps> = ({ name, description, url }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
  };

  return <JsonLd data={data} />;
};

interface LearningResourceSchemaProps {
  name: string;
  description: string;
  url: string;
  learningResourceType: string;
  educationalLevel?: string;
  keywords?: string[];
}

export const LearningResourceSchema: React.FC<LearningResourceSchemaProps> = ({
  name,
  description,
  url,
  learningResourceType,
  educationalLevel = 'Beginner',
  keywords = [],
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name,
    description,
    url,
    learningResourceType,
    educationalLevel,
    keywords: keywords.join(', '),
    provider: {
      '@type': 'Organization',
      name: 'CryptoViz',
    },
  };

  return <JsonLd data={data} />;
};

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageSchemaProps {
  items: FAQItem[];
}

export const FAQPageSchema: React.FC<FAQPageSchemaProps> = ({ items }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
};
