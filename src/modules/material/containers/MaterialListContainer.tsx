"use client";

import React, { useEffect, useState } from "react";
import MaterialListComponent from "../components/MaterialListComponent";
import { useRouter } from "next/navigation";
import { useMaterialState } from "store/materialStore";
import { fetchMaterials } from "services/materialService";
import { updateLastRead } from "services/userService";
import { useUserStore } from "store/userDataStore";

const dummyUserData = {
  scores: {
    "Kosakata dasar dan sapaan": 0,
    "Unggah-ungguh basa": 0,
    "Ungkapan kesopanan dan emosi": 0,
  },
};

export default function MaterialListContainer() {
  const router = useRouter();
  const materials = useMaterialState((state) => state.materials);
  const currentUser = useUserStore((state) => state.userProfile);

  const [userData] = useState<{ scores: Record<string, number> } | undefined>(
    dummyUserData
  );
  const [openLevel, setOpenLevel] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchMaterials();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const formatted = materials.map((x) => ({
    title: x.title,
    description: x.description,
    score: 0,
    level: x.level,
    id: x.id,
    excercise_history: x.excercise_history,
    last_point: x.excercise_history?.[0]?.point ?? 0,
    thumbnail: x.thumbnail ?? "",
  }));

  const LevelList = [
    {
      levelTitle: "Level 1 – Dasar Basa (Pemula)",
      description:
        "Mulai perjalananmu mengenal dasar bahasa Jawa. Pelajari kosakata, kalimat, dan percakapan sederhana agar bisa berkomunikasi dengan percaya diri!",
      materi: formatted.filter((m) => m.level == "1"),
    },
    {
      levelTitle: "Level 2 – Basa & Tatakrama (Menengah)",
      description:
        "Pelajari cara menggunakan bahasa Jawa dengan unggah-ungguh yang sopan, memperluas kosakata, dan memahami peribahasa Jawa. Siap jadi penutur yang santun?",
      materi: formatted.filter((m) => m.level == "2"),
    },
    {
      levelTitle: "Level 3 – Aksara & Budaya (Mahir)",
      description:
        "Tingkatkan kemampuanmu ke level mahir! Belajar membaca dan menulis aksara Jawa serta mengekspresikan nilai budaya melalui parikan dan geguritan sederhana.",
      materi: formatted.filter((m) => m.level == "3"),
    },
  ];

  const handleNavigate = async (materi: { title: string; id: number }) => {
    router.push(`/belajar/${materi.id}`);
    if (currentUser?.email) {
      await updateLastRead(materi.id, currentUser?.email, currentUser?.id);
    }
  };

  return (
    <MaterialListComponent
      userData={userData}
      onNavigate={handleNavigate}
      openLevel={openLevel}
      setOpenLevel={setOpenLevel}
      levels={LevelList}
      isLoading={isLoading}
    />
  );
}
