import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ShopSmart POS',
    short_name: 'ShopSmart',
    description: 'Modern Mobile POS system for Nigerian businesses',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F8F5',
    theme_color: '#0B0F0C',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
