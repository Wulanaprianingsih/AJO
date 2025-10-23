"use client";
import React from "react";
import MainLayout from "assets/components/layouts/MainLayout";
import { Table, Button, Tag, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { IMaterialData } from "types/material";

interface IProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: (id: number) => void;
  materials: IMaterialData[] | null;
  handleSelectItem: (data: IMaterialData) => void;
}
export default function MaterialListAdminComponent(props: IProps) {
  const { setOpenModal, onDelete, materials, handleSelectItem } = props;

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
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center" as const,
      render: (status: string) => (
        <Tag
          color={status.toLocaleLowerCase() === "aktif" ? "green" : "volcano"}
        >
          {status}
        </Tag>
      ),
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
            onConfirm={() => onDelete(data.id)}
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
    <MainLayout>
      <div className="px-6 py-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#5E331E]">Kelola Materi</h1>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="!bg-[#DAB68A] !border-[#DAB68A] !text-[#5E331E] !font-semibold !rounded-full"
            onClick={() => setOpenModal(true)}
          >
            Tambah Materi
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={materials ?? []}
          pagination={{ pageSize: 5 }}
          bordered
          className="[&_.ant-table-thead>tr>th]:!bg-[#EAD3B3] [&_.ant-table-thead>tr>th]:!text-[#5E331E] 
             [&_.ant-table-tbody>tr>td]:!bg-[#FCF8E7] [&_.ant-table-tbody>tr>td]:!text-[#5E331E]"
          style={{
            borderRadius: 16,
          }}
        />
      </div>
    </MainLayout>
  );
}
