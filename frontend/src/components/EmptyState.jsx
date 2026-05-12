import React from "react";

const EmptyState = ({
  message = "No items found",
  icon = null,
  action = null,
  fullPage = false,
}) => {
  const className = fullPage
    ? "empty-state empty-state--fullpage"
    : "empty-state";

  return (
    <div className={className}>
      {icon && <div className="empty-state__icon">{icon}</div>}
      <p className="text-normal empty-state__message">{message}</p>
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
};

export default EmptyState;
