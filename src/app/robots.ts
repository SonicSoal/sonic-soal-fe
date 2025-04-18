import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: SITE_URL + '/sitemap.xml',
  }
}