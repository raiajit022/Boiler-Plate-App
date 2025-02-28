import React from 'react';
import Head from 'next/head';

const Layout = ({ children, title = 'My Next.js App' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="A basic Next.js app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        {/* Add a header here, like a navigation bar */}
        <nav>
          <a href="/">Home</a> | <a href="/about">About</a>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} My Next.js App</p>
      </footer>
    </div>
  );
};

export default Layout;
