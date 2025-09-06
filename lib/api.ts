// lib/api.ts

// Fake Store API'nin temel adresi
const API_URL = "https://fakestoreapi.com";

// Tüm ürünleri çekmek için asenkron bir fonksiyon
export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

// Belirli bir ID'ye sahip ürünü çekmek için asenkron bir fonksiyon
export const getProductById = async (id: number) => {
  const res = await fetch(`${API_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
};