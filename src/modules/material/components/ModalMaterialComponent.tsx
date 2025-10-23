"use client";
import React, { useEffect } from "react";
import { Button, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { IMaterialData, IMaterialForm } from "types/material";
import Modal from "assets/components/Modal";
import { Controller, useForm } from "react-hook-form";
import Inputs from "assets/components/Inputs";
import Image from "next/image";
// import RichTextEditor from "assets/components/RichTextEditor";

interface IProps {
  openModal: boolean;
  handleCancel: () => void;
  onSubmit: (data: IMaterialForm) => void;
  handleUpdate: (data: IMaterialForm) => void;
  defaultValue: IMaterialData | null;
}

export default function ModalMaterialSampleComponent({
  openModal,
  handleCancel,
  onSubmit,
  handleUpdate,
  defaultValue,
}: IProps) {
  const { control, reset, handleSubmit } = useForm<IMaterialForm>({
    mode: "onChange",
  });

  useEffect(() => {
    if (defaultValue) reset(defaultValue);
    else reset();
  }, [defaultValue, reset]);

  const handleCancelModal = () => {
    reset();
    handleCancel();
  };

  const onFinish = (values: IMaterialForm) => {
    if (defaultValue) handleUpdate(values);
    else onSubmit(values);
    handleCancelModal();
  };

  return (
    <Modal
      title={defaultValue ? "Edit Materi" : "Tambah Materi"}
      isModalOpen={openModal}
      handleCancel={handleCancelModal}
      handleOk={() => {}}
    >
      <form onSubmit={handleSubmit(onFinish)}>
        <Space>
          <Controller
            name="level"
            control={control}
            render={({ field, fieldState }) => (
              <Inputs
                {...field}
                label="Level"
                type="number"
                placeholder="Pilih level"
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="sequence"
            control={control}
            render={({ field, fieldState }) => (
              <Inputs
                {...field}
                label="Urutan"
                type="number"
                placeholder="Pilih urutan"
                error={fieldState.error?.message}
              />
            )}
          />
        </Space>

        <Controller
          name="title"
          control={control}
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
          render={({ field, fieldState }) => (
            <Inputs
              {...field}
              label="Deskripsi"
              placeholder="Masukkan deskripsi"
              error={fieldState.error?.message}
              type="textArea"
            />
          )}
        />

        {defaultValue?.thumbnail ? (
          <div className="mb-3">
            <Image
              src={defaultValue.thumbnail}
              alt="Thumbnail preview"
              width={500}
              height={200}
              style={{ borderRadius: 8, objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className="my-6">
            <Upload beforeUpload={() => false} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}> Upload Thumbnail</Button>
            </Upload>
          </div>
        )}

        <Controller
          name="media_url"
          control={control}
          render={({ field, fieldState }) => (
            <Inputs
              {...field}
              label="URL Video"
              placeholder="Masukkan url video"
              error={fieldState.error?.message}
            />
          )}
        />

        {/* <RichTextEditor
          name="content_text"
          control={control}
          label="Penjelasan Materi"
          placeholder="Tuliskan penjelasan materi di sini..."
        /> */}

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
    </Modal>
  );
}
