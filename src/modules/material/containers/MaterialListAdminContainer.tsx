"use client";
import React, { useEffect, useState } from "react";
import MaterialListAdminComponent from "../components/MaterialListAdminComponent";
import ModalMaterialContainer from "./ModalMaterialContainer";
import { supabase } from "lib/supabaseClient";
import { IMaterialData } from "types/material";
import { useMaterialState } from "store/materialStore";
import { deleteMaterial, fetchMaterials } from "services/materialService";

export default function MaterialListAdminContainer() {
  const [openModal, setOpenModal] = useState(false);
  const materials = useMaterialState((state) => state.materials);
  const setDefaultValue = useMaterialState((state) => state.setDefaultValue);

  const handleSelectItem = (data: IMaterialData) => {
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
        onDelete={deleteMaterial}
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
