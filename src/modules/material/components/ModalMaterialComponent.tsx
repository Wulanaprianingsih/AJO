"use client";
import React, { useEffect } from "react";
import { Button, Space, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { IMaterialData, IMaterialForm } from "types/material";
import Modal from "assets/components/Modal";
import { Controller, useForm, FormProvider } from "react-hook-form";
import Inputs from "assets/components/Inputs";
import Image from "next/image";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import Select from "assets/components/Select";
import { mediaTypeOptions } from "assets/constants/enums";
import SampleQuizForm from "./SampleQuizForm";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Memuat editor...</p>,
});

interface IProps {
  openModal: boolean;
  handleCancel: () => void;
  onSubmit: (data: IMaterialForm) => void;
  handleUpdate: (data: IMaterialForm) => void;
  defaultValue: IMaterialData | null;
}

export default function ModalMaterialComponent({
  openModal,
  handleCancel,
  onSubmit,
  handleUpdate,
  defaultValue,
}: IProps) {
  const methods = useForm<IMaterialForm>({
    mode: "onChange",
    defaultValues: {
      level: "0",
      sequence: 0,
      title: "",
      description: "",
      media_type: "video",
      media_url: "",
      content_text: "",
      sample_quiz: {
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    },
  });

  const { control, reset, handleSubmit, watch, setValue } = methods;

  useEffect(() => {
    if (defaultValue) {
      reset({
        ...defaultValue,
        sample_quiz: {
          question: defaultValue.sample_quiz?.question || "",
          options:
            defaultValue.sample_quiz?.options?.length === 4
              ? defaultValue.sample_quiz.options
              : ["", "", "", ""],
          answer: defaultValue.sample_quiz.answer || undefined,
        },
      });
    } else {
      reset();
    }
  }, [defaultValue, reset]);

  const handleThumbnailUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      message.error("File harus berupa gambar!");
      return Upload.LIST_IGNORE;
    }
    const preview = URL.createObjectURL(file);
    setValue("thumbnail_file", { file });
    setValue("thumbnail", preview);
    return false;
  };

  const onFinish = (values: IMaterialForm) => {
    const thumbnailFile = values.thumbnail_file?.file;
    const payload: IMaterialForm = {
      ...values,
      thumbnail_file: thumbnailFile ? { file: thumbnailFile } : undefined,
    };

    if (defaultValue) handleUpdate(payload);
    else onSubmit(payload);

    reset();
    handleCancel();
  };

  return (
    <Modal
      title={defaultValue ? "Edit Materi" : "Tambah Materi"}
      isModalOpen={openModal}
      handleCancel={() => {
        reset();
        handleCancel();
      }}
      handleOk={handleSubmit(onFinish)}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onFinish)}>
          <Space>
            <Controller
              name="level"
              control={control}
              rules={{ required: "Level wajib diisi" }}
              render={({ field, fieldState }) => (
                <Inputs
                  {...field}
                  label="Level"
                  type="number"
                  placeholder="Masukkan level"
                  error={fieldState.error?.message}
                  maxValue={3}
                />
              )}
            />
            <Controller
              name="sequence"
              control={control}
              rules={{ required: "Urutan wajib diisi" }}
              render={({ field, fieldState }) => (
                <Inputs
                  {...field}
                  label="Urutan"
                  type="number"
                  placeholder="Masukkan urutan"
                  error={fieldState.error?.message}
                  maxValue={5}
                />
              )}
            />
          </Space>

          <Controller
            name="title"
            control={control}
            rules={{ required: "Judul materi wajib diisi" }}
            render={({ field, fieldState }) => (
              <Inputs
                {...field}
                label="Judul Materi"
                placeholder="Masukkan judul materi"
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Inputs
                {...field}
                label="Deskripsi"
                placeholder="Masukkan deskripsi singkat"
                type="textArea"
              />
            )}
          />

          {watch("thumbnail") ? (
            <div className="my-6">
              <Image
                src={watch("thumbnail") as string}
                alt="Thumbnail preview"
                width={500}
                height={200}
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
            </div>
          ) : (
            <div className="my-6">
              <Upload
                beforeUpload={handleThumbnailUpload}
                maxCount={1}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
              </Upload>
            </div>
          )}

          <Controller
            name="media_type"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label="Tipe Media"
                placeholder="Pilih tipe media"
                optionList={mediaTypeOptions}
                value={field.value}
                error={fieldState.error?.message}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />

          <Controller
            name="media_url"
            control={control}
            render={({ field }) => (
              <Inputs {...field} label="URL Media" placeholder="https://..." />
            )}
          />

          <Controller
            name="content_text"
            control={control}
            render={({ field }) => (
              <div className="my-6">
                <label className="mb-1 block font-medium text-[#5e331e]">
                  Katrangan Materi
                </label>
                <ReactQuill
                  theme="snow"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </div>
            )}
          />

          <SampleQuizForm />

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
            {defaultValue ? "Simpan Perubahan" : "Tambah Materi"}
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
}
