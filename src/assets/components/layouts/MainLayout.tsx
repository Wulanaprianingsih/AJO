"use client";
import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MenuOutlined,
  CloseOutlined,
  HomeOutlined,
  ReadOutlined,
  TrophyOutlined,
  UserOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Popconfirm, Spin } from "antd";
import imgLogo from "assets/images/logo.png";
import { supabase } from "lib/supabaseClient";
import { useUserStore } from "store/userDataStore";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const userData = useUserStore((s) => s.userProfile);
  const role = userData?.role;

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <HomeOutlined /> },
    { name: "Belajar", path: "/belajar", icon: <ReadOutlined /> },
    { name: "Materi", path: "/materi", icon: <ReadOutlined /> },
    { name: "Latihan", path: "/latihan", icon: <EditOutlined /> },
    { name: "Peringkat", path: "/peringkat", icon: <TrophyOutlined /> },
    { name: "Profil", path: "/profil", icon: <UserOutlined /> },
    { name: "Keluar", path: "/logout", icon: <LogoutOutlined /> },
  ];

  const filteredMenu = menu.filter((item) => {
    if (role === "admin") {
      return ["Dashboard", "Materi", "Latihan", "Profil", "Keluar"].includes(
        item.name
      );
    } else {
      return ["Dashboard", "Belajar", "Peringkat", "Profil", "Keluar"].includes(
        item.name
      );
    }
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    window.location.href = "/auth/login";
  };

  return (
    <div className="flex min-h-screen bg-[#EFEAD8] text-[#3A2C1A]">
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-full md:h-auto bg-[#5C3B1E] text-white flex flex-col items-center py-8 px-4 rounded-3xl shadow-md transition-transform duration-300 w-60 m-0 md:m-4
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <button
          className="absolute top-4 right-4 md:hidden text-white text-xl"
          onClick={() => setOpen(false)}
        >
          <CloseOutlined />
        </button>

        <div className="mb-8 text-center">
          <div className="bg-[#E9D4B6] rounded-full p-2 mx-auto w-24 h-24 flex items-center justify-center shadow-sm">
            <Image
              src={imgLogo}
              alt="Logo"
              width={80}
              height={80}
              className="rounded-full object-contain"
            />
          </div>
          <p className="mt-2 text-sm">AJO (Anak Jowo)</p>
        </div>

        <nav className="flex flex-col gap-3 w-full">
          {filteredMenu.map((item) => {
            const isActive = pathname.startsWith(item.path);

            return item.name !== "Keluar" ? (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all w-full text-left ${
                  isActive
                    ? "bg-[#E9D4B6] text-[#3A2C1A] shadow-sm"
                    : "hover:bg-[#7A5633] text-white"
                }`}
                onClick={() => setOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ) : (
              <Popconfirm
                title="Konfirmasi Keluar"
                description="Apakah kamu yakin ingin keluar dari akun ini?"
                okText="Ya"
                cancelText="Tidak"
                onConfirm={handleLogout}
                classNames={{ root: "custom-popconfirm" }}
                key="popup-logout"
              >
                <button
                  key={item.path}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all w-full text-left hover:bg-[#7A5633] text-white"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              </Popconfirm>
            );
          })}
        </nav>

        <div className="mt-auto text-xs opacity-80 pt-4">©2025</div>
      </aside>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-40"
        />
      )}
      <main className="flex-1 p-4 md:px-8 md:py-6 w-full">
        <button
          onClick={() => setOpen(true)}
          className="md:hidden mb-4 text-[#5C3B1E] text-2xl"
        >
          <MenuOutlined />
        </button>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-full">
              <Spin size="large" />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
    </div>
  );
}
