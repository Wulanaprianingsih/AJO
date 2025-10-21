import { Input } from "antd";
import React from "react";

interface InputsProps {
  label: string;
  placeholder: string;
  type?: "text" | "password";
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
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
  } = props;

  const renderInput = () => {
    if (type === "password") {
      return (
        <Input.Password
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="custom-password"
        />
      );
    }

    return (
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="custom-input"
      />
    );
  };

  return (
    <div className="text-[#5E331E] interMedium">
      <div>{label}</div>
      {renderInput()}
      <p
        className={`
          text-red-500 text-sm overflow-hidden transition-all duration-300
          ${error ? "max-h-10 mt-1" : "max-h-0 mt-0"}
        `}
      >
        {error}
      </p>
    </div>
  );
}
