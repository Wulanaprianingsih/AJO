"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { supabase } from "lib/supabaseClient";
import LoginComponent from "../components/LoginComponent";
import { fetchUserData } from "services/userService";

interface IProps {
  email: string;
  password: string;
}

export default function LoginContainer() {
  const router = useRouter();

  const handleLogin = async (props: IProps) => {
    const { email, password } = props;
    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
      if (authError) throw new Error(authError.message);
      if (!authData.user) throw new Error("User tidak ditemukan.");

      await fetchUserData(authData.user.id);

      message.success("Login berhasil!");

      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        alert("login gagal: " + err.message);
      } else {
        alert("login gagal: Terjadi kesalahan tidak terduga.");
      }
    }
  };

  return <LoginComponent onSubmit={handleLogin} />;
}
