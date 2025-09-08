// app/products/page.tsx
'use client';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/api';

// Ürün için tip tanımı
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

// Sıralama seçenekleri
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export default function ProductsPage() {
  const t = useTranslations('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
  const [currentPriceRange, setCurrentPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState<SortOption>('default');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts: Product[] = await getProducts();
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        
        // Benzersiz kategorileri al
        const uniqueCategories = ['all', ...new Set(fetchedProducts.map(p => p.category))];
        setCategories(uniqueCategories);
        
        // Fiyat aralığını hesapla
        const prices = fetchedProducts.map(p => p.price);
        const minPrice = Math.floor(Math.min(...prices));
        const maxPrice = Math.ceil(Math.max(...prices));
        setPriceRange({ min: minPrice, max: maxPrice });
        setCurrentPriceRange({ min: minPrice, max: maxPrice });
        
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Filtreleme ve sıralama işlemi
  useEffect(() => {
    let filtered = products;

    // Kategori filtresi
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Fiyat aralığı filtresi
    filtered = filtered.filter(p => 
      p.price >= currentPriceRange.min && p.price <= currentPriceRange.max
    );

    // Sıralama
    switch (sortBy) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Default sıralama (orijinal sıra)
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, currentPriceRange, sortBy, products]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: number) => {
    setCurrentPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setCurrentPriceRange({ min: priceRange.min, max: priceRange.max });
    setSortBy('default');
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  return (
    <div className="container mx-auto p-4">
  <h1 className="text-4xl font-bold text-center mb-8">{t('title')}</h1>

      {/* Filter Section */}

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kategori Filtreleme */}
          <div>
            <h3 className="text-lg font-semibold mb-3">{t('categories')}</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`py-2 px-4 rounded-lg transition-colors text-sm
                    ${selectedCategory === category 
                      ? 'bg-blue-500 text-white font-bold' 
                      : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-300'
                    }`}
                >
                  {t('category.' + category) || (category.charAt(0).toUpperCase() + category.slice(1))}
                </button>
              ))}
            </div>
          </div>

          {/* Fiyat Aralığı */}
          <div>
            <h3 className="text-lg font-semibold mb-3">{t('priceRange')}</h3>
            <div className="space-y-3">
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">{t('minPrice')}</label>
                  <input
                    type="number"
                    value={currentPriceRange.min}
                    onChange={(e) => handlePriceRangeChange('min', Number(e.target.value))}
                    min={priceRange.min}
                    max={priceRange.max}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">{t('maxPrice')}</label>
                  <input
                    type="number"
                    value={currentPriceRange.max}
                    onChange={(e) => handlePriceRangeChange('max', Number(e.target.value))}
                    min={priceRange.min}
                    max={priceRange.max}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {t('priceRangeLabel', { min: currentPriceRange.min, max: currentPriceRange.max })}
              </div>
            </div>
          </div>

          {/* Sıralama */}
          <div>
            <h3 className="text-lg font-semibold mb-3">{t('sortBy')}</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">{t('sort.default')}</option>
              <option value="price-asc">{t('sort.priceAsc')}</option>
              <option value="price-desc">{t('sort.priceDesc')}</option>
              <option value="name-asc">{t('sort.nameAsc')}</option>
              <option value="name-desc">{t('sort.nameDesc')}</option>
            </select>
          </div>
        </div>

        {/* Reset ve Sonuçlar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 pt-4 border-t border-gray-200 gap-2">
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
          >
            {t('resetFilters')}
          </button>
          <div className="text-sm text-gray-600">
            {t('showingProducts', { count: filteredProducts.length, total: products.length })}
          </div>
        </div>
      </div>

      {/* Ürün Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length === 0 && !isLoading ? (
          <div className="col-span-full text-center text-gray-600 py-12">
            <div className="text-xl mb-2">{t('noProductsFound')}</div>
            <div className="text-sm">{t('tryAdjustingFilters')}</div>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-full">
                <div className="relative w-full h-48 mb-4">
                  <Image 
                    src={product.image} 
                    alt={product.title} 
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 flex-grow">{product.title}</h3>
                <p className="text-xl font-bold text-blue-600 mb-2">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 capitalize">{t('category.' + product.category) || product.category}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}