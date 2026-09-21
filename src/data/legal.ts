/* Legal page copy. Every [BRACKET] is a placeholder the site owner must
   fill before launch — do not invent values for them.

   The business name, email and phone are NOT redefined here: they come from
   `business` in ./site, so filling them in once fills them in everywhere. */

import { business } from './site';

export interface LegalClause {
  number: string;
  heading: string;
  body: string;
}

export interface LegalPage {
  /** Browser title. */
  title: string;
  /** Meta description. */
  description: string;
  /** Page heading. */
  heading: string;
  lastUpdated: string;
  backLabel: string;
  clauses: LegalClause[];
}

export const terms: LegalPage = {
  title: 'Terms — Tech AI Center',
  description:
    'Terms covering sponsored video production, fees, usage rights and cancellation for brand and agency clients.',
  heading: 'Terms',
  lastUpdated: 'Last updated [DATE]',
  backLabel: '← Back to home',
  clauses: [
    {
      number: '01',
      heading: 'Services provided',
      body: `${business.name} produces sponsored video content, tutorials and product reviews for publication on YouTube, supplied to business clients worldwide on a per-campaign basis.`,
    },
    {
      number: '02',
      heading: 'Engagement and fees',
      body: 'Each campaign is agreed in writing before work begins, covering deliverables, usage rights, deadline and fee. Fees are quoted and invoiced in USD; payment terms are stated on each invoice.',
    },
    {
      number: '03',
      heading: 'Revisions and approval',
      body: `One revision pass is included on the unlisted draft. Editorial control over script and presentation remains with ${business.name}; factual corrections are always accommodated.`,
    },
    {
      number: '04',
      heading: 'Intellectual property and usage rights',
      body: `Produced content remains the property of ${business.name}. Clients receive the usage licence specified in the campaign agreement. Extended or paid-media rights are licensed separately.`,
    },
    {
      number: '05',
      heading: 'Cancellation',
      body: 'Campaigns cancelled after production has begun are invoiced pro rata for work completed. [ADD YOUR OWN CANCELLATION TERM]',
    },
    {
      number: '06',
      heading: 'Governing law',
      body: 'These terms are governed by the laws of the Islamic Republic of Pakistan. [CONFIRM THIS WITH YOUR ACCOUNTANT OR LAWYER]',
    },
    {
      number: '07',
      heading: 'Contact',
      body: `${business.name}, Islamabad, Pakistan. ${business.email} · ${business.phone}`,
    },
  ],
};

export const privacy: LegalPage = {
  title: 'Privacy — Tech AI Center',
  description:
    'What the enquiry form collects, why it is collected, how long it is kept and how to have it deleted.',
  heading: 'Privacy',
  lastUpdated: 'Last updated [DATE]',
  backLabel: '← Back to home',
  clauses: [
    {
      number: '01',
      heading: 'What this site collects',
      body: 'The enquiry form collects your name, company, work email and the message you send. The site collects nothing else about you.',
    },
    {
      number: '02',
      heading: 'Why it is collected',
      body: 'Solely to reply to your enquiry and to agree a campaign. It is never used for marketing.',
    },
    {
      number: '03',
      heading: 'How long it is kept',
      body: 'Enquiries are kept for [NUMBER] years and then deleted.',
    },
    {
      number: '04',
      heading: 'Who it is shared with',
      body: 'Nobody. Enquiry data is not sold, rented or passed to third parties.',
    },
    {
      number: '05',
      heading: 'Analytics',
      body: '[STATE WHICH ANALYTICS THIS SITE USES, OR WRITE: this site uses no analytics and sets no cookies]',
    },
    {
      number: '06',
      heading: 'Your rights and contact',
      body: `Email ${business.email} to request a copy of your data or to have it deleted. ${business.name}, Islamabad, Pakistan.`,
    },
  ],
};
