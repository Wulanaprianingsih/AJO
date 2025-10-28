"use client";

import ConfirmEmail from "modules/auth/components/ConfirmEmail";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return <ConfirmEmail email={email} />;
}
