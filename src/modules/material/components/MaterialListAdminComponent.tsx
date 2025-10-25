"use client";
import React from "react";
import MainLayout from "assets/components/layouts/MainLayout";
import { Table, Button, TableColumnsType } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IMaterialData } from "types/material";

interface IProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  materials: IMaterialData[] | null;
  handleSelectItem: (data: IMaterialData) => void;
  columnsTable: TableColumnsType<IMaterialData>;
}
export default function MaterialListAdminComponent(props: IProps) {
  const { setOpenModal, materials, columnsTable } = props;

  return (
    <MainLayout>
      <div className="px-6 py-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#5E331E]">Daftar Materi</h1>
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
          columns={columnsTable}
          dataSource={materials ?? []}
          pagination={{ pageSize: 10 }}
          rowKey="id"
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
