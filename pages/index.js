import Layout from '../components/Layout';
import useCounter from '../hooks/useCounter';
import Link from 'next/link';

export default function Home() {
  const { count, increment } = useCounter();

  return (
    <Layout title="Home">
      <div>
        <h1>Welcome to My Next.js App</h1>
        <p>Get started by editing pages/index.js</p>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
        <Link href="/posts/1">
          <a>Go to Post 1</a>
        </Link>
      </div>
    </Layout>
  )
}
