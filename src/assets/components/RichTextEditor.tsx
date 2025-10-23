"use client";

import React, { useEffect, useState } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface RichTextEditorProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
  maxLength?: number;
  height?: string | number;
  error?: string;
}

type CKEditorBuild = typeof import("@ckeditor/ckeditor5-build-classic").default;
type CKEditorComponentType =
  typeof import("@ckeditor/ckeditor5-react").CKEditor;

export default function RichTextEditor<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  error,
  readOnly = false,
  maxLength,
  height = "250px",
}: RichTextEditorProps<T>) {
  const [CKEditorComponent, setCKEditorComponent] =
    useState<CKEditorComponentType | null>(null);
  const [EditorBuild, setEditorBuild] = useState<CKEditorBuild | null>(null);

  useEffect(() => {
    const loadEditor = async () => {
      const modReact = await import("@ckeditor/ckeditor5-react");
      const modClassic = await import("@ckeditor/ckeditor5-build-classic");

      setCKEditorComponent(() => modReact.CKEditor);
      setEditorBuild(modClassic.default);
    };
    loadEditor();
  }, []);

  if (!CKEditorComponent || !EditorBuild) return null;

  const Editor = CKEditorComponent;

  return (
    <div className="mb-4 text-[#5E331E] interMedium">
      {label && <div className="mb-1">{label}</div>}

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <div className="border border-[#D9D9D9] rounded-md min-h-[220px]">
            <Editor
              editor={EditorBuild}
              data={value || ""}
              config={{
                placeholder: placeholder ?? "Tulis di sini...",
                toolbar: readOnly
                  ? []
                  : [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "underline",
                      "link",
                      "bulletedList",
                      "numberedList",
                      "blockQuote",
                      "|",
                      "undo",
                      "redo",
                    ],
                readOnly,
              }}
              onChange={(_event, editor) => {
                const ckEditorInstance = editor as { getData: () => string };
                const data = ckEditorInstance.getData();
                if (maxLength && data.length > maxLength) return;
                onChange(data);
              }}
              onBlur={onBlur}
            />
          </div>
        )}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1 overflow-hidden transition-all duration-300">
          {error}
        </p>
      )}

      <style jsx global>{`
        .ck-editor__editable_inline {
          min-height: ${height};
        }
      `}</style>
    </div>
  );
}
