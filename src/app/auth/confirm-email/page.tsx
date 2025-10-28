"use client";

import ConfirmEmail from "modules/auth/components/ConfirmEmail";

interface PageProps {
  searchParams: { email?: string | string[] };
}

export default function ConfirmEmailPage({ searchParams }: PageProps) {
  const email = Array.isArray(searchParams.email)
    ? searchParams.email[0]
    : searchParams.email || "";

  return <ConfirmEmail email={email} />;
}
