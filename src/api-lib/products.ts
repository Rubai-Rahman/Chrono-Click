import axiosInstance from '@/lib/axios';
import { ProductType } from './api-type';


export interface ProductDetailsItem {
  _id: string;
  name: string;
  price: number;
  img: string;
  details: string;
  quantity?: string;
  // Add other properties of your product here
}

export interface ProductsResponse {
  products: ProductType[];
  count: number;
}

export interface ProductData {
  name: string;
  price: string;
  details: string;
}

export const fetchPages = async (
  page: number,
  size: number,
  path: string
): Promise<ProductsResponse> => {
  const res = await axiosInstance.get(`/${path}?page=${page}&size=${size}`);
  return res.data;
};

export const fetchData = async <T>(path: string): Promise<T> => {
  const res = await axiosInstance.get<T>(`/${path}`);
  return res.data;
};
export const postData = async <T>(path: string, data: T): Promise<T> => {
  const res = await axiosInstance.post<T>(`/${path}`, data);
  return res.data;
};

export const fetchProductDetails = async (
  productId: string
): Promise<ProductDetailsItem> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}`
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

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
