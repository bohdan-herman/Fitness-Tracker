import React from "react";

const Input = ({
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  className = "",
  error = "",
  icon = null,
  disabled = false,
  required = false,
  ...props
}) => {
  return (
    <div className="input-wrapper">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input ${className} ${error ? "input--error" : ""}`}
        disabled={disabled}
        required={required}
        {...props}
      />
      {icon && <span className="input-icon">{icon}</span>}
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;
