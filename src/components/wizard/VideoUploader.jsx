import React, { useCallback, useRef, useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { BASE_URL } from "../../lib/api";
import { getAccessToken } from "../../lib/auth";

const ACCEPT               = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_DURATION_SECONDS = 20;
const MAX_SIZE             = 50 * 1024 * 1024;

async function validateDuration(file) {
  return new Promise((resolve) => {
    const url   = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      const duration = Number(video.duration || 0);
      resolve(duration <= MAX_DURATION_SECONDS ? { ok: true, duration } : { ok: false, duration });
    };
    video.onerror = () => { URL.revokeObjectURL(url); resolve({ ok: false, duration: 0 }); };
    video.src = url;
  });
}

export default function VideoUploader({ value = null, onChange, showError }) {
  const [dragOver, setDragOver]     = useState(false);
  const [localError, setLocalError] = useState("");
  const [uploading, setUploading]   = useState(false);
  const inputRef = useRef(null);

  const handleFile = useCallback(async (file) => {
    setLocalError("");
    if (!file) return;
    if (!ACCEPT.includes(file.type))  { setLocalError("Unsupported format"); return; }
    if (file.size > MAX_SIZE)         { setLocalError("File too large (max 50MB)"); return; }

    const res = await validateDuration(file);
    if (!res.ok) { setLocalError("Video must be 20 seconds or less"); return; }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("files", file);

      const token    = getAccessToken();
      const response = await fetch(`${BASE_URL}/properties/upload-media`, {
        method:  "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body:    formData,
      });

      const data = await response.json();
      if (!response.ok || !data?.success) throw new Error(data?.message || "Upload failed.");

      const url = data.data?.urls?.[0];
      if (!url) throw new Error("No URL returned from server.");

      onChange?.({
        id:       crypto.randomUUID(),
        url,                          // Cloudinary HTTPS URL
        filename: file.name,
        size:     file.size,
        duration: res.duration,
      });
    } catch (err) {
      setLocalError(err.message || "Video upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer?.files?.[0];
    if (f) handleFile(f);
  }

  return (
    <div>
      {((showError && !value) || localError) && (
        <div className="text-red-600 text-sm mb-2">{localError || "Please upload a video (max 20s)"}</div>
      )}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`rounded-xl border border-dashed border-orange-300 p-4 ${dragOver ? "ring-2 ring-orange-300" : ""}`}
      >
        {value ? (
          <div className="relative">
            <video src={value.url} controls className="w-full rounded-lg" />
            <button onClick={() => onChange?.(null)} className="absolute right-2 top-2 bg-white/90 rounded-full p-1 text-orange-500 hover:bg-white" aria-label="Remove video">
              <X size={16} />
            </button>
            <div className="mt-2 text-xs text-gray-600">
              {value.filename} • ~{Math.round((value.size || 0) / 1024)} KB • {Math.round(value.duration)}s
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-40">
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 size={28} className="animate-spin text-orange-400" />
                <span className="text-xs text-gray-500">Uploading…</span>
              </div>
            ) : (
              <button type="button" onClick={() => inputRef.current?.click()} className="text-orange-500 hover:text-orange-600">
                <Plus />
              </button>
            )}
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept={ACCEPT.join(",")} className="hidden"
        onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
    </div>
  );
}