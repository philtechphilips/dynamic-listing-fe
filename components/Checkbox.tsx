import React, { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Checkbox({
  label,
  className = "",
  id,
  ...props
}: CheckboxProps) {
  const checkboxId =
    id || props.name || Math.random().toString(36).substr(2, 9);

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex items-center">
        <input
          id={checkboxId}
          type="checkbox"
          className="
            peer h-5 w-5 cursor-pointer appearance-none rounded-md 
            border border-gray-300 bg-white 
            transition-all duration-200
            checked:border-primary checked:bg-primary 
            hover:border-gray-400 hover:bg-gray-50
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1 focus:ring-offset-white
          "
          {...props}
        />
        <svg
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 6L4.5 8L9.5 3.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {label && (
        <label
          htmlFor={checkboxId}
          className="ml-3 select-none text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
        >
          {label}
        </label>
      )}
    </div>
  );
}
