export interface Product {
  _id: string;
  name: string;
  price: number;
  img: string;
  details: string;
}

export interface ProductDetailsItem {
  _id: string;
  name: string;
  price: number;
  img: string;
  details: string;
  // Add other properties of your product here
}

export interface ProductsResponse {
  products: Product[];
  count: number;
}

export interface ProductData {
  name: string;
  price: string;
  details: string;
}

export const fetchProducts = async (page: number, size: number): Promise<ProductsResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products?page=${page}&size=${size}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const fetchProductDetails = async (productId: string): Promise<ProductDetailsItem> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const addProduct = async (productData: ProductData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    throw new Error("Failed to add product");
  }
  return res.json();
};

export const deleteProduct = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete product");
  }
  return res.json();
};