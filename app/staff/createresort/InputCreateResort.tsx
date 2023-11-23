'use client';

import React, { Fragment } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputCreateResortProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const InputCreateResort: React.FC<InputCreateResortProps> = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <Fragment>
      <div className="w-[277px] text-gray-700">{label}</div>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        type={type}
        className={`text-gray-800 px-1 w-full bg-[#F8F8F8] rounded-md border-2 py-3  focus:outline-none focus:border-t-transparent focus:border-b-transparent focus:border-l-transparent focus:border-r-transparent ${
          errors[id] ? 'border-red-400' : 'border-gray-500'
        } ${errors[id] ? 'focus:border-red-400' : 'focus:border-black'}`}
      />
    </Fragment>
  );
};

export default InputCreateResort;
