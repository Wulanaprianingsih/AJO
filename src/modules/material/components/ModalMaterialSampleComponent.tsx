"use client";
import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Card,
  Space,
  Upload,
} from "antd";
import { IMaterialData, IMaterialForm } from "types/materi";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Option } = Select;
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
  defaultValue,
  handleUpdate,
}: IProps) {
  const [form] = Form.useForm();

  const handleAddMaterials = (values: IMaterialForm) => {
    console.log("values :", values);
    // values.thumbnail_file = values.thumbnail_file?.file[0].originFileObj
    onSubmit(values);

    form.resetFields();
    handleCancel();
  };

  const onCancel = () => {
    form.resetFields();
    handleCancel();
  };

  useEffect(() => {
    // if (defaultValue) {
    form.setFieldsValue(defaultValue);
    // } else {
    //     form.resetFields();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  console.log("defaultValue", defaultValue);
  return (
    <>
      <Modal
        title={defaultValue ? "Edit Materi" : "Tambah Materi"}
        open={openModal}
        onCancel={onCancel}
        footer={null}
        centered
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={defaultValue ? handleUpdate : handleAddMaterials}
          initialValues={{
            level: defaultValue?.level,
            sequence: defaultValue?.sequence,
            media_type: defaultValue?.media_type,
            title: defaultValue?.title,
            media_url: defaultValue?.media_url,
            content_text: defaultValue?.content_text,
            sample_quiz: defaultValue?.sample_quiz,
            thumbnail_file: defaultValue?.thumbnail,
            description: defaultValue?.description,
          }}
        >
          <Form.Item label="Level" name="level" rules={[{ required: true }]}>
            <InputNumber min={1} className="w-full" />
          </Form.Item>

          <Form.Item
            label="Sequence"
            name="sequence"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>

          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input placeholder="Judul materi" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Deskripsi singkat" />
          </Form.Item>

          {defaultValue?.thumbnail && (
            <div>
              <Image
                src={defaultValue?.thumbnail}
                alt="thumbnail preview"
                width={850}
                height={180}
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
            </div>
          )}

          <Form.Item label="Thumbnail Materi (wajib)" name="thumbnail_file">
            <Upload
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  console.error("File harus berupa gambar!");
                  return Upload.LIST_IGNORE;
                }
                const url = URL.createObjectURL(file);
                console.log("url", url);
                return false;
              }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Media Type"
            name="media_type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="video">Video</Option>
              <Option value="image">Image</Option>
              <Option value="text">Text</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Media URL" name="media_url">
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item label="Content Text" name="content_text">
            <Input.TextArea placeholder="Konten teks materi" />
          </Form.Item>

          <Card type="inner" title="Sample Quiz">
            <Form.Item label="Question" name={["sample_quiz", "question"]}>
              <Input placeholder="Pertanyaan" />
            </Form.Item>

            <Space direction="vertical" className="w-full">
              <Form.Item label="Option 1" name={["sample_quiz", "options", 0]}>
                <Input />
              </Form.Item>
              <Form.Item label="Option 2" name={["sample_quiz", "options", 1]}>
                <Input />
              </Form.Item>
              <Form.Item label="Option 3" name={["sample_quiz", "options", 2]}>
                <Input />
              </Form.Item>
              <Form.Item label="Option 4" name={["sample_quiz", "options", 3]}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Correct Answer"
                name={["sample_quiz", "answer"]}
              >
                <Input placeholder="Jawaban benar" />
              </Form.Item>
            </Space>
          </Card>

          <Form.Item className="mt-4">
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
