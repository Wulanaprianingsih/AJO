"use client";
import React, { useEffect } from "react";
import { Alert, Input, Radio } from "antd";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export default function SampleQuizForm() {
  const { control } = useFormContext();

  const { fields, replace } = useFieldArray({
    control,
    name: "sample_quiz.options",
  });

  useEffect(() => {
    if (!fields.length) {
      replace(["", "", "", ""].map((text) => ({ text })));
    } else if (fields.length < 4) {
      const missing = 4 - fields.length;
      replace([
        ...fields,
        ...Array(missing)
          .fill(0)
          .map(() => ({ text: "" })),
      ]);
    } else if (fields.length > 4) {
      replace(fields.slice(0, 4));
    }
  }, [fields, replace]);

  const labels = ["A", "B", "C", "D"];

  return (
    <div className="mt-8">
      <div className="text-[#5E331E] font-medium mb-2">Contoh Soal</div>
      <Controller
        name="sample_quiz.question"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Masukkan pertanyaan"
            className="mb-4"
          />
        )}
      />

      <Alert
        message="Pilih salah satu untuk jawaban yang benar"
        banner
        className="mb-3"
      />
      <Controller
        name="sample_quiz.answer"
        control={control}
        render={({ field }) => (
          <Radio.Group {...field} value={field.value} className="w-full">
            {fields.map((item, index) => (
              <div
                key={item.id || index}
                className="flex items-center gap-3 mb-3"
              >
                <Radio value={labels[index]}>{labels[index]}</Radio>
                <Controller
                  name={`sample_quiz.options.${index}.text`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={`Masukkan jawaban ${labels[index]}`}
                      className="w-full"
                    />
                  )}
                />
              </div>
            ))}
          </Radio.Group>
        )}
      />
    </div>
  );
}
