import type { Metadata } from 'next';
import ContactPageContent from './page-contact';

export const metadata: Metadata = {
  title: 'Contact Us - Chrono Click',
  description:
    "Get in touch with Chrono Click for inquiries about premium timepieces, customer support, or any questions about luxury watches. We're here to help.",
  keywords: [
    'contact chrono click',
    'luxury watch support',
    'timepiece customer service',
    'watch store contact',
    'premium watch inquiries',
    'luxury watch help',
    'watch customer support',
    'timepiece assistance',
  ],
};

const ContactPage = () => {
  return <ContactPageContent />;
};

export default ContactPage;
