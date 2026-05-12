import React from "react";

const Select = ({
  value = "",
  onChange,
  options = [],
  placeholder = "Select an option",
  disabled = false,
  className = "",
  error = "",
  required = false,
  ...props
}) => {
  return (
    <div className="select-wrapper">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`select ${className} ${error ? "select--error" : ""}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="select-error">{error}</span>}
    </div>
  );
};

export default Select;
