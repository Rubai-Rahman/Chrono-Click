"use client"; // This component uses client-side hooks

import React, { useState } from "react";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner"; // Placeholder for Shadcn UI Spinner
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, deleteProduct, Product as ProductItem } from "@/api-lib/products";

const ManageProductPageContent = () => {
  const [page, setPage] = useState<number>(0);
  const size: number = 12;

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<{
    products: ProductItem[];
    count: number;
  }, Error>({
    queryKey: ["manageProducts", page, size],
    queryFn: () => fetchProducts(page, size),
    keepPreviousData: true,
  });

  const products = data?.products || [];
  const pageCount = data ? Math.ceil(data.count / size) : 0;

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      alert("The item is Deleted. Please Refresh."); // Consider using a more user-friendly notification
      queryClient.invalidateQueries({ queryKey: ["manageProducts"] }); // Invalidate products cache
    },
    onError: (err) => {
      console.error("Error deleting product:", err);
    },
  });

  const handleDelete = (id: string) => {
    deleteProductMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Manage Product</h2>
        <div className="flex justify-center my-4">
          <Spinner size="lg" />
          <Spinner size="lg" />
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500">
        Error: {error?.message}
      </div>
    );
  }

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Manage Product</h2>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white shadow-lg p-3 mb-5 rounded-lg flex flex-col items-center">
              <Image src={product.img} alt={product.name} width={200} height={200} className="object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-4">Price: ${product.price}</p>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(pageCount).keys()].map((number) => (
          <button
            key={number}
            onClick={() => setPage(number)}
            className={`px-4 py-2 rounded-md ${
              number === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default ManageProductPageContent;
