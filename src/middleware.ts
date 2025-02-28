import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow all requests in local development
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: []  // Empty matcher to disable middleware in development
};
