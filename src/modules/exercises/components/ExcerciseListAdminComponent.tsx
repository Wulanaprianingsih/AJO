import { Button, Space, Table } from "antd";
import MainLayout from "assets/components/layouts/MainLayout";
import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { deleteExcercise } from "services/excerciseService";
import { IExcerciseData } from "types/materi";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

export type QuestionFormValues = {
  title: string;
  material_id: string;
  question: string;
  answer: string;
  options: string[];
  image: File | null;
};

type Props = {
  data: IExcerciseData[] | [];
  formValues: QuestionFormValues;
  materiList: { id: number; title: string }[];
  register: UseFormRegister<QuestionFormValues>;
  errors: FieldErrors<QuestionFormValues>;
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
  onOptionChange: (index: number, value: string) => void;
  onImageChange: (file: File | null) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSelectItem: (data: IExcerciseData) => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExcerciseListAdminComponent: React.FC<Props> = ({
  data,
  handleSelectItem,
  setOpenModal,
}) => {
  console.log("data", data);

  const columns = [
    {
      title: "Pertanyaan",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Materi",
      dataIndex: "materials_title",
      key: "materials_title",
      align: "center" as const,
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
          <Button
            type="link"
            onClick={() => deleteExcercise(data.id)}
            danger
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="px-6 py-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#5E331E]">Daftar Latihan</h1>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="!bg-[#DAB68A] !border-[#DAB68A] !text-[#5E331E] !font-semibold !rounded-full"
            onClick={() => setOpenModal(true)}
          >
            Tambah Latihan
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data ?? []}
          pagination={{ pageSize: 15 }}
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
};

export default ExcerciseListAdminComponent;
