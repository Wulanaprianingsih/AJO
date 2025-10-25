"use client";
import React from "react";
import ModalExerciseComponent, {
  IExerciseForm,
} from "../components/ModalExerciseComponent";
import { insertExcercises } from "services/excerciseService";
import { uploadImage } from "services/materialService";
import { useMaterialState } from "store/materialStore";
import { IExcercisePayload } from "types/course";
import { useExcerciseState } from "store/excerciseStore";

interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalExerciseContainer({
  openModal,
  setOpenModal,
}: IProps) {
  const materials = useMaterialState((state) => state.materials);
  const { selectedExcercise } = useExcerciseState.getState();

  const materiList = materials.map((m) => ({
    id: String(m.id),
    title: m.title,
  }));

  const handleCancel = () => setOpenModal(false);

  const handleSubmit = async (data: IExerciseForm) => {
    try {
      let imgUrl: string | undefined;

      if (data.image_file) {
        const uploaded = await uploadImage(
          "exercise",
          data.image_file.name,
          data.image_file
        );
        imgUrl = uploaded?.publicUrl;
      }

      const payload: IExcercisePayload = {
        title: data.title,
        material_id: data.material_id,
        question: data.quiz.question,
        answer: data.quiz.answer,
        options: data.quiz.options,
        image_url: imgUrl,
      };

      await insertExcercises([payload]);
      setOpenModal(false);
    } catch (err) {
      console.error("Failed to submit exercise:", err);
    }
  };

  return (
    <ModalExerciseComponent
      openModal={openModal}
      handleCancel={handleCancel}
      onSubmit={handleSubmit}
      handleUpdate={handleSubmit}
      materiList={materiList}
      defaultValue={selectedExcercise}
    />
  );
}
