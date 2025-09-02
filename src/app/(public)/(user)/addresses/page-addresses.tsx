'use client';

import { useState, useMemo } from 'react';
import { Plus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AddressCard } from '@/components/adresses/adresses-card';
import { AddressForm } from '@/components/adresses/adresses-form';

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

const initialAddresses: Address[] = [
  {
    id: '1',
    name: 'Home',
    line1: '123 Main Street',
    line2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'United States',
    isDefault: true,
    type: 'shipping',
  },
  {
    id: '2',
    name: 'Office',
    line1: '456 Business Ave',
    city: 'New York',
    state: 'NY',
    postalCode: '10002',
    country: 'United States',
    isDefault: false,
    type: 'billing',
  },
  {
    id: '3',
    name: "Parents' House",
    line1: '789 Family Lane',
    city: 'Brooklyn',
    state: 'NY',
    postalCode: '11201',
    country: 'United States',
    isDefault: false,
    type: 'shipping',
  },
];

export const AddressesPageContent = () => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Derived state for shipping/billing separation
  const { shippingAddresses, billingAddresses } = useMemo(() => {
    return {
      shippingAddresses: addresses.filter((a) => a.type === 'shipping'),
      billingAddresses: addresses.filter((a) => a.type === 'billing'),
    };
  }, [addresses]);

  /** Handlers **/
  const openForm = (address?: Address) => {
    setEditingAddress(address || null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingAddress(null);
    setIsFormOpen(false);
  };

  const handleDeleteAddress = (id: string) => {
    const addressToDelete = addresses.find((a) => a.id === id);

    if (addressToDelete?.isDefault) {
      toast.error('Cannot delete default address');
      return;
    }

    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success('Address deleted');
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    toast.success('Default address updated');
  };

  const handleSaveAddress = (addressData: Omit<Address, 'id'>) => {
    if (editingAddress) {
      // Update existing
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddress.id
            ? { ...editingAddress, ...addressData }
            : addressData.isDefault
            ? { ...a, isDefault: false }
            : a
        )
      );
      toast.success('Address updated');
    } else {
      // Add new
      const newAddress: Address = {
        ...addressData,
        id: Date.now().toString(),
      };

      setAddresses((prev) =>
        newAddress.isDefault
          ? [newAddress, ...prev.map((a) => ({ ...a, isDefault: false }))]
          : [newAddress, ...prev]
      );

      toast.success('Address added');
    }

    closeForm();
  };

  /** UI Helpers **/
  const renderAddressSection = (
    title: string,
    items: Address[],
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
          <Button onClick={() => openForm()} variant="outline" className="mt-4">
            {buttonLabel}
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={openForm}
              onDelete={handleDeleteAddress}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-card border-b border-border/50">
        <div className="max-w-4xl mx-auto px-6 py-8">
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

            <Button onClick={() => openForm()} size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Address
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {renderAddressSection(
          'Shipping Addresses',
          shippingAddresses,
          'No shipping addresses found',
          'Add Your First Address'
        )}

        {renderAddressSection(
          'Billing Addresses',
          billingAddresses,
          'No billing addresses found',
          'Add Billing Address'
        )}
      </div>

      {/* Address Form Modal */}
      <AddressForm
        address={editingAddress || undefined}
        onSave={handleSaveAddress}
        onCancel={closeForm}
        isOpen={isFormOpen}
      />
    </div>
  );
};
