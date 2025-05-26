import Paymentpage from '@/components/Paymentpage';
import React from 'react';

export default async function Username({ params }) {
  const resolvedParams = await params; // ✅ await here
  const username = resolvedParams.username;

  return (
    <>
      <Paymentpage username={username} />
    </>
  );
}
