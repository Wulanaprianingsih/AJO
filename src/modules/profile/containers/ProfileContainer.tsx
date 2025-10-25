"use client";
import React from "react";
import ProfileComponent from "../components/ProfileComponent";
import { useUserStore } from "store/userDataStore";

export default function ProfilContainer() {
  const userData = useUserStore((s) => s.userProfile);

  return (
    <ProfileComponent
      nama={userData?.nama ?? ""}
      email={userData?.email ?? ""}
      role={userData?.role ?? ""}
      id={userData?.id ?? ""}
      points={userData?.points ?? 0}
      user_badges={userData?.user_badges ?? []}
      level={userData?.level ?? 1}
    />
  );
}
