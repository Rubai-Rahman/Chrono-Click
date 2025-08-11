import type { Metadata } from 'next';
import ContactPageContent from './page-contact';

export const metadata: Metadata = {
  title: 'Contact Us - Chrono Click',
  description:
    'Learn about Chrono Click, your trusted destination for premium timepieces and luxury watches. Discover our story, mission, and commitment to excellence.',
  keywords: [
    'about chrono click',
    'luxury watch store',
    'premium timepieces',
    'watch company',
    'timepiece experts',
    'watch history',
    'luxury watches',
    'watch craftsmanship',
  ],
};

const ContactPage = () => {
  return <ContactPageContent />;
};

export default ContactPage;
