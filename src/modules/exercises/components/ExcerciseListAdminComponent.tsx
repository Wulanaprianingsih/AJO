import { Button, Table } from "antd";
import MainLayout from "assets/components/layouts/MainLayout";
import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { IExcerciseData } from "types/materi";
import { PlusOutlined } from "@ant-design/icons";

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
  columns: (
    | {
        title: string;
        dataIndex: string;
        key: string;
        align?: undefined;
        render?: undefined;
      }
    | {
        title: string;
        dataIndex: string;
        key: string;
        align: "center";
        render?: undefined;
      }
    | {
        title: string;
        dataIndex: string;
        key: string;
        align: "center";
        render: (value: string) => string;
      }
    | {
        title: string;
        key: string;
        align: "center";
        render: (data: IExcerciseData) => React.JSX.Element;
        dataIndex?: undefined;
      }
  )[];
};

const ExcerciseListAdminComponent: React.FC<Props> = ({
  data,
  setOpenModal,
  columns,
}) => {
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
