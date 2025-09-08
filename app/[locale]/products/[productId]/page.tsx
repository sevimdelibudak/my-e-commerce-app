// app/products/[productId]/page.tsx
import { getProductById } from "@/lib/api";
import ProductDetailClient from "./ProductDetailClient";
import { Metadata } from 'next'; // Metadata türünü import et

// Ürün için bir tip tanımı
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

// Server Component: Metadata burada oluşturulur.
export async function generateMetadata({ params }: { params: Promise<{ productId: string }> }): Promise<Metadata> {
  const { productId } = await params;
  try {
    const product = await getProductById(Number(productId));
    return {
      title: product.title,
      description: product.description.substring(0, 150) + '...',
    };
  } catch (error) {
    console.error("Failed to generate metadata:", error);
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  let product: Product | null = null;
  try {
    product = await getProductById(Number(productId));
  } catch (error) {
    console.error("Failed to fetch product on server:", error);
    // Hata durumunda bir fallback UI gösterebiliriz.
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center mt-10">
        Product not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <ProductDetailClient product={product} />
    </div>
  );
}