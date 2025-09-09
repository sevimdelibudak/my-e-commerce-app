import { getProductById } from "@/lib/api";
import { type Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ productId: string }> }): Promise<Metadata> {
  try {
    const { productId } = await params;
    const product = await getProductById(Number(productId));
    return {
      title: `${product.title} | E-Commerce App`,
      description: product.description.substring(0, 150) + '...',
      openGraph: {
        title: `${product.title} | E-Commerce App`,
        description: product.description.substring(0, 150) + '...',
        images: [product.image],
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found | E-Commerce App",
      description: "The requested product could not be found.",
    };
  }
}
