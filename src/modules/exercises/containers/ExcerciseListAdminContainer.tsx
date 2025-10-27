"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ExcerciseListAdminComponent, {
  QuestionFormValues,
} from "../components/ExcerciseListAdminComponent";
import { useMaterialState } from "store/materialStore";
import { fetchMaterials, uploadImage } from "services/materialService";
import { insertExcercises, fetchExcercises } from "services/excerciseService";
import { useExcerciseState } from "store/excerciseStore";
import { IExcerciseData } from "types/materi";
import ModalExerciseContainer from "./ModalExerciseContainer";
import { Button, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteExcercise } from "services/excerciseService";
import dayjs from "dayjs";

export default function ExcerciseListAdminContainer() {
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
    defaultValues: {
      title: "",
      material_id: "",
      question: "",
      answer: "",
      options: [],
      image: null,
    },
  });
  const handleImageChange = (file: File | null) => {
    setValue("image", file);
  };

  const onSubmit = handleSubmit(async (data) => {
    let imgUrl = null;

    if (data.image) {
      imgUrl = await uploadImage("excercise", data.image.name, data.image);
    }
    const { ...payload } = data;

    const _payload = {
      ...payload,
      image_url: imgUrl?.publicUrl,
      options: data.options,
    };

    await insertExcercises([_payload]);
  });

  const currentValues = getValues();

  const handleSelectItem = (data: IExcerciseData) => {
    reset({
      title: data.title,
      material_id: data.material_id,
      question: data.question,
      answer: data.answer,
      options: data.options,
      image: null,
    });
    setDefaultValue(data);
    setOpenModal(true);
  };

  const columns = [
    {
      title: "Pertanyaan",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      align: "center" as const,
    },
    {
      title: "Materi",
      dataIndex: "materials_title",
      key: "materials_title",
      align: "center" as const,
    },
    {
      title: "Tanggal Pembuatan",
      dataIndex: "created_at",
      key: "created_at",
      align: "center" as const,
      render: (value: string) => dayjs(value).format("DD MMM YYYY HH:mm"),
    },
    {
      title: "Aksi",
      key: "aksi",
      align: "center" as const,
      render: (data: IExcerciseData) => (
        <Space>
          <Button
            type="link"
            onClick={() => handleSelectItem(data)}
            icon={<EditOutlined />}
          />
          <Popconfirm
            title="Hapus Latihan"
            description="Apakah kamu yakin ingin menghapus latihan ini?"
            okText="Ya"
            cancelText="Tidak"
            onConfirm={() => deleteExcercise(data.id)}
            classNames={{
              root: "custom-popconfirm",
            }}
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ExcerciseListAdminComponent
        formValues={{ ...currentValues }}
        materiList={materiList}
        register={register}
        errors={errors}
        onImageChange={handleImageChange}
        onSubmit={onSubmit}
        data={excercise}
        handleSelectItem={handleSelectItem}
        setOpenModal={setOpenModal}
        columns={columns}
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
