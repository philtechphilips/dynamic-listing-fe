"use client";

import dynamic from "next/dynamic";

const TinyMCEEditor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

const DEFAULT_INIT = {
  height: 300,
  menubar: false,
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "charmap",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "table",
    "help",
    "wordcount",
  ],
  toolbar:
    "undo redo | blocks | bold italic underline strikethrough | " +
    "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | removeformat",
  content_style: [
    "body.mce-content-body { font-family: 'Lato', 'Geom', sans-serif; font-size: 1rem; line-height: 1.8; color: #171717; word-break: normal; overflow-wrap: break-word; white-space: normal; width: 100%; max-width: 100%; box-sizing: border-box; padding: 0; }",
    "body.mce-content-body p { margin: 0 0 1em; font-size: inherit; line-height: inherit; }",
    "body.mce-content-body p:last-child { margin-bottom: 0; }",
    "body.mce-content-body h1, body.mce-content-body h2, body.mce-content-body h3, body.mce-content-body h4, body.mce-content-body h5, body.mce-content-body h6 { margin-top: 1.25em; margin-bottom: 0.5em; font-weight: 600; line-height: 1.3; }",
    "body.mce-content-body h1:first-child, body.mce-content-body h2:first-child, body.mce-content-body h3:first-child, body.mce-content-body h4:first-child, body.mce-content-body h5:first-child, body.mce-content-body h6:first-child { margin-top: 0; }",
    "body.mce-content-body h1 { font-size: 2em; } body.mce-content-body h2 { font-size: 1.5em; } body.mce-content-body h3 { font-size: 1.25em; } body.mce-content-body h4 { font-size: 1.125em; } body.mce-content-body h5 { font-size: 1em; } body.mce-content-body h6 { font-size: 0.875em; }",
    "body.mce-content-body ul { margin: 0.75em 0; padding-left: 1.75em; list-style-type: disc; }",
    "body.mce-content-body ol { margin: 0.75em 0; padding-left: 1.75em; list-style-type: decimal; }",
    "body.mce-content-body li { margin: 0.35em 0; line-height: 1.7; }",
    "body.mce-content-body blockquote { margin: 1em 0; padding: 0.75em 1.25em; border-left: 4px solid #e5e5e5; color: #737373; font-style: italic; }",
    "body.mce-content-body a { color: #d61818; text-decoration: underline; }",
    "body.mce-content-body strong { font-weight: 700; }",
    "body.mce-content-body img { max-width: 100%; height: auto; margin: 0.75em 0; }",
  ].join(" "),
  branding: false,
  promotion: false,
};

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
  className?: string;
  id?: string;
}

// Use NEXT_PUBLIC_ so the key is available in the browser (client component).
const tinymceApiKey =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_EDITOR_API_KEY
    : undefined;

export function RichTextEditor({
  value,
  onChange,
  height = 300,
  className,
  id,
}: RichTextEditorProps) {
  return (
    <div className={className}>
      <TinyMCEEditor
        id={id}
        value={value}
        onEditorChange={(content) => onChange(content)}
        apiKey={tinymceApiKey}
        init={{
          ...DEFAULT_INIT,
          height,
        }}
      />
    </div>
  );
}
