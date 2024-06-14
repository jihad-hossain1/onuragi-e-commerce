import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  id: string;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  id,
  autoComplete = "off",
  onChange,
  value,
  ...rest
}) => {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="text-sm font-medium text-neutral-700 dark:text-neutral-200 "
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        {...rest}
        placeholder={label}
        className="w-full  rounded-xl border border-pink-500 px-3 py-2  shadow-sm focus-within:ring-1 focus-within:border-pink-700 mb-5 focus:border-pink-100 focus:outline-none focus:ring-0"
      />
    </div>
  );
};

export default InputField;
