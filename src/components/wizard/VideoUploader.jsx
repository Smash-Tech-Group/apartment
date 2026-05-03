import React, { useCallback, useRef, useState } from "react";
import { Plus, X } from "lucide-react";

const ACCEPT = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_DURATION_SECONDS = 20;
const MAX_SIZE = 50 * 1024 * 1024;

async function validateDuration(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      const duration = Number(video.duration || 0);
      resolve(duration <= MAX_DURATION_SECONDS ? { ok: true, duration } : { ok: false, duration });
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ ok: false, duration: 0 });
    };
    video.src = url;
  });
}

function fileToObj(file, duration) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve({ id: crypto.randomUUID(), url: reader.result, filename: file.name, size: file.size, duration });
    reader.readAsDataURL(file);
  });
}

export default function VideoUploader({ value = null, onChange, showError }) {
  const [dragOver, setDragOver] = useState(false);
  const [localError, setLocalError] = useState("");
  const inputRef = useRef(null);

  const handleFile = useCallback(async (file) => {
    setLocalError("");
    if (!file) return;
    if (!ACCEPT.includes(file.type)) { setLocalError("Unsupported format"); return; }
    if (file.size > MAX_SIZE) { setLocalError("File too large"); return; }
    const res = await validateDuration(file);
    if (!res.ok) { setLocalError("Video must be 20s or less"); return; }
    const obj = await fileToObj(file, res.duration);
    onChange?.(obj);
  }, [onChange]);

  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer?.files?.[0];
    if (f) handleFile(f);
  }

  function remove() {
    onChange?.(null);
  }

  return (
    <div>
      {(showError && !value) || localError ? (
        <div className="text-red-600 text-sm mb-2">{localError || "Please upload a video (max 20s)"}</div>
      ) : null}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`rounded-xl border border-dashed border-orange-300 p-4 ${dragOver ? "ring-2 ring-orange-300" : ""}`}
      >
        {value ? (
          <div className="relative">
            <video src={value.url} controls className="w-full rounded-lg" />
            <button onClick={remove} className="absolute right-2 top-2 bg-white/90 rounded-full p-1 text-orange-500 hover:bg-white" aria-label="Remove video">
              <X size={16} />
            </button>
            <div className="mt-2 text-xs text-gray-600">{value.filename} • ~{Math.round((value.size || 0) / 1024)} KB • {Math.round(value.duration)}s</div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-40">
            <button type="button" onClick={()=>inputRef.current?.click()} className="text-orange-500 hover:text-orange-600 inline-flex items-center justify-center">
              <Plus />
            </button>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.join(",")}
        className="hidden"
        onChange={(e)=> e.target.files && handleFile(e.target.files[0])}
      />
    </div>
  );
}



