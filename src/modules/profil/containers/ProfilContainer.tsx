"use client"
import React from "react";
import ProfilComponent from "../components/ProfilComponent";
import { useUserStore } from "store/userDataStore";

export default function ProfilContainer() {
  const userData = useUserStore((s) => s.userProfile);

  return <ProfilComponent nama={userData?.nama ?? ''} email={userData?.email ?? ''}  />;
}
