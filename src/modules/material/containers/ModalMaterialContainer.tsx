import React from "react";
import { IMaterialForm } from "types/material";
import { supabase } from "lib/supabaseClient";
import ModalMaterialComponent from "../components/ModalMaterialComponent";
import { useMaterialState } from "store/materialStore";
import { uploadImage } from "services/materialService";

interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ModalMaterialContainer(props: IProps) {
  const { openModal, setOpenModal } = props;
  const addMaterial = useMaterialState((state) => state.addMaterial);
  const defaultMaterialValue = useMaterialState(
    (state) => state.defaultMaterialValue
  );
  const setDefaultValue = useMaterialState((state) => state.setDefaultValue);

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (payload: IMaterialForm) => {
    const file = payload?.thumbnail_file?.file;
    if (!file) return;
    const imgUrl = await uploadImage("thumbnail", file.name, file);
    delete payload.thumbnail_file;

    payload.thumbnail = imgUrl?.publicUrl;

    try {
      const { data, error } = await supabase
        .from("materials")
        .insert(payload)
        .select();
      if (error) console.log("error", error);
      else {
        console.log(data);
        if (data) {
          addMaterial(data[0]);
        }
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleUpdateMaterials = async (payload: IMaterialForm) => {
    if (typeof payload.thumbnail === "string") {
      payload.thumbnail = payload.thumbnail;
      delete payload.thumbnail_file;
    } else {
      let imgUrl = null;
      const file = payload?.thumbnail_file?.file;
      if (file) {
        imgUrl = await uploadImage("thumbnail", file.name, file);
        delete payload.thumbnail_file;

        payload.thumbnail = imgUrl?.publicUrl;
      }
    }

    const excludeKeys = [
      "user_answers",
      "user_excercise_history",
      "thumbnail_file",
      "excercise_history",
      "excercises",
      "created_at",
      "key",
    ];

    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(([key]) => !excludeKeys.includes(key))
    );

    try {
      const { data, error } = await supabase
        .from("materials")
        .update(filteredPayload)
        .eq("id", defaultMaterialValue?.id);
      if (error) console.log("error", error);
      else {
        console.log(data);
        setDefaultValue(null);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <ModalMaterialComponent
      openModal={openModal}
      handleCancel={handleCancel}
      onSubmit={handleSubmit}
      defaultValue={defaultMaterialValue}
      handleUpdate={handleUpdateMaterials}
    />
  );
}
