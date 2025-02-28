import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Card from '../../components/ui/Card';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    excerpt: 'Learn how to build modern web applications with Next.js.',
    date: '2023-06-15',
    author: 'John Doe',
    slug: 'getting-started-with-nextjs'
  },
  {
    id: 2,
    title: 'Using TypeScript with React',
    excerpt: 'How to leverage TypeScript to build type-safe React applications.',
    date: '2023-06-20',
    author: 'Jane Smith',
    slug: 'using-typescript-with-react'
  },
  {
    id: 3,
    title: 'Styling in Next.js Applications',
    excerpt: 'Different approaches to styling your Next.js application.',
    date: '2023-06-25',
    author: 'Alex Johnson',
    slug: 'styling-nextjs-applications'
  }
];

export default function BlogIndex() {
  return (
    <>
      <Head>
        <title>Blog | My Next.js App</title>
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block">
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="text-sm text-gray-500 flex justify-between">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
