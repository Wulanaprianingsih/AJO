"use client";
import React, { useEffect, useState } from "react";
import MaterialListAdminComponent from "../components/MaterialListAdminComponent";
import ModalMaterialContainer from "./ModalMaterialContainer";
import { supabase } from "lib/supabaseClient";
import { IMaterialData } from "types/material";
import { useMaterialState } from "store/materialStore";

export default function MaterialListAdminContainer() {
  const [openModal, setOpenModal] = useState(false);
  const materials = useMaterialState((state) => state.materials);
  const setMaterial = useMaterialState((state) => state.setMaterials);
  const setDefaultValue = useMaterialState((state) => state.setDefaultValue);

  const handleDeleteMaterials = async (materialId: number) => {
    console.log("payload", materialId);
    try {
      const { error } = await supabase
        .from("materials")
        .delete()
        .eq("id", materialId);
      if (error) console.log("error", error);
      else console.log("success delete");
      fetchMaterials();
    } catch (e) {
      console.log("error", e);
    }
  };

  const fetchMaterials = async () => {
    const { data: materials, error } = await supabase
      .from("materials")
      .select("*");
    if (error) console.log("error fetch materials", error);
    else {
      const modifiedMaterials = materials.map((m, i) => ({
        ...m,
        key: i,
      }));
      setMaterial(modifiedMaterials);
    }
  };

  const handleSelectItem = (data: IMaterialData) => {
    console.log("materi", data);
    setDefaultValue(data);
    setOpenModal(true);
  };

  useEffect(() => {
    fetchMaterials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  return (
    <>
      <MaterialListAdminComponent
        setOpenModal={setOpenModal}
        onDelete={handleDeleteMaterials}
        materials={materials}
        handleSelectItem={handleSelectItem}
      />
      <ModalMaterialContainer
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}
