// app/.well-known/xrp-ledger.toml/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const revalidate = 900;
export const dynamic = 'force-static';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

// Preflight
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

// GET: proxy + cache upstream for 15 minutes
export async function GET() {
  const upstreamUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    'https://sonicsoal.com/.well-known/xrp-ledger.toml';

  const upstreamRes = await fetch(upstreamUrl);
  if (!upstreamRes.ok) {
    return new NextResponse('Upstream fetch failed', { status: 502 });
  }

  const toml = await upstreamRes.text();
  return new NextResponse(toml, {
    headers: {
      'Content-Type': 'application/toml',
      ...CORS_HEADERS,
    },
  });
}
