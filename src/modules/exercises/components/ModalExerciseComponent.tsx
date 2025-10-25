"use client";
import React, { useEffect } from "react";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Controller, useForm, FormProvider } from "react-hook-form";
import Modal from "assets/components/Modal";
import Inputs from "assets/components/Inputs";
import Select from "assets/components/Select";
import Image from "next/image";
import QuizForm from "./QuizForm";

interface IMateri {
  id: string;
  title: string;
}

export interface IExerciseForm {
  title: string;
  material_id: string;
  image_url?: string;
  image_file?: File;
  quiz: {
    question: string;
    options: { text: string }[];
    answer: string;
  };
}

interface IProps {
  openModal: boolean;
  handleCancel: () => void;
  onSubmit: (data: IExerciseForm) => void;
  handleUpdate: (data: IExerciseForm) => void;
  materiList: IMateri[];
  defaultValue: IExerciseForm | null;
}

export default function ModalExerciseComponent({
  openModal,
  handleCancel,
  onSubmit,
  handleUpdate,
  materiList,
  defaultValue,
}: IProps) {
  const methods = useForm<IExerciseForm>({
    mode: "onChange",
    defaultValues: {
      title: "",
      material_id: "",
      quiz: {
        question: "",
        options: ["", "", "", ""].map((text) => ({ text })),
        answer: "",
      },
    },
  });

  const { control, handleSubmit, setValue, watch, reset } = methods;

  useEffect(() => {
    if (defaultValue) {
      reset({
        ...defaultValue,
        quiz: {
          question: defaultValue.quiz?.question || "",
          options:
            defaultValue.quiz?.options?.length === 4
              ? defaultValue.quiz.options
              : ["", "", "", ""].map((text) => ({ text })),
          answer: defaultValue.quiz?.answer || "",
        },
      });
    } else {
      reset();
    }
  }, [defaultValue, reset]);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      message.error("File harus berupa gambar!");
      return Upload.LIST_IGNORE;
    }
    const preview = URL.createObjectURL(file);
    setValue("image_file", file);
    setValue("image_url", preview);
    return false;
  };

  const onFinish = (values: IExerciseForm) => {
    const payload: IExerciseForm = {
      ...values,
      image_file: values.image_file || undefined,
    };
    console.log("payload", payload);

    if (defaultValue) handleUpdate(payload);
    else onSubmit(payload);

    reset();
    handleCancel();
  };

  return (
    <Modal
      title={defaultValue ? "Edit Latihan Soal" : "Tambah Latihan Soal"}
      isModalOpen={openModal}
      handleCancel={() => {
        reset();
        handleCancel();
      }}
      handleOk={handleSubmit(onFinish)}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onFinish)}>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Judul wajib diisi" }}
            render={({ field, fieldState }) => (
              <Inputs
                {...field}
                label="Judul Latihan"
                placeholder="Masukkan judul latihan"
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="material_id"
            control={control}
            rules={{ required: "Materi wajib dipilih" }}
            render={({ field, fieldState }) => (
              <Select
                label="Materi"
                placeholder="Pilih materi"
                optionList={materiList?.map((m) => ({
                  label: m.title,
                  value: m.id,
                }))}
                value={field.value}
                error={fieldState.error?.message}
                onChange={field.onChange}
              />
            )}
          />

          {watch("image_url") ? (
            <div className="my-6">
              <Image
                src={watch("image_url") as string}
                alt="Preview Gambar"
                width={500}
                height={200}
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
            </div>
          ) : (
            <div className="my-6">
              <Upload
                beforeUpload={handleImageUpload}
                maxCount={1}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>
                  Upload Gambar (opsional)
                </Button>
              </Upload>
            </div>
          )}

          <QuizForm />

          <Button
            htmlType="submit"
            type="primary"
            block
            className="mt-4"
            style={{
              borderRadius: 8,
              background: "#f4b860",
              borderColor: "#f4b860",
            }}
          >
            {defaultValue ? "Simpan Perubahan" : "Tambah Soal"}
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
}
