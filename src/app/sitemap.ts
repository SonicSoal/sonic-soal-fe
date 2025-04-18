// app/sitemap.ts
import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/auth/sign-in`,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/auth/dashboard`,
      lastModified: now,
    },
  ]
}
