// app/page.tsx
import { getProducts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

// Bu sayfa sunucu tarafında işlenecek (Server Component)
export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4); // İlk 4 ürünü al

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product: any) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <Link href={`/products/${product.id}`}>
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-lg font-bold mt-2">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}