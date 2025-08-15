import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Container from '@/components/layout/container';
import InteractiveCard from '../../../components/about/interactive-card';
import InteractiveImage from '../../../components/about/interactive-image';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { aboutCards, teamMembers } from '@/lib/constant';
import CtaSection from '@/components/about/about-cta-section';

const AboutPageContent = () => {
  return (
    <Container>
      <div className="py-6">
        <Breadcrumb />
      </div>
      {/* Hero Section - Emphasizing Timepieces & Experience */}
      <section className="relative bg-gradient-to-br from-background to-card/40 rounded-3xl p-8 md:p-16 mb-16 overflow-hidden shadow-2xl text-white">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/about_hero_bg.webp"
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
        </div>
      </section>

      {/* Our Story/Philosophy Section - Focus on Curation & Quality */}
      <section className="grid md:grid-cols-2 gap-12 items-center mb-16 bg-card p-8 rounded-3xl shadow-xl border border-border">
        <InteractiveImage
          src="/about.webp"
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
          {aboutCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <InteractiveCard
                key={index}
                icon={<IconComponent className="w-14 h-14 text-primary mb-4" />}
                title={card.title}
                description={card.description}
              />
            );
          })}
        </div>
      </section>

      {/* Our Team Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-center text-foreground mb-12 font-serif">
          Meet Our Team
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="text-center p-6 rounded-xl shadow-lg bg-card border border-border"
            >
              <Avatar className="w-28 h-28 mx-auto mb-4 border-2 border-primary/50 shadow-md">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground">{member.position}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action - Directing to Products */}
      <CtaSection />
    </Container>
  );
};

export default AboutPageContent;
