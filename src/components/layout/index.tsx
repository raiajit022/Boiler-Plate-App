import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();
  
  // Check if the current route is a dashboard route
  const isDashboard = router.pathname.startsWith('/dashboard');
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            MyNextApp
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/features" className="text-gray-600 hover:text-blue-600">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600">
              Pricing
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600">
              Blog
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
              Dashboard
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {!isDashboard ? (
              <>
                <Link href="/auth/signin" className="text-gray-600 hover:text-blue-600">
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button className="text-gray-600 hover:text-blue-600">
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-600 hover:text-blue-600">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link></li>
                <li><Link href="/roadmap" className="text-gray-600 hover:text-blue-600">Roadmap</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link></li>
                <li><Link href="/docs" className="text-gray-600 hover:text-blue-600">Documentation</Link></li>
                <li><Link href="/guides" className="text-gray-600 hover:text-blue-600">Guides</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
                <li><Link href="/careers" className="text-gray-600 hover:text-blue-600">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-600 hover:text-blue-600">Privacy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-blue-600">Terms</Link></li>
                <li><Link href="/cookies" className="text-gray-600 hover:text-blue-600">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} MyNextApp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
