import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Make sure all redirects use valid URL strings
  const url = request.nextUrl.clone()
  if (url.pathname === '/some-path') {
    return NextResponse.redirect(new URL('/other-path', request.url))
  }
} 