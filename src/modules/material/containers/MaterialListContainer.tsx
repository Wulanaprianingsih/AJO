"use client";

import React, { useState } from "react";
import MaterialListComponent from "../components/MaterialListComponent";
import { useRouter } from "next/navigation";

const dummyUserData = {
  scores: {
    "Kosakata dasar dan sapaan": 80,
    "Unggah-ungguh basa": 60,
    "Ungkapan kesopanan dan emosi": 0,
  },
};

export default function MaterialListContainer() {
  const router = useRouter();

  const [userData] = useState<{ scores: Record<string, number> } | undefined>(
    dummyUserData
  );
  const [openLevel, setOpenLevel] = useState<number | null>(null);

  const handleNavigate = (materi: { title: string; level: number }) => {
    router.push(`/materi/${materi.level}`); //nanti diganti id
  };

  return (
    <MaterialListComponent
      userData={userData}
      onNavigate={handleNavigate}
      openLevel={openLevel}
      setOpenLevel={setOpenLevel}
    />
  );
}
