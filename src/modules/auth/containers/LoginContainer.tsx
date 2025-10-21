"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { supabase } from "lib/supabaseClient";
import LoginComponent from "../components/LoginComponent";
import { useUserStore } from "store/userDataStore";

interface IProps {
  email: string
  password: string
}

export default function LoginContainer() {
  const router = useRouter();
  const setSelectedCourse = useUserStore((s) => s.setUserProfile);

  
  const handleLogin = async (props: IProps) => {
    const { email, password } = props
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      console.log('authData', authData)
      if (authError) throw new Error(authError.message);
      if (!authData.user) throw new Error("User tidak ditemukan.");
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .maybeSingle();

      if (userError) throw new Error(userError.message);
      setSelectedCourse(userData)
      message.success("Login berhasil!");

      console.log("Role user:", userData);

      router.push("/beranda");
    } catch (err) {
      if (err instanceof Error) {
        alert("Register gagal: " + err.message);
      } else {
        alert("Register gagal: Terjadi kesalahan tidak terduga.");
      }
    }
  };

  return <LoginComponent onSubmit={handleLogin} />;
}
