import React from "react";

export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
      {children}
    </label>
  );
}

export function Input(props) {
  const { invalid, ...rest } = props;
  return (
    <input
      {...rest}
      className={`w-full rounded-full border px-5 py-5 outline-none placeholder:text-gray-400 bg-white shadow-sm focus:ring-2 focus:ring-orange-300 ${
        invalid ? "border-red-400" : "border-gray-200"
      }`}
    />
  );
}

export function Select({ children, invalid, ...rest }) {
  return (
    <div className="relative">
      <select
        {...rest}
        className={`w-full appearance-none rounded-full border px-5 py-5 bg-white shadow-sm focus:ring-2 focus:ring-orange-300 ${
          invalid ? "border-red-400" : "border-gray-200"
        }`}
      >
        {children}
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute right-7 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-700"
        viewBox="0 0 14 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13.4727 0.500845L6.98599 6.96484L0.499323 0.500845" />
      </svg>
      
    </div>
    
  );
}

export function TextArea({ invalid, ...rest }) {
  return (
    <textarea
      {...rest}
      className={`w-full rounded-2xl border px-5 py-4 min-h-[120px] outline-none placeholder:text-gray-400 bg-white shadow-sm focus:ring-2 focus:ring-orange-300 ${
        invalid ? "border-red-400" : "border-gray-200"
      }`}
    />
  );
}




