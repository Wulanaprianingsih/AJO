import { z } from "zod";

export const registerSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  email: z
    .string()
    .min(1, "Email wajib diisi!")
    .email({ message: "Email tidak valid!" }),
  password: z
    .string()
    .refine((val) => val.length > 0, { message: "Kata sandi wajib diisi!" })
    .refine((val) => val.length >= 6, {
      message: "Kata sandi minimal 6 karakter!",
    }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
