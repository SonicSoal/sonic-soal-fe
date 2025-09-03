// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const allowAllHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
})

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const method = request.method;

  if (pathname.startsWith('/.well-known')) {

    if (method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: allowAllHeaders,
      })
    }

    const res = NextResponse.next()
    allowAllHeaders.forEach((value, key) => {
      res.headers.set(key, value)
    })
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/.well-known'],
}