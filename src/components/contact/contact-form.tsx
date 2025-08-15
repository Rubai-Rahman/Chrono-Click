'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';

// Component to show pending state for form submission
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground rounded-md shadow-md hover:bg-primary/90 transition-colors duration-200"
      disabled={pending}
    >
      {pending ? (
        <>
          <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
          Sending Message...
        </>
      ) : (
        'Send Message'
      )}
    </Button>
  );
}

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can integrate with your backend API here
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Card className="p-8 rounded-3xl shadow-xl border border-border bg-card">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-3xl font-bold text-foreground font-serif mb-2">
          Send Us a Message
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Fill out the form below and we&apos;ll get back to you as soon as
          possible.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Your Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="pl-4 pr-4 py-2.5 rounded-md border border-input bg-input/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-0"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Your Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleChange}
              className="pl-4 pr-4 py-2.5 rounded-md border border-input bg-input/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-0"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Subject
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="Inquiry about a product"
              value={formData.subject}
              onChange={handleChange}
              className="pl-4 pr-4 py-2.5 rounded-md border border-input bg-input/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-0"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Your Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Type your message here..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="pl-4 pr-4 py-2.5 rounded-md border border-input bg-input/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-0"
              required
            />
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
