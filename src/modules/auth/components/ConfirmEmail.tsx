"use client";
import { Card, Typography, Space, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

interface ConfirmEmailProps {
  email: string;
}

export default function ConfirmEmail({ email }: ConfirmEmailProps) {
  const getEmailLink = () => {
    const domain = email.split("@")[1]?.toLowerCase();
    const userAgent = navigator.userAgent || navigator.vendor;

    const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);

    if (isMobile) {
      if (domain === "gmail.com") return "googlegmail://";
      if (domain === "outlook.com" || domain === "hotmail.com")
        return "ms-outlook://";
      return `https://mail.google.com/mail/u/0/#inbox`;
    } else {
      if (domain === "gmail.com") return "https://mail.google.com";
      if (domain === "yahoo.com") return "https://mail.yahoo.com";
      if (domain === "outlook.com" || domain === "hotmail.com")
        return "https://outlook.live.com";
      return "https://www.google.com";
    }
  };

  const handleOpenEmail = () => {
    window.open(getEmailLink(), "_blank");
  };

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
          <Button type="primary" block onClick={handleOpenEmail}>
            Buka Email
          </Button>
        </Space>
      </Card>
    </div>
  );
}
