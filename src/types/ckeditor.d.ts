declare module "@ckeditor/ckeditor5-build-classic" {
  const ClassicEditor: unknown;
  export default ClassicEditor;
}

declare module "@ckeditor/ckeditor5-react" {
  import type { ComponentType } from "react";
  export const CKEditor: ComponentType<{
    editor: unknown;
    data: string;
    config?: Record<string, unknown>;
    onChange?: (event: unknown, editor: unknown) => void;
    onBlur?: () => void;
  }>;
}
