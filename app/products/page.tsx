// app/products/page.tsx
'use client'; // Bu satırı dosyanın en başına ekleyin

import { useEffect, useState } from 'react'; // useEffect ve useState şimdi Client Component'ta kullanılabilir
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/api';

// Ürün için bir tip tanımı
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string; // Bu alan ürün listesi sayfasında kullanılmayabilir ama genel tip tanımı için iyi
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts: Product[] = await getProducts();
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        
        // Benzersiz kategorileri al (ve 'all' seçeneğini ekle)
        const uniqueCategories = ['all', ...new Set(fetchedProducts.map(p => p.category))];
        setCategories(uniqueCategories);
        
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []); // Bağımlılık dizisi boş, sadece bir kere çalışacak

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Featured Products</h1>

      {/* Kategori Filtreleme */}
      <div className="flex justify-center mb-8 space-x-4 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`py-2 px-4 rounded-lg transition-colors 
              ${selectedCategory === category 
                ? 'bg-blue-500 text-white font-bold' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)} {/* İlk harfi büyük yap */}
          </button>
        ))}
      </div>

      {/* Ürün Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length === 0 && !isLoading ? (
          <div className="col-span-full text-center text-gray-600">No products found in this category.</div>
        ) : (
          filteredProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
                <div className="relative w-full h-48 mb-4">
                  <Image 
                    src={product.image} 
                    alt={product.title} 
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-700 font-bold mb-3">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 flex-grow">{product.category}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}