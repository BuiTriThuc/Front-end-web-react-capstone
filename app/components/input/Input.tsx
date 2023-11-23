'use client';

import { Tooltip } from 'flowbite-react';
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiHelpCircle } from 'react-icons/bi';

interface InputProps {
  id: string;
  label: string;
  tooltipContent?: string;
  value?: any;
  onChange?: (value: any) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  disabled,
  tooltipContent,
  formatPrice,
  value,
  required,
  register,
  onChange,
  errors,
}) => {
  return (
    <div className="w-full flex-col flex">
      {/* {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )} */}
      <div className="py-3 flex flex-row gap-1 items-center">
        <label>{label}</label>
        {tooltipContent && (
          <Tooltip content={tooltipContent}>
            <BiHelpCircle size={20} />
          </Tooltip>
        )}
      </div>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className={`peer p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus:ring-0
        ${errors[id] ? 'border-red-400' : 'border-gray-400'} ${
          errors[id] ? 'focus:border-red-400' : 'focus:border-black'
        }`}
      />
    </div>
  );
};

export default Input;
