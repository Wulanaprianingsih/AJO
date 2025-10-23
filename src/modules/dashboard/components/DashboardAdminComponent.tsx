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

const { Title } = Typography;

export default function DashboardAdminComponent() {
  const materiTerbaru = [
    { id: 1, title: "Aksara Jawa Dasar", level: "Pemula" },
    { id: 2, title: "Sandhangan", level: "Menengah" },
    { id: 3, title: "Pasangan Aksara", level: "Menengah" },
  ];

  const latihanTerbaru = [
    { id: 1, title: "Latihan Aksara Dasar", totalSoal: 10 },
    { id: 2, title: "Latihan Sandhangan", totalSoal: 8 },
  ];

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
                value={128}
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
                value={12}
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
                value={25}
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
            dataSource={materiTerbaru}
            renderItem={(item) => (
              <List.Item>
                <Space direction="vertical" size={0}>
                  <p className="text-[#5E331E] font-medium">{item.title}</p>
                  <p className="text-[#5E331E]">Level: {item.level}</p>
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
            dataSource={latihanTerbaru}
            renderItem={(item) => (
              <List.Item>
                <Space direction="vertical" size={0}>
                  <p className="text-[#5E331E] font-medium">{item.title}</p>
                  <p className="text-[#5E331E]">{item.totalSoal} Soal</p>
                </Space>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </MainLayout>
  );
}
