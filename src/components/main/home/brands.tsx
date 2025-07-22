'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, Award, Sparkles } from 'lucide-react';

// Static brand data
const brands = [
  {
    id: 1,
    name: 'Rolex',
    logo: '/brands/rolex.png',
    description: 'Swiss luxury watchmaker',
    established: '1905',
    specialty: 'Luxury Timepieces',
    featured: true,
  },
  {
    id: 2,
    name: 'Omega',
    logo: '/brands/omega.png',
    description: 'Precision Swiss watchmaking',
    established: '1848',
    specialty: 'Sports & Luxury',
    featured: true,
  },
  {
    id: 3,
    name: 'TAG Heuer',
    logo: '/brands/tag-heuer.png',
    description: 'Swiss avant-garde since 1860',
    established: '1860',
    specialty: 'Sports Chronographs',
    featured: false,
  },
  {
    id: 4,
    name: 'Breitling',
    logo: '/brands/breitling.png',
    description: 'Instruments for professionals',
    established: '1884',
    specialty: 'Aviation Watches',
    featured: true,
  },
  {
    id: 5,
    name: 'Seiko',
    logo: '/brands/seiko.png',
    description: 'Japanese precision and innovation',
    established: '1881',
    specialty: 'Innovation & Quality',
    featured: false,
  },
  {
    id: 6,
    name: 'Casio',
    logo: '/brands/casio.png',
    description: 'Technology and durability',
    established: '1946',
    specialty: 'Digital & Sports',
    featured: false,
  },
];

const Brands = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Crown className="w-4 h-4" />
            Premium Partners
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-primary">Brands</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We partner with the world&apos;s most prestigious watch manufacturers to
            bring you exceptional timepieces that define luxury and precision.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <Card
                key={brand.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-8 text-center">
                  {/* Brand Logo */}
                  <div className="relative w-24 h-24 mx-auto mb-6 bg-background rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Crown className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Brand Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="text-2xl font-bold">{brand.name}</h3>
                      {brand.featured && (
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>

                    <p className="text-muted-foreground">{brand.description}</p>

                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        Est. {brand.established}
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1 bg-primary/5 text-primary px-3 py-1 rounded-full text-sm">
                      <Sparkles className="w-3 h-3" />
                      {brand.specialty}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-muted-foreground">Premium Brands</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">150+</div>
              <div className="text-muted-foreground">
                Years Combined Heritage
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-muted-foreground">Authentic Timepieces</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
