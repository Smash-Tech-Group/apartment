import React, { useCallback, useRef, useState } from "react";
import { Plus, X, GripVertical, Loader2 } from "lucide-react";
import { BASE_URL } from "../../lib/api";
import { getAccessToken } from "../../lib/auth";

const MAX_FILES = 5;
const ACCEPT    = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE  = 5 * 1024 * 1024;

export default function PhotoUploader({ value = [], onChange, showError }) {
  const [dragOver, setDragOver]       = useState(false);
  const [uploading, setUploading]     = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef(null);

  const handleFiles = useCallback(async (files) => {
    setUploadError("");
    const valid = Array.from(files)
      .filter((f) => ACCEPT.includes(f.type) && f.size <= MAX_SIZE)
      .slice(0, MAX_FILES - value.length);

    if (valid.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      valid.forEach((f) => formData.append("files", f));

      const token    = getAccessToken();
      const response = await fetch(`${BASE_URL}/properties/upload-media`, {
        method:  "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body:    formData,
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Upload failed.");
      }

      const urls = data.data?.urls || [];
      const newPhotos = urls.map((url, i) => ({
        id:       crypto.randomUUID(),
        url,                          // Cloudinary HTTPS URL
        filename: valid[i]?.name || `photo-${i + 1}`,
      }));

      onChange?.([...value, ...newPhotos]);
    } catch (err) {
      setUploadError(err.message || "Photo upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }, [onChange, value]);

  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer?.files?.length) handleFiles(e.dataTransfer.files);
  }

  function remove(id) {
    onChange?.(value.filter((p) => p.id !== id));
  }

  function reorder(startIndex, endIndex) {
    const arr = [...value];
    const [removed] = arr.splice(startIndex, 1);
    arr.splice(endIndex, 0, removed);
    onChange?.(arr);
  }

  const grid = new Array(MAX_FILES).fill(null);

  return (
    <div>
      {showError && value.length === 0 && !uploading && (
        <p className="text-sm text-red-500 mb-2">You must upload at least 1 photo</p>
      )}
      {uploadError && (
        <p className="text-sm text-red-500 mb-2">{uploadError}</p>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`items-center grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 ${dragOver ? "ring-2 ring-orange-300" : ""}`}
      >
        {grid.map((_, i) => {
          const photo = value[i];
          return (
            <div key={i} className="aspect-square rounded-xl border border-dashed border-orange-300 flex items-center justify-center relative overflow-hidden">
              {photo ? (
                <div
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { const from = Number(e.dataTransfer.getData("text/plain")); reorder(from, i); }}
                  className="w-full h-full"
                >
                  <img src={photo.url} alt={photo.filename} className="w-full h-full object-cover" />
                  <button onClick={() => remove(photo.id)} className="absolute right-2 top-2 bg-white/90 rounded-full p-1 text-orange-500 hover:bg-white" aria-label="Remove">
                    <X size={16} />
                  </button>
                  <div className="absolute left-2 top-2 bg-white/90 rounded-md p-1 text-gray-600 cursor-grab">
                    <GripVertical size={16} />
                  </div>
                </div>
              ) : uploading && i === value.length ? (
                <Loader2 size={24} className="animate-spin text-orange-400" />
              ) : (
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  disabled={uploading}
                  className="text-orange-500 hover:text-orange-600 inline-flex items-center justify-center disabled:opacity-50"
                >
                  <Plus />
                </button>
              )}
            </div>
          );
        })}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.join(",")}
        multiple
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />
    </div>
  );
}