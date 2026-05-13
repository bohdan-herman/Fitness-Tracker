import React from "react";
import Input from "./Input";

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
    <path
      d="M16.5 16.5L21 21"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const SearchInput = ({
  value = "",
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input-search ${className}`}
    />
  );
};

export default SearchInput;
