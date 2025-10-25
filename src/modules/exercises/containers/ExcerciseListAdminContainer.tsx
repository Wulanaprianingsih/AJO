"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ExcerciseListAdminComponent, {
  QuestionFormValues,
} from "../components/ExcerciseListAdminComponent";
import { useMaterialState } from "store/materialStore";
import { fetchMaterials, uploadImage } from "services/materialService";
import { insertExcercises, fetchExcercises } from "services/excerciseService";
import { useExcerciseState } from "store/excerciseStore";
import { IExcerciseData } from "types/materi";
import ModalExerciseContainer from "./ModalExerciseContainer";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  material_id: z.string().min(1, "Please select a materi"),
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(2, "At least two options required"),
  image: z.any().nullable(),
});

export default function ExcerciseListAdminContainer() {
  const [options, setOptions] = useState<string[]>(["", ""]);
  const materials = useMaterialState((state) => state.materials);
  const [materiList, setMateriList] = useState<{ id: number; title: string }[]>(
    []
  );
  const { excercise, setDefaultValue } = useExcerciseState.getState();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchMaterials();
    fetchExcercises();
  }, []);

  useEffect(() => {
    if (materials && materials.length > 0) {
      const materiOption = materials.map((m) => ({
        id: m.id,
        title: m.title,
      }));
      setMateriList(materiOption);
      console.log("materiList updated:", materiOption);
    }
  }, [materials]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      material_id: "",
      question: "",
      answer: "",
      options: ["", "", "", ""],
      image: null,
    },
  });

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
    setValue("options", updated);
  };

  const addOption = () => {
    const updated = [...options, ""];
    setOptions(updated);
    setValue("options", updated);
  };

  const removeOption = (index: number) => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
    setValue("options", updated);
  };

  const handleImageChange = (file: File | null) => {
    setValue("image", file);
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log("Submitted:", data);
    let imgUrl = null;

    if (data.image) {
      imgUrl = await uploadImage("excercise", data.image.name, data.image);
    }
    const { ...payload } = data;

    const _payload = {
      ...payload,
      image_url: imgUrl?.publicUrl,
      options: data.options.map((opt) => ({ text: opt })),
    };

    await insertExcercises([_payload]);
  });

  const currentValues = getValues();

  const handleSelectItem = (data: IExcerciseData) => {
    setDefaultValue(data);
    reset({
      title: data.title,
      material_id: data.material_id,
      question: data.question,
      answer: data.answer,
      options: data.options.length ? data.options : ["", ""],
      image: null,
    });
  };

  return (
    <>
      <ExcerciseListAdminComponent
        formValues={{ ...currentValues, options }}
        materiList={materiList}
        register={register}
        errors={errors}
        onAddOption={addOption}
        onRemoveOption={removeOption}
        onOptionChange={handleOptionChange}
        onImageChange={handleImageChange}
        onSubmit={onSubmit}
        data={excercise}
        handleSelectItem={handleSelectItem}
        setOpenModal={setOpenModal}
      />
      {openModal && (
        <ModalExerciseContainer
          setOpenModal={setOpenModal}
          openModal={openModal}
        />
      )}
    </>
  );
}
