"use client";

import { Suspense } from "react";
import ConfirmEmail from "modules/auth/components/ConfirmEmail";
import { useSearchParams } from "next/navigation";

function ConfirmEmailWrapper() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  if (!email) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Email tidak ditemukan. Silakan kembali ke halaman sebelumnya.</p>
      </div>
    );
  }

  return <ConfirmEmail email={email} />;
}

export default function ConfirmEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <p>Memuat halaman...</p>
        </div>
      }
    >
      <ConfirmEmailWrapper />
    </Suspense>
  );
}
