"use client";

import ConfirmEmail from "modules/auth/components/ConfirmEmail";
import { useSearchParams } from "next/navigation";

export default function ConfirmEmailPage() {
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
