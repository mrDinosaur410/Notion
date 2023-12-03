import React from "react";

export default function Input({
  $type,
  $placeholder,
  $onDataChange,
  $required,
  $value,
}) {
  return (
    <input
      type={$type}
      className="block w-full p-2.5 text-gray-800 border border-gray-300 rounded-lg bg-gray-50 sm:text-md"
      placeholder={$placeholder}
      value={$value}
      onChange={(e) => $onDataChange(e.target.value)}
      required={$required}
    />
  );
}
