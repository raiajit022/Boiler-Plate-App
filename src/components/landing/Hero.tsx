import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Launch your SaaS <span className="text-blue-600">faster</span> than ever
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              A complete Next.js SaaS boilerplate with authentication, payments,
              email integration, and everything you need to build your product.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup">
                <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-6 py-3 text-center">
                  Get Started
                </span>
              </Link>
              <Link href="/pricing">
                <span className="inline-block bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-md px-6 py-3 border border-gray-300 text-center">
                  View Pricing
                </span>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px]"
          >
            <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/dashboard-preview.png"
                alt="Dashboard Preview"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
