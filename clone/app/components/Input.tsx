"use client";
import React from 'react';

interface InputProps {
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  value: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ id, onChange, type = "text", value, label }) => {
  return (
    <div className="relative text-sm lg:text-md">
      <input
        id={id}
        onChange={onChange}
        type={type}
        value={value}
        className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-800 appearance-none focus:outline-none focus:ring-0 peer"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
