"use client";
import Image from "next/image";
import React from "react";
import imgAuth from "assets/images/auth_illustration.png";

import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterFormData,
} from "../validations/RegisterValidation";
import Inputs from "assets/components/Inputs";

type IProps = {
  onSubmit: (data: RegisterFormData) => void;
};

export default function RegisterComponent({ onSubmit }: IProps) {
  const router = useRouter();

  const { handleSubmit, control, formState } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      nama: "",
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex flex-col md:flex-row w-screen min-h-screen bg-[#EFEAD8]">
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <div className="w-4/5">
          <Image
            src={imgAuth}
            alt="Register Illustration"
            width={500}
            height={500}
            className="object-contain mx-auto"
          />
        </div>
      </div>

      <div className="flex w-full md:w-1/2 min-h-screen justify-center">
        <div className="flex flex-col justify-center w-4/5 max-w-md py-10">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#5E331E]">
            Buat Akun
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Controller
              name="nama"
              control={control}
              render={({ field, fieldState }) => (
                <Inputs
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  label="Nama Lengkap"
                  placeholder="Masukkan nama lengkap"
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Inputs
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  label="Email"
                  placeholder="Masukkan email"
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Inputs
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  label="Kata Sandi"
                  placeholder="Masukkan kata sandi"
                  type="password"
                  error={fieldState.error?.message}
                />
              )}
            />

            <Button
              type="primary"
              block
              className="mt-2 w-full"
              htmlType="submit"
              disabled={!formState.isValid}
            >
              Daftar
            </Button>

            <div className="flex justify-center items-center gap-1 text-center">
              <span className="text-[#5E331E]">Sudah punya akun?</span>
              <Button
                type="link"
                onClick={() => router.push("/auth/login")}
                style={{
                  color: "#A52A2A",
                  fontWeight: "bold",
                  padding: 0,
                  lineHeight: "1",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                }}
                className="hover:text-[#A52A2A]"
              >
                Masuk
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
