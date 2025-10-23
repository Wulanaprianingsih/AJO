"use client";
import React from "react";
import Image from "next/image";
import { Button } from "antd";
import emptyIcon from "assets/icons/empty-question.png";

export default function EmptyMateri() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#F8F5EB] rounded-2xl px-6 py-10 text-center shadow-sm">
      <Image
        src={emptyIcon}
        alt="Tidak ada soal"
        width={160}
        height={160}
        className="mb-6 opacity-90"
      />
      <h2 className="text-xl font-semibold text-[#5E331E] mb-2">
        Materi Tidak Ditemukan
      </h2>
      <p className="text-[#5A4A34] max-w-md mb-6 leading-relaxed">
        Wah, sepertinya belum ada materi yang bisa kamu pelajari saat ini. Coba
        cek kembali nanti ya, atau mulai dari materi sebelumnya dulu!
      </p>

      <Button
        type="primary"
        style={{
          backgroundColor: "#DAB68A",
          borderColor: "#DAB68A",
          color: "#5E331E",
          fontWeight: 600,
          borderRadius: 20,
          padding: "0 24px",
        }}
        onClick={() => window.location.reload()}
      >
        Muat Ulang
      </Button>
    </div>
  );
}
