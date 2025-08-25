

export interface ProductData {
  name: string;
  price: string;
  details: string;
}

export const addProduct = async (productData: ProductData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    throw new Error('Failed to add product');
  }
  return res.json();
};

export const deleteProduct = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
    {
      method: 'DELETE',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to delete product');
  }
  return res.json();
};
