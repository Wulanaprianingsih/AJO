"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "lib/supabaseClient";
import LoginComponent from "../components/LoginComponent";
import { fetchUserData } from "services/userService";
import { toast } from "react-toastify";

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

      router.push("/dashboard");
      toast.success("Login berhasil", {
        position: "top-right",
      });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Login gagal: ${+err.message}`, {
          position: "top-right",
        });
      } else {
        toast.error("Login gagal: Terjadi kesalahan tidak terduga", {
          position: "top-right",
        });
      }
    }
  };

  return <LoginComponent onSubmit={handleLogin} />;
}
