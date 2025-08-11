'use client';

import { ProductType } from '@/api-lib/api-type';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: 'img',
    header: 'Image',
    cell: ({ row }) => {
      const imgUrl = row.getValue<string>('img');

      return (
        <div className="w-12 h-12 relative">
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={row.original.name || 'Product image'}
              fill
              sizes="45px"
              className="rounded object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Product Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
  },
  {
    accessorKey: 'reviews',
    header: 'Reviews',
  },
  {
    accessorKey: 'inStock',
    header: 'In Stock',
    cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
  },
];
