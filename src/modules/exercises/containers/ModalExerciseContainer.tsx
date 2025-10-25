"use client";
import React from "react";
import ModalExerciseComponent, {
  IExerciseForm,
} from "../components/ModalExerciseComponent";
import { insertExcercises } from "services/excerciseService";
import { uploadImage } from "services/materialService";
import { useMaterialState } from "store/materialStore";

interface IExercisePayload {
  image_url: string | undefined;
  title: string;
  material_id: string;
  question: string;
  answer: string;
  options: { text: string }[];
}

interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalExerciseContainer({
  openModal,
  setOpenModal,
}: IProps) {
  const materials = useMaterialState((state) => state.materials);

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

      const payload: IExercisePayload = {
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
      defaultValue={null}
    />
  );
}
