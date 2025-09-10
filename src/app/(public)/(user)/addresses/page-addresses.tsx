'use client';

import { useState, useTransition } from 'react';
import { Plus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AddressCard } from '@/components/adresses/adresses-card';
import { AddressForm } from '@/components/adresses/adresses-form';
import Container from '@/components/layout/container';
import { TAddress } from '@/lib/types/api/address-types';
import { addressAction } from '@/app/actions/addressAction';

type AddressFormValues = TAddress | Omit<TAddress, '_id'>;

export const AddressesPageContent = ({
  addresses,
}: {
  addresses: TAddress[];
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [address, setAddress] = useState<TAddress>();
  const [formId, setFormId] = useState<string>('create');
  const [isPending, startTransition] = useTransition();
  /** Handlers **/

  console.log('addresses', addresses);
  const handleEditAddress = (address: TAddress) => {
    setAddress(address);
    if (address._id) {
      setIsFormOpen(true);
      setFormId(`edit-${address._id}`);
    }
  };
  const toggleForm = () => {
    setFormId('create');
    setAddress(undefined);
    setIsFormOpen(!isFormOpen);
  };

  const handleDeleteAddress = (_id: string) => {
    console.log('id', _id);
    toast.success('Address deleted');
  };

  const handleSubmitAddressForm = (data: AddressFormValues) => {
    startTransition(async () => {
      setIsFormOpen(false);
      try {
        const result = await addressAction(data);
        if (result.success) {
          toast.success('Address saved');
        }
      } catch (error) {
        toast.error('Failed to save address');
      }
      console.log('data', data);
      // Clear address after submit
      setAddress(undefined);
    });
  };
  /** UI Helpers **/
  const renderAddressSection = (
    title: string,
    items: TAddress[],
    emptyMsg: string,
    buttonLabel: string
  ) => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <span className="text-sm text-muted-foreground">({items.length})</span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed border-muted">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">{emptyMsg}</p>
          <Button
            onClick={() => toggleForm()}
            variant="outline"
            className="mt-4"
          >
            {buttonLabel}
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Container>
      {/* Header */}
      <div className="bg-gradient-card border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                My Addresses
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your shipping and billing addresses
              </p>
            </div>
          </div>

          <Button onClick={() => toggleForm()} size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Address
          </Button>
        </div>

        {/* Content */}
        <div className="w-full py-8">
          {renderAddressSection(
            'Shipping Addresses',
            addresses,
            'No shipping addresses found',
            'Add Your First Address'
          )}
        </div>

        {/* Address Form Modal */}
        <AddressForm
          key={formId}
          defaultAddress={address}
          onSave={handleSubmitAddressForm}
          onCancel={toggleForm}
          isOpen={isFormOpen}
          formId={formId}
          isLoading={isPending}
        />
      </div>
    </Container>
  );
};
