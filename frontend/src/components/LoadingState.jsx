import React from "react";

const LoadingState = ({ message = "Loading...", fullPage = false }) => {
  const className = fullPage
    ? "loading-state loading-state--fullpage"
    : "loading-state";

  return (
    <div className={className}>
      <div className="loading-spinner"></div>
      <p className="text-normal loading-state__text">{message}</p>
    </div>
  );
};

export default LoadingState;
