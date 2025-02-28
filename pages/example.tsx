import { useRouter } from 'next/router'

export default function ExamplePage() {
  const router = useRouter()
  
  const handleNavigation = () => {
    // Make sure the path is always defined
    const path = '/dashboard' // or get from props/state
    if (path) {
      router.push(path)
    }
  }
} 