"use client";
import React from "react";
import MainLayout from "assets/components/layouts/MainLayout";
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  List,
  Button,
  Space,
} from "antd";
import {
  BookOutlined,
  UserOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { UserProps } from "types/userData";
import { IExcerciseData, IMaterialData } from "types/materi";

const { Title } = Typography;

interface IProps {
  users: UserProps[];
  excercises: IExcerciseData[];
  materials: IMaterialData[];
  newestMaterial: IMaterialData[];
}

export default function DashboardAdminComponent(props: IProps) {
  const { users, excercises, materials, newestMaterial } = props;
  const LEVEL_MAP: Record<string, string> = {
    "1": "Pemula",
    "2": "Menengah",
    "3": "Master",
  };

  return (
    <MainLayout>
      <div className="space-y-6 px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Title
            level={3}
            style={{ color: "#5E331E", marginBottom: 0, fontWeight: 700 }}
          >
            Dashboard Admin
          </Title>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card
              style={{
                backgroundColor: "#FCF8E7",
                border: "1px solid #E3D5B8",
                borderRadius: 16,
              }}
            >
              <Statistic
                title="Total Pengguna"
                value={users?.length ?? 0}
                prefix={<UserOutlined style={{ color: "#5E331E" }} />}
                valueStyle={{ color: "#5E331E" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card
              style={{
                backgroundColor: "#FCF8E7",
                border: "1px solid #E3D5B8",
                borderRadius: 16,
              }}
            >
              <Statistic
                title="Total Materi"
                value={materials?.length ?? 0}
                prefix={<BookOutlined style={{ color: "#5E331E" }} />}
                valueStyle={{ color: "#5E331E" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card
              style={{
                backgroundColor: "#FCF8E7",
                border: "1px solid #E3D5B8",
                borderRadius: 16,
              }}
            >
              <Statistic
                title="Total Latihan"
                value={excercises?.length ?? 0}
                prefix={<FileDoneOutlined style={{ color: "#5E331E" }} />}
                valueStyle={{ color: "#5E331E" }}
              />
            </Card>
          </Col>
        </Row>

        <Card
          title={
            <span className="font-semibold text-[#5E331E] text-base md:text-lg">
              Materi Terbaru
            </span>
          }
          style={{
            backgroundColor: "#FCF8E7",
            border: "1px solid #E3D5B8",
            borderRadius: 16,
          }}
          className="shadow-sm"
          extra={
            <Button type="link" href="/material" style={{ color: "#5E331E" }}>
              Lihat Semua
            </Button>
          }
        >
          <List
            dataSource={newestMaterial}
            renderItem={(item) => (
              <List.Item>
                <Space direction="vertical" size={0}>
                  <p className="text-[#5E331E] font-medium">{item.title}</p>
                  <p className="text-[#5E331E]">
                    Level: {LEVEL_MAP[item.level]}
                  </p>
                </Space>
              </List.Item>
            )}
          />
        </Card>

        <Card
          title={
            <span className="font-semibold text-[#5E331E] text-base md:text-lg">
              Latihan Terbaru
            </span>
          }
          style={{
            backgroundColor: "#FCF8E7",
            border: "1px solid #E3D5B8",
            borderRadius: 16,
            marginTop: 25,
          }}
          className="shadow-sm"
          extra={
            <Button type="link" href="/exercises" style={{ color: "#5E331E" }}>
              Lihat Semua
            </Button>
          }
        >
          <List
            dataSource={newestMaterial}
            renderItem={(item) => (
              <List.Item>
                <Space direction="vertical" size={0}>
                  <p className="text-[#5E331E] font-medium">
                    Latihan {item.title}
                  </p>
                  <p className="text-[#5E331E]">
                    {item.excercises.length} Soal
                  </p>
                </Space>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </MainLayout>
  );
}
