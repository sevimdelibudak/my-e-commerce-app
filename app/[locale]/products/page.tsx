// app/products/page.tsx
"use client";
import { useTranslations } from 'next-intl';
import { useEffect, useState, useCallback } from 'react';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/api';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

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

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handlePriceRangeChange = useCallback((type: 'min' | 'max', value: number) => {
    setCurrentPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedCategory('all');
    setCurrentPriceRange({ min: priceRange.min, max: priceRange.max });
    setSortBy('default');
  }, [priceRange.min, priceRange.max]);

  if (isLoading) {
    return <div className="text-center mt-10">{t('loading')}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">{t('title')}</h1>
      {/* Filter Section */}
      <div className="bg-white/80 p-7 rounded-2xl mb-10 shadow flex flex-col gap-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kategori Filtreleme */}
          <div>
            <h3 className="text-base font-semibold mb-2 text-gray-700 tracking-wide uppercase">{t('categories')}</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`py-2 px-4 rounded-full border text-sm font-semibold shadow-sm transition-all duration-200
                    ${selectedCategory === category 
                      ? 'bg-blue-500 text-white border-blue-500 scale-105 shadow-md' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700'
                    }`}
                >
                  {t('category.' + category) || (category.charAt(0).toUpperCase() + category.slice(1))}
                </button>
              ))}
            </div>
          </div>
          {/* Fiyat Aralığı */}
          <div>
            <h3 className="text-base font-semibold mb-2 text-gray-700 tracking-wide uppercase">{t('priceRange')}</h3>
            <div className="space-y-3">
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1 font-medium">{t('minPrice')}</label>
                  <input
                    type="number"
                    value={currentPriceRange.min === 0 ? '' : currentPriceRange.min}
                    onFocus={e => {
                      if (e.target.value === '0') {
                        e.target.value = '';
                        handlePriceRangeChange('min', 0);
                      }
                    }}
                    onChange={e => {
                      let val = e.target.value.replace(/^0+(?=\d)/, '');
                      handlePriceRangeChange('min', val === '' ? 0 : Number(val));
                    }}
                    min={priceRange.min}
                    max={priceRange.max}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800 font-semibold shadow-sm transition"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1 font-medium">{t('maxPrice')}</label>
                  <input
                    type="number"
                    value={currentPriceRange.max === 0 ? '' : currentPriceRange.max}
                    onFocus={e => {
                      if (e.target.value === '0') {
                        e.target.value = '';
                        handlePriceRangeChange('max', 0);
                      }
                    }}
                    onChange={e => {
                      let val = e.target.value.replace(/^0+(?=\d)/, '');
                      handlePriceRangeChange('max', val === '' ? 0 : Number(val));
                    }}
                    min={priceRange.min}
                    max={priceRange.max}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800 font-semibold shadow-sm transition"
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {t('priceRangeLabel', { min: currentPriceRange.min, max: currentPriceRange.max })}
              </div>
            </div>
          </div>
          {/* Sıralama */}
          <div>
            <h3 className="text-base font-semibold mb-2 text-gray-700 tracking-wide uppercase">{t('sortBy')}</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800 font-semibold shadow-sm transition"
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
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 pt-4 border-t border-gray-100 gap-2">
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 underline font-semibold"
          >
            {t('resetFilters')}
          </button>
          <div className="text-xs text-gray-500 font-medium">
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
            <ProductCard key={product.id} product={product} locale={typeof window !== 'undefined' ? window.location.pathname.split('/')[1] || 'tr' : 'tr'} />
          ))
        )}
      </div>
    </div>
  );
}