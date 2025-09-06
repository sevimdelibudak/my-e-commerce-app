// app/cart/page.tsx
'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { removeItemFromCart, updateItemQuantity } from '@/lib/store/cartSlice'; // Bu satırı değiştir
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const dispatch = useDispatch();
  // useSelector'da RootState tipini doğru kullanın
  const cartItems = useSelector((state: RootState) => state.cart.items); 

  const handleRemoveItem = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateItemQuantity({ id, quantity }));
    }
  };

  // Toplam fiyatı hesaplama
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">Your cart is empty.</div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center bg-white shadow-md rounded-lg p-4">
                <div className="relative w-24 h-24 mr-4 flex-shrink-0">
                  <Image 
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <Link href={`/products/${item.id}`} className="text-lg font-semibold hover:text-blue-600 transition-colors">
                    {item.title}
                  </Link>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="w-16 p-2 border rounded-md text-center"
                  />
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-right text-2xl font-bold">
            Total: ${cartTotal}
          </div>
        </>
      )}
    </div>
  );
}