"use client";

import ConfirmEmail from "modules/auth/components/ConfirmEmail";

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ConfirmEmailPage({ searchParams }: PageProps) {
  const emailParam = searchParams?.email;
  const email = Array.isArray(emailParam) ? emailParam[0] : emailParam || "";

  return <ConfirmEmail email={email} />;
}
