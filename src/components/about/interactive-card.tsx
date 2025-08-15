'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

interface InteractiveCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const InteractiveCard = ({
  icon,
  title,
  description,
}: InteractiveCardProps) => {
  return (
    <Card className="text-center p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-card border border-border transform hover:-translate-y-1">
      <CardHeader className="flex flex-col items-center p-0 mb-4">
        <div className="animate-pulse-subtle">{icon}</div>
        <CardTitle className="text-xl font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default InteractiveCard;
