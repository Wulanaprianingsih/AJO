import React from "react";
import { Modal, Button, Typography } from "antd";
import Image from "next/image";
import rajin_level1 from "assets/badges/rajin_level1.png";
import rajin_level2 from "assets/badges/rajin_level2.png";
import rajin_level3 from "assets/badges/rajin_level3.png";
import ahliMateri from "assets/badges/ahli_materi.png";
import pejuang_remedial from "assets/badges/pejuang_remedial.png";

const { Title } = Typography;

interface BadgeModalProps {
  open: boolean;
  onClose: () => void;
  badgeName: string;
}

const renderBadgeImg = (badge: string) => {
  console.log("badge", badge);
  if (badge.includes("Ahli Materi")) {
    return ahliMateri;
  } else if (badge === "Pejuang Remedial") {
    return pejuang_remedial;
  } else if (badge === "Rajin Level 1") {
    return rajin_level1;
  } else if (badge === "Rajin Level 2") {
    return rajin_level2;
  } else {
    return rajin_level3;
  }
};

const BadgeModal: React.FC<BadgeModalProps> = ({
  open,
  onClose,
  badgeName,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closable
      width="100%"
      style={{
        maxWidth: 400,
        borderRadius: 20,
        padding: 0,
      }}
      styles={{
        body: {
          textAlign: "center",
          padding: "32px 24px",
          borderRadius: 20,
        },
      }}
    >
      <Title
        level={4}
        style={{
          color: "#5C3D00",
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        Selamat! Kamu Naik Level!
      </Title>

      <Title
        level={3}
        style={{
          color: "#2E7D32",
          marginBottom: 24,
          fontWeight: 700,
        }}
      >
        {badgeName}
      </Title>

      <div className="flex justify-center mb-6">
        <Image
          src={renderBadgeImg(badgeName)?.src}
          alt="badge"
          width={200}
          height={200}
          style={{
            maxWidth: "80%",
            marginBottom: 24,
          }}
          loading="lazy"
        />
      </div>

      <Button
        type="primary"
        size="large"
        onClick={onClose}
        style={{
          backgroundColor: "#FF8C1A",
          borderColor: "#FF8C1A",
          borderRadius: 10,
          padding: "0 24px",
          height: 44,
          fontWeight: 600,
        }}
      >
        Lanjut Belajar
      </Button>
    </Modal>
  );
};

export default BadgeModal;
