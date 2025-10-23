"use client";
import React from "react";
import { Select as SelectANTD } from "antd";

interface SelectProps {
  label: string;
  placeholder: string;
  optionList: Array<{ label: string; value: string }>;
  value?: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  error?: string;
}

export default function Select(props: SelectProps) {
  const { label, placeholder, optionList, value, onChange, onBlur, error } =
    props;

  return (
    <div className="interMedium">
      <div className="text-[#5E331E] mb-1">{label}</div>
      <SelectANTD
        showSearch
        placeholder={placeholder}
        optionFilterProp="label"
        value={value === "" ? undefined : value}
        onChange={onChange}
        onBlur={onBlur}
        options={optionList}
        style={{
          width: "100%",
          borderColor: error ? "#ff4d4f" : undefined,
        }}
        className="custom-select"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
