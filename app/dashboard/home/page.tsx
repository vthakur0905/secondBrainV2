"use client" ;

import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import HomeContent from './homeContent';

export default function PageWrapper() {
  return (
    <Suspense fallback={<div className="p-4 text-white">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}