import React from "react";
import { Check } from "lucide-react";

export default function AmenityGrid({ items, value = {}, onChange }) {
  function toggle(key) {
    const next = { ...value, [key]: !value[key] };
    onChange?.(next);
  }
  return (
    <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
      {items.map((it) => (
        <button
          key={it.key}
          type="button"
          onClick={() => toggle(it.key)}
          className={`group relative flex flex-col items-start gap-3 rounded-lg border px-5 py-4 text-left hover:border-orange-300 transition ${
            value[it.key] ? "border-orange-400 bg-orange-50" : "border-gray-200"
          }`}
          aria-pressed={!!value[it.key]}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-600">
            {it.icon}
          </span>
          <span className="text-sm font-medium text-gray-800">{it.label}</span>
          {value[it.key] && (
            <span className="absolute right-3 top-3 text-orange-500"><Check size={18} /></span>
          )}
        </button>
      ))}
    </div>
  );
}




