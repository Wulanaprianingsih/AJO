"use client";
import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
import { Modal } from "antd";
import imgLogo from "assets/images/logo.png";
import { supabase } from "lib/supabaseClient";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const menu = [
    { name: "Beranda", path: "/dashboard", icon: <HomeOutlined /> },
    { name: "Materi", path: "/material", icon: <ReadOutlined /> },
    { name: "Latihan", path: "/exercises", icon: <EditOutlined /> },
    { name: "Peringkat", path: "/leaderboard", icon: <TrophyOutlined /> },
    { name: "Profil", path: "/profile", icon: <UserOutlined /> },
    { name: "Keluar", path: "/logout", icon: <LogoutOutlined /> },
  ];

  const handleLogout = async () => {
    setLogoutModal(false);
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    router.push("/auth/login");
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
          {menu.map((item) => {
            const isActive = pathname.startsWith(item.path);

            const handleClick = () => {
              if (item.name === "Keluar") {
                setLogoutModal(true);
              } else {
                setOpen(false);
                router.push(item.path);
              }
            };

            return (
              <button
                key={item.path}
                onClick={handleClick}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all w-full text-left ${
                  isActive
                    ? "bg-[#E9D4B6] text-[#3A2C1A] shadow-sm"
                    : "hover:bg-[#7A5633] text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </button>
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
        {children}
      </main>
      <Modal
        title={
          <p className="text-[#5E331E] font-semibold">Konfirmasi Keluar</p>
        }
        open={logoutModal}
        onOk={handleLogout}
        onCancel={() => setLogoutModal(false)}
        okText="Ya, Keluar"
        cancelText="Batal"
        centered
        styles={{
          content: {
            backgroundColor: "#FCF8E7",
            color: "#5E331E",
            borderRadius: 16,
          },
          header: {
            backgroundColor: "#FCF8E7",
          },
          footer: {
            backgroundColor: "#FCF8E7",
          },
        }}
        cancelButtonProps={{
          style: {
            color: "#5C3B1E",
            borderColor: "#5C3B1E",
            backgroundColor: "transparent",
          },
        }}
      >
        <p>Apakah kamu yakin ingin keluar dari akun ini?</p>
      </Modal>
    </div>
  );
}
