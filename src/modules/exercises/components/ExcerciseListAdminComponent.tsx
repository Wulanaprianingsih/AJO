import { Button, Space, Table } from "antd";
import MainLayout from "assets/components/layouts/MainLayout";
import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { deleteExcercise } from "services/excerciseService";
import { IExcerciseData } from "types/materi";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";

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
};

const ExcerciseListAdminComponent: React.FC<Props> = ({
  formValues,
  materiList,
  register,
  errors,
  onAddOption,
  onRemoveOption,
  onOptionChange,
  onImageChange,
  onSubmit,
  data,
  handleSelectItem,
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
      <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-2xl p-6 space-y-5">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Create Question
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              {...register("title")}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Materi</label>
            <select
              {...register("material_id")}
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-white"
            >
              <option value="">Select materi...</option>
              {materiList.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
            {errors.material_id && (
              <p className="text-sm text-red-500 mt-1">
                {errors.material_id.message}
              </p>
            )}
          </div>

          {/* Question */}
          <div>
            <label className="block text-sm font-medium">Question</label>
            <textarea
              {...register("question")}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              rows={3}
              placeholder="Enter question"
            />
            {errors.question && (
              <p className="text-sm text-red-500 mt-1">
                {errors.question.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Answer</label>
            <input
              {...register("answer")}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="Enter correct answer"
            />
            {errors.answer && (
              <p className="text-sm text-red-500 mt-1">
                {errors.answer.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Options</label>
            {formValues.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  value={opt}
                  onChange={(e) => onOptionChange(i, e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2"
                  placeholder={`Option ${i + 1}`}
                />
                <button
                  type="button"
                  onClick={() => onRemoveOption(i)}
                  className="text-red-500 text-sm font-medium"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={onAddOption}
              className="text-blue-600 text-sm font-medium mt-1"
            >
              + Add Option
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onImageChange(e.target.files?.[0] || null)}
              className="mt-1"
            />
            {formValues.image && (
              <Image
                src={URL.createObjectURL(formValues.image)}
                alt="Preview"
                className="mt-3 w-40 h-40 object-cover rounded-lg border"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default ExcerciseListAdminComponent;
