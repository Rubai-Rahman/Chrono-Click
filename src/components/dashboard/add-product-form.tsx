'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct } from '@/api-lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Package, CheckCircle, Loader2 } from 'lucide-react';

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [success, setSuccess] = useState(false);

  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      setSuccess(true);
      setName('');
      setPrice('');
      setDetails('');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (error) => {
      console.error('Error adding product:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProductMutation.mutate({ name, price, details });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Package className="w-8 h-8 text-primary" />
          Add New Product
        </h1>
        <p className="text-muted-foreground mt-2">
          Create a new product listing for your store
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-semibold text-green-800 dark:text-green-200">
                  Success!
                </p>
                <p className="text-green-700 dark:text-green-300">
                  Product has been added successfully.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium mb-2"
              >
                Product Name *
              </label>
              <Input
                id="productName"
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="productPrice"
                className="block text-sm font-medium mb-2"
              >
                Price *
              </label>
              <Input
                id="productPrice"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="productDetails"
                className="block text-sm font-medium mb-2"
              >
                Details *
              </label>
              <Textarea
                id="productDetails"
                placeholder="Enter product details"
                className="min-h-[120px]"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={addProductMutation.isPending}
              className="w-full"
            >
              {addProductMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding Product...
                </>
              ) : (
                'Add Product'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductForm;
