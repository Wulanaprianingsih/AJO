import ConfirmEmail from "modules/auth/components/ConfirmEmail";

interface PageProps {
  searchParams: { email?: string | string[] };
}

export default async function ConfirmEmailPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const email = Array.isArray(params.email)
    ? params.email[0]
    : params.email || "";

  return <ConfirmEmail email={email} />;
}
