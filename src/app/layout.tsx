import { Inter } from "next/font/google";
import "./globals.css";
import GlobalLoading from "./GlobalLoading";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata = {
  title: "AJO - Anak Jowo",
  description: "Anak Jowo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-inter antialiased">
        <GlobalLoading>{children}</GlobalLoading>
      </body>
    </html>
  );
}
