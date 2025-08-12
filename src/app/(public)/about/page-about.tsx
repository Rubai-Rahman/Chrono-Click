import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Handshake, Gem, Clock, ShoppingBag } from 'lucide-react';
import Container from '@/components/layout/container';
import InteractiveCard from './components/interactive-card';
import InteractiveImage from './components/interactive-image';
import { Breadcrumb } from '@/components/navigation/breadcrumb';

const AboutPageContent = () => {
  return (
    <Container>
      <div className="py-6">
        <Breadcrumb />
      </div>
      {/* Hero Section - Emphasizing Timepieces & Experience */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-16 mb-16 overflow-hidden shadow-2xl text-white">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Elegant watch background pattern"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight font-serif drop-shadow-lg">
            The Art of Time, Curated for You
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow">
            At Chrono Click, we are passionate about the intricate beauty and
            precision of timepieces. We meticulously curate a collection of
            premium watches, ensuring every piece tells a story of craftsmanship
            and elegance.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Link href="/shop">Explore Our Collection</Link>
          </Button>
        </div>
      </section>

      {/* Our Story/Philosophy Section - Focus on Curation & Quality */}
      <section className="grid md:grid-cols-2 gap-12 items-center mb-16 bg-card p-8 rounded-3xl shadow-xl border border-border">
        <InteractiveImage
          src="/placeholder.svg?height=400&width=600"
          alt="Watchmaking craftsmanship"
          overlayText="Crafted with Precision"
        />
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-foreground font-serif">
            Our Philosophy: Precision & Passion
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every timepiece at Chrono Click is selected with an eye for detail
            and a deep appreciation for horological excellence. We partner with
            renowned brands and skilled artisans to bring you watches that are
            not just accessories, but heirlooms.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From classic designs to modern marvels, our collection is a
            testament to the enduring appeal of fine watchmaking. We believe in
            providing a transparent and delightful shopping journey, from
            discovery to delivery.
          </p>
        </div>
      </section>

      {/* Why Choose Us / Our Commitments Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-center text-foreground mb-12 font-serif">
          Why Choose Chrono Click?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <InteractiveCard
            icon={<Gem className="w-14 h-14 text-primary mb-4" />}
            title="Unrivaled Quality"
            description="Hand-picked timepieces from trusted manufacturers and artisans."
          />
          <InteractiveCard
            icon={<Clock className="w-14 h-14 text-primary mb-4" />}
            title="Expert Curation"
            description="A carefully selected collection for every style and occasion."
          />
          <InteractiveCard
            icon={<ShoppingBag className="w-14 h-14 text-primary mb-4" />}
            title="Seamless Shopping"
            description="Enjoy a smooth, secure, and delightful online shopping experience."
          />
          <InteractiveCard
            icon={<Handshake className="w-14 h-14 text-primary mb-4" />}
            title="Dedicated Support"
            description="Our team is here to assist you every step of your horological journey."
          />
        </div>
      </section>

      {/* Our Team Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-center text-foreground mb-12 font-serif">
          Meet Our Team
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <Card className="text-center p-6 rounded-xl shadow-lg bg-card border border-border">
            <Avatar className="w-28 h-28 mx-auto mb-4 border-2 border-primary/50 shadow-md">
              <AvatarImage
                src="/placeholder.svg?height=100&width=100"
                alt="John Doe"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold text-foreground">John Doe</h3>
            <p className="text-sm text-muted-foreground">Founder & CEO</p>
          </Card>
          <Card className="text-center p-6 rounded-xl shadow-lg bg-card border border-border">
            <Avatar className="w-28 h-28 mx-auto mb-4 border-2 border-primary/50 shadow-md">
              <AvatarImage
                src="/placeholder.svg?height=100&width=100"
                alt="Jane Appleseed"
              />
              <AvatarFallback>JA</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold text-foreground">
              Jane Appleseed
            </h3>
            <p className="text-sm text-muted-foreground">Head of Curation</p>
          </Card>
          <Card className="text-center p-6 rounded-xl shadow-lg bg-card border border-border">
            <Avatar className="w-28 h-28 mx-auto mb-4 border-2 border-primary/50 shadow-md">
              <AvatarImage
                src="/placeholder.svg?height=100&width=100"
                alt="Michael Smith"
              />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold text-foreground">
              Michael Smith
            </h3>
            <p className="text-sm text-muted-foreground">Logistics Manager</p>
          </Card>
          <Card className="text-center p-6 rounded-xl shadow-lg bg-card border border-border">
            <Avatar className="w-28 h-28 mx-auto mb-4 border-2 border-primary/50 shadow-md">
              <AvatarImage
                src="/placeholder.svg?height=100&width=100"
                alt="Emily Lee"
              />
              <AvatarFallback>EL</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold text-foreground">Emily Lee</h3>
            <p className="text-sm text-muted-foreground">
              Customer Experience Lead
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action - Directing to Products */}
      <section className="text-center bg-gradient-to-br from-primary/20 to-background rounded-3xl p-8 md:p-12 shadow-2xl border border-primary/30">
        <h2 className="text-4xl font-bold text-foreground mb-6 font-serif">
          Discover Your Next Timeless Piece
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Ready to find the perfect watch that complements your style and stands
          the test of time?
        </p>
        <Button
          asChild
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Link href="/shop">Shop Now</Link>
        </Button>
      </section>
    </Container>
  );
};

export default AboutPageContent;
