import { MapPin, Edit, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TAddress } from '@/lib/types/api/address-types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

interface AddressCardProps {
  address: TAddress;
  onEdit: (address: TAddress) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export const AddressCard = ({
  address,
  onEdit,
  onDelete,
  isDeleting,
}: AddressCardProps) => {
  return (
    <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-smooth border-border/50">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">{address.name}</h3>
          </div>

          {address.isDefault && (
            <Badge
              variant="secondary"
              className="bg-success-light text-success font-medium flex items-center gap-1"
            >
              <Star className="w-3 h-3" />
              Default
            </Badge>
          )}
        </div>

        {/* Address Info */}
        <div className="text-muted-foreground space-y-1">
          <p>{address.line1}</p>
          {address.line2 && <p>{address.line2}</p>}
          <p>
            {address.city}, {address.state} {address.postalCode}
          </p>
          <p>{address.country}</p>
        </div>

        {/* Actions */}
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

            {address._id && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isDeleting}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Address</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this address? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(address._id!)}
                      className="bg-destructive text-white hover:bg-destructive/80"
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
