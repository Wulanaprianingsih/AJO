import { Dispatch, SetStateAction } from "react";
import MainLayout from "assets/components/layouts/MainLayout";
import Image from "next/image";

import lockIcon from "assets/icons/lock.png";
import openBookIcon from "assets/icons/open-book.png";
import bookIcon from "assets/icons/book.png";
import level1 from "assets/icons/level1.png";
import level2 from "assets/icons/level2.png";
import level3 from "assets/icons/level3.png";

import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { IExcerciseHistory } from "types/material";

interface IMateriLevel {
  levelTitle: string;
  description?: string;
  materi: {
    title: string;
    description?: string;
    id?: number;
    excercise_history: IExcerciseHistory[];
    last_point: number;
  }[];
}

interface IProps {
  userData?: { scores: Record<string, number> };
  onNavigate: (materi: { title: string; id: number }) => void;
  openLevel: number | null;
  setOpenLevel: Dispatch<SetStateAction<number | null>>;
  levels: IMateriLevel[];
}

export default function MaterialListComponent({
  onNavigate,
  openLevel,
  setOpenLevel,
  levels,
}: IProps) {
  const KKM = 70;

  const levelIcons = [level1, level2, level3];

  return (
    <MainLayout>
      <div className="px-4 md:px-8 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <Image src={bookIcon} alt="materi" width={36} height={36} />
          <h1 className="text-xl md:text-2xl font-semibold text-[#5E331E]">
            Daftar Materi
          </h1>
        </div>

        <div className="mt-6 space-y-6">
          {levels.map((level: IMateriLevel, idx) => {
            const unlocked =
              idx === 0 ||
              levels[idx - 1].materi.every((x) => x.last_point >= KKM);
            return (
              <div
                key={idx}
                className={`rounded-3xl shadow-lg transition-all bg-[#EFEAD8] ${
                  unlocked ? "opacity-full" : "opacity-50"
                }`}
              >
                <button
                  className={`w-full text-left p-5 flex justify-between items-center ${
                    unlocked ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                  onClick={() =>
                    unlocked && setOpenLevel(openLevel === idx ? null : idx)
                  }
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={levelIcons[idx]}
                      alt={`Level ${idx + 1}`}
                      width={80}
                      height={80}
                      className={`object-contain ${
                        unlocked ? "opacity-full" : "opacity-50"
                      }`}
                    />
                    <div>
                      <h2 className="text-lg md:text-xl font-bold text-[#5E331E]">
                        {level.levelTitle}
                      </h2>
                      {level.description && (
                        <p className="text-sm mt-1 text-[#5E331E]">
                          {level.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <span
                    className={`text-[#5E331E] font-bold text-2xl pr-5 ${
                      unlocked ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                  >
                    {openLevel === idx ? <DownOutlined /> : <UpOutlined />}
                  </span>
                </button>

                {openLevel === idx && unlocked && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
                    {level.materi.map((m, mi) => {
                      const isUnlocked =
                        mi === 0 || level.materi[mi - 1].last_point >= KKM;
                      // const isUnlocked = checkMateriUnlocked(level.materi, mi);
                      const score = m.last_point ?? 0;
                      const attempts = m.excercise_history?.length ?? 0;
                      // const attempts = userData?.attempts?.[m.title] ?? 1; // harusnya ini
                      const status =
                        score >= KKM ? "✅ Lulus" : "❌ Belum Lulus";

                      return (
                        <Tooltip
                          key={mi}
                          title={
                            <>
                              <p className="font-semibold">
                                {m.description || "Pelajari materi ini"}
                              </p>
                              <p className="text-xs">Percobaan: {attempts}x</p>
                              <p className="text-xs">Status: {status}</p>
                              <p className="text-xs">Nilai: {score}</p>
                            </>
                          }
                          color="#5E331E"
                        >
                          <div
                            className={`flex flex-col gap-2 p-3 rounded-xl shadow-md transition-all bg-[#EFEAD8]
            ${
              isUnlocked
                ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                : "opacity-60 cursor-not-allowed"
            }`}
                            onClick={() =>
                              isUnlocked &&
                              onNavigate({ title: m.title, id: Number(m.id) })
                            }
                          >
                            <div className="flex items-center gap-3">
                              <Image
                                src={isUnlocked ? openBookIcon : lockIcon}
                                alt="materi"
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                              <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-[#5E331E]">
                                    {m.title}
                                  </span>
                                  {isUnlocked && (
                                    <span
                                      className={`ml-2 px-2 py-0.5 text-xs rounded-full font-semibold bg-[#EFEAD8]`}
                                    >
                                      {score >= KKM ? "🏆 Mastered" : "🆕 New"}
                                    </span>
                                  )}
                                </div>
                                {isUnlocked && (
                                  <>
                                    <div className="h-2 bg-white rounded-full overflow-hidden mt-1">
                                      <div
                                        className="h-2 bg-green-500 rounded-full transition-all"
                                        style={{ width: `${score}%` }}
                                      />
                                    </div>
                                    <div className="flex justify-between text-xs mt-1 text-gray-700">
                                      <span>Percobaan: {attempts}x</span>
                                      <span>Status: {status}</span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </Tooltip>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
