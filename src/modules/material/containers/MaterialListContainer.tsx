"use client";

import React, { useEffect, useState } from "react";
import MaterialListComponent from "../components/MaterialListComponent";
import { useRouter } from "next/navigation";
import { useMaterialState } from "store/materialStore";
import { fetchMaterials } from "services/materialService";

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

  useEffect(() => {
    fetchMaterials();
  }, []);

  const formatted = materials.map((x) => ({
    title: x.title,
    description: x.description,
    score: 0,
    level: x.level,
    id: x.id,
    excercise_history: x.excercise_history,
    last_point: x.excercise_history?.[0]?.point ?? 0,
  }));

  console.log("materials", materials);

  const LevelList = [
    {
      levelTitle: "Level 1 – Dasar Basa (Pemula)",
      description:
        "Mulai perjalananmu mengenal Bahasa Jawa dari kosakata sehari-hari, sapaan, dan ungkapan sopan. Selesaikan level ini untuk bisa berkomunikasi sederhana dengan percaya diri!",
      materi: formatted.filter((m) => m.level == "1"),
    },
    {
      levelTitle: "Level 2 – Aksara dan Adat (Menengah)",
      description:
        "Belajar aksara Jawa, memahami budaya melalui kata, serta mencoba ungkapan sopan yang lebih kompleks. Tantang dirimu untuk bisa menguasainya!",
      materi: formatted.filter((m) => m.level == "2"),
    },
    {
      levelTitle: "Level 3 – Luhur dan Budaya (Mahir)",
      description:
        "Kuasi Bahasa Jawa tingkat mahir: komunikasi formal, paribasan, tembang macapat, dan nilai-nilai luhur. Saatnya menciptakan kalimatmu sendiri dan merasakan kekayaan budaya Jawa!",
      materi: formatted.filter((m) => m.level == "3"),
    },
  ];

  const [userData] = useState<{ scores: Record<string, number> } | undefined>(
    dummyUserData
  );
  const [openLevel, setOpenLevel] = useState<number | null>(null);

  const handleNavigate = (materi: { title: string; id: number }) => {
    router.push(`/material/${materi.id}`); //nanti diganti id
  };

  return (
    <MaterialListComponent
      userData={userData}
      onNavigate={handleNavigate}
      openLevel={openLevel}
      setOpenLevel={setOpenLevel}
      levels={LevelList}
    />
  );
}
