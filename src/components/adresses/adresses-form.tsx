import { X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CommonFormField, Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { TAddress } from '@/lib/types/api/address-types';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface AddressFormProps {
  defaultAddress?: TAddress;
  onSave: (address: Omit<TAddress, '_id'>) => void;
  onCancel: () => void;
  isOpen: boolean;
  formId: string;
  isLoading: boolean;
}

const AddressSchema = z.object({
  name: z.string().min(1, 'Address name is required'),
  line1: z.string().min(1, 'Address line 1 is required'),
  line2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  isDefault: z.boolean().optional(),
});
const AddressFormSchemaType = zodResolver(AddressSchema);

export const AddressForm = ({
  defaultAddress,
  onCancel,
  isOpen,
  onSave,
  formId,
  isLoading,
}: AddressFormProps) => {
  const form = useForm({
    resolver: AddressFormSchemaType,
    defaultValues: defaultAddress || {
      name: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      isDefault: false,
    },
  });

  console.log('formId', formId);
  if (!isOpen) return null;

  const onFormSubmit = form.handleSubmit((formData) => {
    onSave({
      ...formData,
      isDefault: formData.isDefault ?? false,
    });
  });
  return (
    <div
      key={formId}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <Card
        key={formId}
        className="w-full max-w-md bg-gradient-card shadow-strong border-border/50 overflow-y-auto max-h-[90vh] "
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <CardTitle>
              {defaultAddress ? 'Edit Address' : 'Add New Address'}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="h-8 w-8 hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Form {...form} key={formId}>
            <form id={formId} onSubmit={onFormSubmit} className="space-y-4">
              {/* Address Name */}
              <CommonFormField
                control={form.control}
                name="name"
                label="Address Name"
              >
                {({ field }) => (
                  <Input placeholder="Home, Work, etc." {...field} />
                )}
              </CommonFormField>

              {/* Line 1 */}
              <CommonFormField
                control={form.control}
                name="line1"
                label="Address Line 1"
              >
                {({ field }) => (
                  <Input placeholder="Street address" {...field} />
                )}
              </CommonFormField>

              {/* Line 2 */}
              <CommonFormField
                control={form.control}
                name="line2"
                label="Address Line 2 (Optional)"
              >
                {({ field }) => (
                  <Input placeholder="Apartment, suite, etc." {...field} />
                )}
              </CommonFormField>

              {/* City + State */}
              <div className="grid grid-cols-2 gap-4">
                <CommonFormField
                  control={form.control}
                  name="city"
                  label="City"
                >
                  {({ field }) => <Input {...field} />}
                </CommonFormField>

                <CommonFormField
                  control={form.control}
                  name="state"
                  label="State"
                >
                  {({ field }) => <Input {...field} />}
                </CommonFormField>
              </div>

              {/* Postal Code + Country */}
              <div className="grid grid-cols-2 gap-4">
                <CommonFormField
                  control={form.control}
                  name="postalCode"
                  label="Postal Code"
                >
                  {({ field }) => <Input {...field} />}
                </CommonFormField>

                <CommonFormField
                  control={form.control}
                  name="country"
                  label="Country"
                >
                  {({ field }) => (
                    <Select
                      key={field.value}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">
                          United States
                        </SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">
                          United Kingdom
                        </SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </CommonFormField>
              </div>

              {/* Default Switch */}
              <CommonFormField
                control={form.control}
                name="isDefault"
                label="Set as default address"
                formItemProps={{ className: 'flex items-center gap-2' }}
              >
                {({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              </CommonFormField>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading}
                  loading={isLoading}
                >
                  {defaultAddress ? 'Update Address' : 'Save Address'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
