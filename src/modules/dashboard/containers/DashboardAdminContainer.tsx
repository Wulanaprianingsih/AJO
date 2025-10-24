"use client";
import React, { useEffect } from "react";
import DashboardAdminComponent from "../components/DashboardAdminComponent";
import { fetchMaterials } from "services/materialService";
import { fetchExcercises } from "services/excerciseService";
import { fetchAllUser } from "services/userService";
import { useUserStore } from "store/userDataStore";
import { useMaterialState } from "store/materialStore";
import { useExcerciseState } from "store/excerciseStore";

export default function DashboardAdminContainer() {
  const allUser = useUserStore((state) => state.allUser);
  const materials = useMaterialState((state) => state.materials);
  const excercise = useExcerciseState((state) => state.excercise);

  useEffect(() => {
    fetchMaterials();
    fetchExcercises();
    fetchAllUser();
  }, []);

  const sortedMaterials = materials.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const newestMaterial = sortedMaterials.slice(0, 3);

  // const sortedExcercise = excercise.sort((a, b) => {
  //   return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  // })

  // const newestExcercise = sortedExcercise.slice(0, 3)

  return (
    <DashboardAdminComponent
      users={allUser}
      materials={materials}
      excercises={excercise}
      newestMaterial={newestMaterial}
    />
  );
}
