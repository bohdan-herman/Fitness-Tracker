import React from "react";

const CardList = ({
  children,
  className = "",
  isEmpty = false,
  emptyMessage = "",
}) => {
  if (isEmpty) {
    return (
      <div className="card-list__empty">
        <p className="empty-state__message">{emptyMessage}</p>
      </div>
    );
  }

  return <ul className={`card-list ${className}`}>{children}</ul>;
};

export default CardList;
