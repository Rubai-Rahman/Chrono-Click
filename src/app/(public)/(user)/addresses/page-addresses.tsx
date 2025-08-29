'use client';
import { useState } from 'react';
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

// Mock data for demonstration
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

  const handleAddAddress = () => {
    setEditingAddress(null);
    setIsFormOpen(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const handleDeleteAddress = (id: string) => {
    const addressToDelete = addresses.find((addr) => addr.id === id);
    if (addressToDelete?.isDefault) {
      toast.error('Cannot delete default address');
      return;
    }

    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    toast.error('Address deleted');
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );

    toast.error('Default address updated');
  };

  const handleSaveAddress = (addressData: Omit<Address, 'id'>) => {
    if (editingAddress) {
      // Update existing address
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id
            ? { ...addressData, id: editingAddress.id }
            : addressData.isDefault
            ? { ...addr, isDefault: false }
            : addr
        )
      );
      toast.error('Address updated');
    } else {
      // Add new address
      const newAddress: Address = {
        ...addressData,
        id: Date.now().toString(),
      };

      if (addressData.isDefault) {
        setAddresses((prev) => [
          newAddress,
          ...prev.map((addr) => ({ ...addr, isDefault: false })),
        ]);
      } else {
        setAddresses((prev) => [newAddress, ...prev]);
      }

      toast.error('Address added');
    }

    setIsFormOpen(false);
    setEditingAddress(null);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  const shippingAddresses = addresses.filter(
    (addr) => addr.type === 'shipping'
  );
  const billingAddresses = addresses.filter((addr) => addr.type === 'billing');

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

            <Button onClick={handleAddAddress} size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Address
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Shipping Addresses */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Shipping Addresses
            </h2>
            <span className="text-sm text-muted-foreground">
              ({shippingAddresses.length})
            </span>
          </div>

          {shippingAddresses.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed border-muted">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No shipping addresses found
              </p>
              <Button
                onClick={handleAddAddress}
                variant="outline"
                className="mt-4"
              >
                Add Your First Address
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {shippingAddresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onEdit={handleEditAddress}
                  onDelete={handleDeleteAddress}
                  onSetDefault={handleSetDefault}
                />
              ))}
            </div>
          )}
        </div>

        {/* Billing Addresses */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Billing Addresses
            </h2>
            <span className="text-sm text-muted-foreground">
              ({billingAddresses.length})
            </span>
          </div>

          {billingAddresses.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed border-muted">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No billing addresses found
              </p>
              <Button
                onClick={handleAddAddress}
                variant="outline"
                className="mt-4"
              >
                Add Billing Address
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {billingAddresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onEdit={handleEditAddress}
                  onDelete={handleDeleteAddress}
                  onSetDefault={handleSetDefault}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Address Form Modal */}
      <AddressForm
        address={editingAddress || undefined}
        onSave={handleSaveAddress}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
      />
    </div>
  );
};
