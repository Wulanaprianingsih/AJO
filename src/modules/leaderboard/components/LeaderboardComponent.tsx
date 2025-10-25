"use client";
import MainLayout from "assets/components/layouts/MainLayout";
import React from "react";
import Image from "next/image";
import trophyIcon from "assets/icons/reward.png";
import { useUserStore } from "store/userDataStore";
import { UserProps } from "types/userData";

export default function LeaderboardComponent() {
  const { allUser, userProfile: currentUser } = useUserStore();

  const top10 = allUser.filter((x: UserProps) => x.points > 0).slice(0, 10);
  const userRank = allUser.findIndex((u) => u.id === currentUser?.id) + 1;

  return (
    <MainLayout>
      <div className="px-4 md:px-10 w-full">
        <div className="flex items-center gap-3 mb-4">
          <Image src={trophyIcon} alt="trophy" width={36} height={36} />
          <h1 className="text-xl md:text-2xl font-semibold text-[#5E331E]">
            Peringkat Siswa Di Minggu Ini
          </h1>
        </div>

        <div className="w-full bg-[#FCF8E7] rounded-2xl shadow-md overflow-hidden">
          <table className="w-full text-sm md:text-base border-collapse">
            <thead>
              <tr className="border-b border-[#E0D6C2]">
                <th className="py-4 px-6 text-left font-semibold text-[#5E331E] w-[10%]">
                  #
                </th>
                <th className="py-4 px-6 text-left font-semibold text-[#5E331E]">
                  Nama
                </th>
                <th className="py-4 px-6 text-right font-semibold text-[#5E331E] w-[20%]">
                  Total Poin
                </th>
              </tr>
            </thead>
            <tbody>
              {top10.map((user, index) => {
                const isCurrent = user.id === currentUser?.id;
                const medal =
                  index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : "";

                return (
                  <tr
                    key={user.id}
                    className={`border-t border-[#E0D6C2] ${
                      isCurrent ? "bg-[#FFF4CC]" : ""
                    }`}
                  >
                    <td className="py-3 px-6 text-[#5E331E] font-medium whitespace-nowrap">
                      {index + 1} {medal}
                    </td>
                    <td
                      className={`py-3 px-6 ${
                        isCurrent
                          ? "text-[#D4AF37] font-semibold"
                          : "text-[#5E331E]"
                      }`}
                    >
                      {user.nama}
                    </td>
                    <td className="py-3 px-6 text-right text-[#5E331E] font-medium whitespace-nowrap">
                      {user.points.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {userRank > 10 && (
          <div
            className="w-full mt-4 p-5 rounded-2xl border border-[#EADCA9] text-sm md:text-base shadow-md"
            style={{ backgroundColor: "#FCF8E7" }}
          >
            <h3 className="font-semibold text-[#5E331E] mb-2">
              Peringkat Kamu
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-[#5E331E] font-medium">
                #{userRank} - {currentUser?.nama}
              </span>
              <span className="text-[#5E331E] font-semibold">
                {currentUser?.points.toLocaleString()}
              </span>
            </div>
            <p className="text-[#5C3B1E] text-sm mt-2">
              Kamu berada di peringkat ke-{userRank} dari {allUser?.length}{" "}
              siswa. Terus semangat supaya bisa masuk 10 besar! 💪
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
