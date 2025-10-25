"use client";
import { Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

interface InputsProps {
  label?: string;
  placeholder: string;
  type?: "text" | "password" | "number" | "textArea";
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  onBlur?: () => void;
  error?: string;
  maxValue?: number;
}

export default function Inputs(props: InputsProps) {
  const {
    label,
    placeholder,
    type = "text",
    value,
    onChange,
    onBlur,
    error,
    maxValue,
  } = props;

  const renderInput = () => {
    if (type === "password") {
      return (
        <Input.Password
          placeholder={placeholder}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="custom-password"
        />
      );
    } else if (type === "number") {
      return (
        <InputNumber
          min={1}
          max={maxValue}
          value={Number(value ?? 0)}
          onChange={(val) => onChange(val ?? 0)}
          className="w-full custom-number"
        />
      );
    } else if (type === "textArea") {
      return (
        <TextArea
          placeholder={placeholder}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoSize
          className="custom-input"
        />
      );
    }
    return (
      <Input
        placeholder={placeholder}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="custom-input"
      />
    );
  };

  return (
    <div className="text-[#5E331E] interMedium">
      <div className="mb-1 mt-6 font-medium">{label}</div>
      {renderInput()}
      <p
        className={`text-red-500 text-sm overflow-hidden transition-all duration-300 ${
          error ? "max-h-10 mt-1" : "max-h-0 mt-0"
        }`}
      >
        {error}
      </p>
    </div>
  );
}
