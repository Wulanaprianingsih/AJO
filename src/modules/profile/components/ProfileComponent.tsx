"use client";
import MainLayout from "assets/components/layouts/MainLayout";
import React from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserProps } from "types/userData";

export default function ProfileComponent(props: UserProps) {
  const { nama, email } = props;

  return (
    <MainLayout>
      <div className="px-4 md:px-10 py-10 h-full w-full flex flex-col items-center bg-[#F8F5EB] rounded-2xl">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#5E331E] mb-8 flex items-center gap-2">
          <span>👩‍🎓</span> Profil Kamu
        </h1>
        <Card
          className="w-full max-w-md rounded-2xl shadow-md"
          style={{
            backgroundColor: "#FCF8E7",
            border: "2px solid #E2D3B6",
            padding: "32px 28px",
          }}
        >
          <div className="flex flex-col items-center text-center mb-6">
            <Avatar
              size={100}
              icon={<UserOutlined />}
              style={{
                backgroundColor: "#DAB68A",
                color: "#fff",
                marginBottom: 12,
              }}
            />
            <h2 className="text-xl font-semibold text-[#5E331E] mb-1">
              {nama}
            </h2>
            <p className="text-sm text-[#5E331E]">{email}</p>
          </div>
          <div className="bg-[#FFF9EE] rounded-xl p-4 space-y-3 border border-[#EADFC7]">
            <div className="flex justify-between">
              <span className="font-medium text-[#5E331E]">Nama Lengkap</span>
              <span className="text-[#5E331E]">{nama}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-[#5E331E]">Email</span>
              <span className="text-[#5E331E]">{email}</span>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
