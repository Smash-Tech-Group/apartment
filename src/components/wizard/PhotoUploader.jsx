import React, { useCallback, useRef, useState } from "react";
import { Plus, X, GripVertical } from "lucide-react";

const MAX_FILES = 5;
const ACCEPT = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

function fileToObj(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ id: crypto.randomUUID(), url: reader.result, filename: file.name, size: file.size });
    reader.readAsDataURL(file);
  });
}

export default function PhotoUploader({ value = [], onChange, showError }) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = useCallback(async (files) => {
    const valid = Array.from(files)
      .filter((f) => ACCEPT.includes(f.type) && f.size <= MAX_SIZE)
      .slice(0, MAX_FILES - value.length);
    const objs = await Promise.all(valid.map(fileToObj));
    onChange?.([...value, ...objs]);
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
      {showError && value.length === 0 && (
        <p className="text-sm text-red-500 mb-2">You must upload at-least 1 photo</p>
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
                <div draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", i)} onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>{ const from = Number(e.dataTransfer.getData("text/plain")); reorder(from,i); }} className="w-full h-full">
                  <img src={photo.url} alt={photo.filename} className="w-full h-full object-cover" />
                  <button onClick={() => remove(photo.id)} className="absolute right-2 top-2 bg-white/90 rounded-full p-1 text-orange-500 hover:bg-white" aria-label="Remove image">
                    <X size={16} />
                  </button>
                  <div className="absolute left-2 top-2 bg-white/90 rounded-md p-1 text-gray-600 cursor-grab">
                    <GripVertical size={16} />
                  </div>
                </div>
              ) : (
                <button type="button" onClick={()=>inputRef.current?.click()} className="text-orange-500 hover:text-orange-600 inline-flex items-center justify-center">
                  <Plus />
                </button>
              )}
            </div>
          );
        })}
      </div>
      
      <input ref={inputRef} type="file" accept={ACCEPT.join(",")} multiple className="hidden" onChange={(e)=> e.target.files && handleFiles(e.target.files)} />
      
    </div>
  );
}




