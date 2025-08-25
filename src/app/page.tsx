'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard or login page
    // You can modify this logic based on your authentication flow
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="text-center">
        <h1>AssetNix</h1>
        <p>Loading...</p>
      </div>
    </div>
  );
}
