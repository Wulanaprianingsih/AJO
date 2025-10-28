"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "lib/supabaseClient";
import RegisterComponent from "../components/RegisterComponent";
import { toast } from "react-toastify";

interface IProps {
  email: string;
  password: string;
  nama: string;
}

export function RegisterContainer() {
  const router = useRouter();

  const registerUser = async (props: IProps) => {
    const { email, password, nama } = props;
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "https://ajo-pi.vercel.app/auth/login",
        },
      });

      if (authError) {
        throw new Error(authError.message);
      }
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: data?.user?.id,
          nama: nama,
          email: email,
          role: "user",
        },
      ]);
      router.push(`/auth/confirm-email?email=${encodeURIComponent(email)}`);
      if (insertError) throw new Error(insertError.message);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(
          `Register gagal: ${
            err.message ===
            'duplicate key value violates unique constraint "users_email_key"'
              ? "email telah digunakan"
              : err.message
          }`,
          {
            position: "top-right",
          }
        );
      } else {
        toast.error("Register gagal: terjadi kesalahan tidak terduga", {
          position: "top-right",
        });
      }
    }
  };

  return <RegisterComponent onSubmit={registerUser} />;
}
