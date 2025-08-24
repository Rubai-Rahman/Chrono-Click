import { ProductType } from '@/api-lib/api-type';
import { fetchProductById } from '@/data/product/product';
import { Metadata } from 'next';
import ProductDetailPageContent from './page-product-detail';

export async function generateMetadata({
  params,
}: {
  params: { category: string; id: string };
}): Promise<Metadata> {
  const { id } = params; // just destructure normally
  try {
    const product = await fetchProductById<ProductType>(`/products/${id}`, {
      next: { tags: ['products'] },
    });

    return {
      title: product?.name ?? 'Product not found',
      description: product?.description ?? 'View product details',
      openGraph: {
        title: product?.name,
        description: product?.description,
        images: product?.img ? [{ url: product.img }] : [],
      },
    };
  } catch {
    return {
      title: 'Product not found',
      description: 'This product does not exist',
    };
  }
}

export default async function ProductPage({
  params,
}: {
  params: { category: string; id: string };
}) {
  const { id } = await params;

  return <ProductDetailPageContent id={id} />;
}
