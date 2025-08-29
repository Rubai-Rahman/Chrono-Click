import { MapPin, Edit, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Address {
  id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  type: 'shipping' | 'billing';
}

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export const AddressCard = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) => {
  return (
    <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-smooth border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">{address.name}</h3>
          </div>

          <div className="flex items-center gap-2">
            {address.isDefault && (
              <Badge
                variant="secondary"
                className="bg-success-light text-success font-medium"
              >
                <Star className="w-3 h-3 mr-1" />
                Default
              </Badge>
            )}

            <Badge
              variant="outline"
              className={`${
                address.type === 'shipping'
                  ? 'border-primary/30 text-primary'
                  : 'border-muted-foreground/30 text-muted-foreground'
              }`}
            >
              {address.type === 'shipping' ? 'Shipping' : 'Billing'}
            </Badge>
          </div>
        </div>

        <div className="text-muted-foreground space-y-1">
          <p>{address.line1}</p>
          {address.line2 && <p>{address.line2}</p>}
          <p>
            {address.city}, {address.state} {address.postalCode}
          </p>
          <p>{address.country}</p>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(address)}
              className="hover:border-primary/50"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(address.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>

          {!address.isDefault && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSetDefault(address.id)}
              className="text-primary hover:text-primary hover:bg-primary/10"
            >
              <Star className="w-4 h-4 mr-1" />
              Set Default
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
