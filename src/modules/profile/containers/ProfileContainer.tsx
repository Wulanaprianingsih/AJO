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
    />
  );
}
