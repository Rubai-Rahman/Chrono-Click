'use client';
import Link from 'next/link';
import { Button } from '../ui/button';

const CtaSection = () => {
  return (
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
  );
};

export default CtaSection;
