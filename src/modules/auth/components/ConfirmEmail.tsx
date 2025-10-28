"use client";

import { Card, Typography, Space } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

interface ConfirmEmailProps {
  email: string;
}

export default function ConfirmEmail({ email }: ConfirmEmailProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50 px-4">
      <Card
        style={{
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          borderRadius: 16,
          padding: "2rem",
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <MailOutlined style={{ fontSize: 48, color: "#5E331E" }} />
          <Title level={3} style={{ color: "#5E331E" }}>
            Cek Email Kamu!
          </Title>
          <Paragraph>
            Kami sudah mengirim link konfirmasi ke{" "}
            <span style={{ fontWeight: 500 }}>{email}</span>. <br />
            Silakan buka emailmu dan klik link konfirmasi untuk mengaktifkan
            akunmu.
          </Paragraph>
          <Paragraph type="secondary" style={{ fontSize: 12 }}>
            Jika tidak menerima email, cek folder spam.
          </Paragraph>
        </Space>
      </Card>
    </div>
  );
}
