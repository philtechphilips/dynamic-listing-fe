import React, { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | string[];
  icon?: ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  className = '',
  id,
  type = 'text',
  ...props
}: InputProps) {
  const inputId = id || props.name || Math.random().toString(36).substr(2, 9);
  const hasError = !!error && (Array.isArray(error) ? error.length > 0 : true);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1.5 ml-1"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`
            w-full bg-white border border-gray-200 text-gray-900 rounded-xl 
            ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 
            placeholder-gray-200
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white
            hover:border-gray-300 hover:bg-gray-50
            disabled:opacity-50 disabled:cursor-not-allowed
            ${hasError ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''}
          `}
          {...props}
        />
      </div>
      {hasError && (
        <p className="mt-1.5 text-sm text-red-500 ml-1">
          {Array.isArray(error) ? error[0] : error}
        </p>
      )}
    </div>
  );
}
