import React from "react";

export function CustomInput({
  label = "",
  error,
  touched,
  icon,
  errorActive,
  containerStyle = "",
  className="",
  ...props
}) {
  return (
    <label className={`block mt-6 ${containerStyle}`}>
      <span className="block text-sm font-medium text-slate-700">{label}</span>
      <input
        type={props.type}
        className={`bg-transparent py-[10px] px-[2px] w-full text-white border-b-2 border-transparent border-b-primary focus:!border-0 focus:!border-b-2 focus:!outline-0 focus:!ring-0 rounded ${className}`}
        {...props}
      />
      {error && touched && errorActive ==props.name && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </label>
  );
}


