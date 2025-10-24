"use client";
import React, { useEffect, useState } from "react";
import MaterialListAdminComponent from "../components/MaterialListAdminComponent";
import ModalMaterialContainer from "./ModalMaterialContainer";
import { supabase } from "lib/supabaseClient";
import { IMaterialData } from "types/material";
import { useMaterialState } from "store/materialStore";
import { deleteMaterial, fetchMaterials } from "services/materialService";

import { Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

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

  const columns = [
    {
      title: "Judul Materi",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
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
      render: (data: IMaterialData) => (
        <Space>
          <Button
            type="link"
            onClick={() => handleSelectItem(data)}
            icon={<EditOutlined />}
          />
          <Popconfirm
            title="Hapus Materi"
            description="Apakah kamu yakin ingin menghapus materi ini?"
            okText="Ya"
            cancelText="Tidak"
            onConfirm={() => deleteMaterial(data.id)}
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
      <MaterialListAdminComponent
        setOpenModal={setOpenModal}
        materials={materials}
        handleSelectItem={handleSelectItem}
        columnsTable={columns}
      />
      <ModalMaterialContainer
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}
