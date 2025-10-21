"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "lib/supabaseClient";
import RegisterComponent from "../components/RegisterComponent";

interface IProps {
  email: string
  password: string
  nama: string
}

export function RegisterContainer() {
  const router = useRouter();

  const registerUser = async (props: IProps) => {
    const { email, password, nama } = props
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'http://localhost:3000/auth/login',
        },
      })
     
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

      if (insertError) throw new Error(insertError.message);

      router.push("/auth/login");
    } catch (err) {
      if (err instanceof Error) {
        alert("Register gagal: " + err.message);
      } else {
        alert("Register gagal: Terjadi kesalahan tidak terduga.");
      }
    }
  };

  return <RegisterComponent onSubmit={registerUser} />;
}
