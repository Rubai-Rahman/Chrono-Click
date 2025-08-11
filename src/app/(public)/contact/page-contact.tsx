'use client';

import Image from 'next/image';
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
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from 'lucide-react';
import Link from 'next/link';
import { useFormStatus, useFormState } from 'react-dom';
import Container from '@/components/layout/container';
// import { submitContactForm } from '@/app/actions/contactAction';

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

export default function ContactPageContent() {
  // const [state, formAction] = useFormState(submitContactForm, {
  //   success: false,
  //   message: '',
  // });

  return (
    <Container>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-16 mb-16 overflow-hidden shadow-2xl text-white">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Elegant office space background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight font-serif drop-shadow-lg">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow">
            We&apos;d love to hear from you! Whether you have a question about
            our products, need support, or just want to say hello, our team is
            ready to assist.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Link href="#contact-form">Send a Message</Link>
          </Button>
        </div>
      </section>

      {/* Contact Content Section */}
      <section id="contact-form" className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Contact Form Card */}
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
            <form className="space-y-6">
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
                  className="pl-4 pr-4 py-2.5 rounded-md border border-input bg-input/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-0"
                  required
                />
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        {/* Contact Information Card */}
        <Card className="p-8 rounded-3xl shadow-xl border border-border bg-card flex flex-col justify-between">
          <div>
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-3xl font-bold text-foreground font-serif mb-2">
                Contact Information
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Find us or reach out through our direct channels.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    Email Us
                  </h3>
                  <p className="text-muted-foreground">
                    <a
                      href="mailto:support@chronoclick.com"
                      className="hover:underline"
                    >
                      support@chronoclick.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    Call Us
                  </h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+1234567890" className="hover:underline">
                      +1 (234) 567-890
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    Visit Our Office
                  </h3>
                  <p className="text-muted-foreground">
                    123 Timepiece Avenue, <br />
                    Watch City, WC 98765, USA
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    Business Hours
                  </h3>
                  <p className="text-muted-foreground">
                    Mon - Fri: 9:00 AM - 6:00 PM (EST)
                  </p>
                </div>
              </div>
            </CardContent>
          </div>

          {/* Map Placeholder */}
          <div className="mt-8 rounded-xl overflow-hidden shadow-lg border border-border group">
            <Image
              src="/placeholder.svg?height=300&width=600"
              alt="Location Map"
              width={600}
              height={300}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Social Media Links */}
          <div className="mt-8 text-center">
            <h3 className="font-semibold text-foreground text-lg mb-4">
              Connect With Us
            </h3>
            <div className="flex justify-center gap-6">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-7 h-7" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-7 h-7" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-7 h-7" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-7 h-7" />
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </Container>
  );
}
