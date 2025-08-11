'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  Award,
  Users,
  Globe,
  Heart,
  Shield,
  Truck,
  Star,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

const stats = [
  {
    icon: Clock,
    value: '15+',
    label: 'Years of Excellence',
    description: 'Serving watch enthusiasts worldwide',
  },
  {
    icon: Users,
    value: '50K+',
    label: 'Happy Customers',
    description: 'Trusted by timepiece lovers globally',
  },
  {
    icon: Award,
    value: '200+',
    label: 'Premium Brands',
    description: 'Curated collection of luxury watches',
  },
  {
    icon: Globe,
    value: '100+',
    label: 'Countries Served',
    description: 'Worldwide shipping and support',
  },
];

const values = [
  {
    icon: Heart,
    title: 'Passion for Timepieces',
    description:
      'We live and breathe watches. Every piece in our collection is carefully selected for its craftsmanship, heritage, and timeless appeal.',
  },
  {
    icon: Shield,
    title: 'Authenticity Guaranteed',
    description:
      'Every watch comes with a certificate of authenticity. We work directly with authorized dealers to ensure genuine products.',
  },
  {
    icon: Star,
    title: 'Expert Curation',
    description:
      'Our team of horological experts handpicks each timepiece, ensuring only the finest watches make it to our collection.',
  },
  {
    icon: Truck,
    title: 'Premium Service',
    description:
      'From secure packaging to white-glove delivery, we ensure your timepiece arrives in perfect condition.',
  },
];

const team = [
  {
    name: 'Alexander Chen',
    role: 'Founder & CEO',
    image: '/team/ceo.jpg',
    description: 'Horological expert with 20+ years in luxury timepieces',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Head of Curation',
    image: '/team/curator.jpg',
    description: "Former Sotheby's watch specialist and certified horologist",
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Customer Experience Director',
    image: '/team/cx.jpg',
    description: 'Ensuring every customer receives exceptional service',
  },
];

const milestones = [
  {
    year: '2008',
    title: 'The Beginning',
    description:
      'Founded with a vision to make luxury timepieces accessible to watch enthusiasts worldwide.',
  },
  {
    year: '2012',
    title: 'Global Expansion',
    description:
      'Expanded to serve customers in over 50 countries with premium shipping and support.',
  },
  {
    year: '2016',
    title: 'Digital Innovation',
    description:
      'Launched our award-winning e-commerce platform with virtual try-on technology.',
  },
  {
    year: '2020',
    title: 'Sustainability Focus',
    description:
      'Introduced eco-friendly packaging and carbon-neutral shipping options.',
  },
  {
    year: '2024',
    title: 'Premium Experience',
    description:
      'Launched personalized concierge service and exclusive member benefits.',
  },
];

const AboutPageContent = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit">
                  Since 2008
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Crafting Time,{' '}
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Creating Legacy
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  At Chrono Click, we believe that a watch is more than just a
                  timekeeper—it's a statement of style, a mark of achievement,
                  and a companion for life's most precious moments.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/products">
                    Explore Collection
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#story">Learn Our Story</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/about/hero-watch.jpg"
                  alt="Luxury timepiece collection"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold">
                    {stat.value}
                  </div>
                  <div className="font-semibold">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold">Our Story</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded in 2008 by horological enthusiast Alexander Chen,
                  Chrono Click began as a passion project to share the artistry
                  and craftsmanship of fine timepieces with fellow watch lovers
                  around the world.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  What started as a small boutique has grown into a globally
                  recognized destination for luxury watches, serving over 50,000
                  customers across 100+ countries. Yet, our core mission remains
                  unchanged: to provide authentic, exceptional timepieces with
                  unparalleled service.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Why Choose Chrono Click?
                </h3>
                <div className="space-y-3">
                  {[
                    'Authenticated luxury timepieces from authorized dealers',
                    'Expert curation by certified horologists',
                    'Comprehensive warranty and after-sales service',
                    'Secure worldwide shipping with insurance',
                    'Personalized customer support and consultation',
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/about/story-image.jpg"
                  alt="Watch craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do, from selecting
              timepieces to serving our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center h-full">
                <CardHeader className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From a small passion project to a global destination for luxury
              timepieces.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
                    }`}
                  >
                    <Card className="inline-block">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{milestone.year}</Badge>
                          <CardTitle className="text-lg">
                            {milestone.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10 w-4 h-4 bg-primary rounded-full border-4 border-background" />
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate experts dedicated to bringing you the finest timepieces
              and exceptional service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden">
                <div className="aspect-square relative bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-16 h-16 text-primary/50" />
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-12 text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Ready to Find Your Perfect Timepiece?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explore our curated collection of luxury watches and discover
                  the timepiece that speaks to your style and story.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/products">
                    Browse Collection
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Contact Our Experts</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AboutPageContent;
