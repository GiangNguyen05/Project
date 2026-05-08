import { useState, useCallback } from "react";
import { readTxt, readPDF, chunkText } from "../utils/rag";

export function useDocs(toast) {
  const [docs, setDocs] = useState([]);

  const handleFiles = useCallback(
    async (files) => {
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          toast("File quá lớn (max 5MB): " + file.name, "err");
          continue;
        }
        const ext = file.name.split(".").pop().toLowerCase();
        if (!["txt", "md", "pdf"].includes(ext)) {
          toast("Chỉ hỗ trợ .txt .md .pdf", "err");
          continue;
        }
        if (docs.find((d) => d.name === file.name)) {
          toast("File đã tồn tại: " + file.name, "err");
          continue;
        }

        const doc = {
          name: file.name,
          ext,
          size: file.size,
          chunks: [],
          status: "processing",
        };
        setDocs((prev) => [...prev, doc]);

        try {
          const text = ext === "pdf" ? await readPDF(file) : await readTxt(file);
          const chunks = chunkText(text, file.name);
          setDocs((prev) =>
            prev.map((d) =>
              d.name === file.name ? { ...d, chunks, status: "ready" } : d
            )
          );
          toast(`${file.name} — ${chunks.length} chunks`, "ok");
        } catch {
          setDocs((prev) =>
            prev.map((d) =>
              d.name === file.name ? { ...d, status: "error" } : d
            )
          );
          toast("Lỗi đọc file: " + file.name, "err");
        }
      }
    },
    [docs, toast]
  );

  const deleteDoc = useCallback((index) => {
    setDocs((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const readyCount = docs.filter((d) => d.status === "ready").length;

  return { docs, handleFiles, deleteDoc, readyCount };
}
