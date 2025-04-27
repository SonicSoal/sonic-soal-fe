// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const method = request.method;


  if (pathname === '/.well-known/xrp-ledger.toml') {
    const headers = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    })

    if (method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers,
      })
    }

    const res = NextResponse.next()
    headers.forEach((value, key) => {
      res.headers.set(key, value)
    })
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/.well-known/xrp-ledger.toml'],
}