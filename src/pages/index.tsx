import React from 'react';
import { NextSeo } from 'next-seo';
import Layout from '@/components/layout';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Pricing from '@/components/landing/Pricing';
import Testimonials from '@/components/landing/Testimonials';
import CTA from '@/components/landing/CTA';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <Layout>
      <NextSeo
        title="SaaS Starter Kit - The Ultimate SaaS Boilerplate"
        description="Launch your SaaS product quickly with our Next.js boilerplate featuring authentication, payments, email integration, and more."
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <CTA />
      </motion.div>
    </Layout>
  );
};

export default Home;
