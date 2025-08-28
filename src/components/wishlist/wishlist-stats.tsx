import { DollarSign, Package, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  iconBg?: string;
  delay?: number;
}

const StatCard = ({
  title,
  value,
  icon,
  description,
  iconBg = 'bg-gradient-to-br from-primary to-primary/80',
  className,
  ...props
}: StatCardProps) => (
  <div
    className={cn(
      'group relative overflow-hidden bg-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg',
      'border border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]',
      'opacity-0 animate-fade-in-up',
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1.5">
          {title}
        </p>
        <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          {value}
        </p>
        {description && (
          <p className="text-xs text-muted-foreground mt-1.5">{description}</p>
        )}
      </div>
      <div
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg',
          'transition-all duration-300 group-hover:scale-105',
          iconBg
        )}
      >
        {icon}
      </div>
    </div>
  </div>
);

interface WishlistStatsProps {
  filteredCount: number;
  totalCount: number;
  inStockCount: number;
  totalValue: number;
  className?: string;
}

export function WishlistStats({
  filteredCount,
  totalCount,
  inStockCount,
  totalValue,
  className,
}: WishlistStatsProps) {
  const averageValue = filteredCount > 0 ? totalValue / filteredCount : 0;
  const inStockPercentage =
    filteredCount > 0 ? (inStockCount / filteredCount) * 100 : 0;

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 transition-opacity duration-400 delay-100',
        className
      )}
    >
      <StatCard
        title="Total Items"
        value={filteredCount}
        description={`of ${totalCount} total`}
        icon={<Package className="h-6 w-6" />}
        iconBg="bg-gradient-to-br from-blue-500 to-blue-400"
        className="animate-delay-[100ms]"
      />
      <StatCard
        title="In Stock"
        value={inStockCount}
        description={`${Math.round(inStockPercentage)}% available`}
        icon={<Check className="h-6 w-6" />}
        iconBg="bg-gradient-to-br from-green-500 to-emerald-400"
        className="animate-delay-[200ms]"
      />
      <StatCard
        title="Total Value"
        value={new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(totalValue)}
        description={`Avg: ${new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(averageValue)}`}
        icon={<DollarSign className="h-6 w-6" />}
        iconBg="bg-gradient-to-br from-purple-500 to-indigo-400"
        className="animate-delay-[300ms]"
      />
    </div>
  );
}
