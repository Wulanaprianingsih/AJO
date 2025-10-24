"use client";
import React from "react";
import { Modal as ModalANTD, Typography, Divider } from "antd";

interface IProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  children?: React.ReactNode;
  title?: string;
  width?: number;
}

export default function Modal({
  isModalOpen,
  handleOk,
  handleCancel,
  children,
  title,
  width = 720, // biar lebih lebar
}: IProps) {
  return (
    <ModalANTD
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      centered
      width={width}
      style={{
        top: 32,
        paddingBottom: 32,
        maxHeight: "75vh",
        overflowY: "auto",
        background: "#fff5e6",
        padding: "24px 28px",
        borderRadius: 16,
      }}
      className="rounded-2xl shadow-lg"
    >
      <Typography.Title
        level={4}
        style={{
          textAlign: "center",
          marginBottom: 8,
          color: "#4a3c2a",
          fontWeight: 600,
        }}
      >
        {title}
      </Typography.Title>
      <Divider style={{ margin: "12px 0 20px 0" }} />
      <div className="modal-content">{children}</div>
    </ModalANTD>
  );
}
