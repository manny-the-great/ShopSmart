'use client';

// This page redirects to the new /home page
// The old /products route is kept for backward compatibility
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/home');
  }, [router]);
  return null;
}
