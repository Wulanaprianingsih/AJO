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
  additionalLabel?: string;
}

export default function Select(props: SelectProps) {
  const {
    label,
    placeholder,
    optionList,
    value,
    onChange,
    onBlur,
    error,
    additionalLabel,
  } = props;

  return (
    <div className="interMedium">
      <div className="text-[#5E331E] mb-1">
        <span className="font-medium pr-2">{label}</span>
        <span>{additionalLabel}</span>
      </div>

      <SelectANTD
        showSearch
        placeholder={placeholder}
        optionFilterProp="label"
        value={value ?? undefined}
        onChange={(val) => onChange(val)}
        onBlur={() => onBlur?.()}
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
