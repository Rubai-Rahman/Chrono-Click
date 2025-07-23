/**
 * Spacing Guide Component
 * Use this component to visualize and test spacing consistency
 * Remove this file in production or keep it for development reference
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SpacingGuide = () => {
  return (
    <div className="container-base section-md">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Spacing System Guide</h1>
        <p className="text-muted-foreground">
          Consistent spacing patterns for stable UI components
        </p>
      </div>

      <div className="space-y-8">
        {/* Container Patterns */}
        <Card>
          <CardHeader>
            <CardTitle>Container Patterns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Badge variant="outline">container-base</Badge>
              <p className="text-sm text-muted-foreground">
                Standard container with responsive padding: container mx-auto
                px-4 sm:px-6 lg:px-8
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">container-narrow</Badge>
              <p className="text-sm text-muted-foreground">
                Narrow container for content: max-w-4xl
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">container-wide</Badge>
              <p className="text-sm text-muted-foreground">
                Wide container for full sections: max-w-7xl
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section Spacing */}
        <Card>
          <CardHeader>
            <CardTitle>Section Spacing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Badge variant="outline">section-sm</Badge>
              <p className="text-sm text-muted-foreground">
                Small sections: py-8 sm:py-12
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">section-md</Badge>
              <p className="text-sm text-muted-foreground">
                Medium sections (most common): py-12 sm:py-16 lg:py-20
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">section-lg</Badge>
              <p className="text-sm text-muted-foreground">
                Large sections: py-16 sm:py-20 lg:py-24
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">section-xl</Badge>
              <p className="text-sm text-muted-foreground">
                Extra large sections: py-20 sm:py-24 lg:py-32
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card Spacing */}
        <Card>
          <CardHeader>
            <CardTitle>Card Spacing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Badge variant="outline">card-padding-sm</Badge>
              <p className="text-sm text-muted-foreground">
                Small card padding: p-4 sm:p-6
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">card-padding-md</Badge>
              <p className="text-sm text-muted-foreground">
                Medium card padding: p-6 sm:p-8
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">card-padding-lg</Badge>
              <p className="text-sm text-muted-foreground">
                Large card padding: p-8 sm:p-10 lg:p-12
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Gap Patterns */}
        <Card>
          <CardHeader>
            <CardTitle>Gap Patterns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Badge variant="outline">gap-responsive-sm</Badge>
              <p className="text-sm text-muted-foreground">
                Small responsive gap: gap-3 sm:gap-4
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">gap-responsive-md</Badge>
              <p className="text-sm text-muted-foreground">
                Medium responsive gap: gap-4 sm:gap-6
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">gap-responsive-lg</Badge>
              <p className="text-sm text-muted-foreground">
                Large responsive gap: gap-6 sm:gap-8
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Standard Page Section</h4>
              <code className="text-sm bg-muted p-2 rounded block">
                {`<section className="section-md">
  <div className="container-base">
    <!-- content -->
  </div>
</section>`}
              </code>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Product Grid</h4>
              <code className="text-sm bg-muted p-2 rounded block">
                {`<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-responsive-md">
  <!-- products -->
</div>`}
              </code>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Card Component</h4>
              <code className="text-sm bg-muted p-2 rounded block">
                {`<Card>
  <CardContent className="card-padding-md">
    <!-- content -->
  </CardContent>
</Card>`}
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpacingGuide;
