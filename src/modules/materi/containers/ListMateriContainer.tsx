"use client";

import React, { useState } from "react";
import ListMateriComponent from "../components/ListMateriComponent";
import { useRouter } from "next/navigation";

const dummyUserData = {
  scores: {
    "Kosakata dasar dan sapaan": 80,
    "Unggah-ungguh basa": 60,
    "Ungkapan kesopanan dan emosi": 0,
  },
};

export default function ListMateriContainer() {
  const router = useRouter();

  const [userData] = useState<{ scores: Record<string, number> } | undefined>(
    dummyUserData
  );
  const [openLevel, setOpenLevel] = useState<number | null>(null);

  const handleNavigate = (materi: { title: string; level: number }) => {
    console.log("Navigasi ke materi:", materi);
    router.push(`/materi/${materi.level}/${encodeURIComponent(materi.title)}`);
  };

  return (
    <ListMateriComponent
      userData={userData}
      onNavigate={handleNavigate}
      openLevel={openLevel}
      setOpenLevel={setOpenLevel}
    />
  );
}
