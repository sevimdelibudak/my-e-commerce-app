// components/Header.tsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold cursor-pointer">E-Commerce App</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">
                <span className="hover:text-gray-300">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/products">
                <span className="hover:text-gray-300">Products</span>
              </Link>
            </li>
            <li>
              <Link href="/cart">
                <span className="hover:text-gray-300">Cart</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;