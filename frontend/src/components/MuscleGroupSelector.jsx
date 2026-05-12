import React from "react";

const MuscleGroupSelector = ({
  muscleGroups = [],
  selectedId = "",
  onSelect,
  showImages = false,
}) => {
  return (
    <div className="exercises__muscle-grid">
      {muscleGroups.map((group) => (
        <button
          key={group.id}
          className={`exercises__muscle-btn ${
            selectedId === group.id ? "active" : ""
          }`}
          onClick={() => onSelect(group.id)}
          type="button"
        >
          {showImages && group.img && (
            <img
              className="exercises__muscle-img"
              src={group.img}
              alt={group.label}
              loading="lazy"
            />
          )}
          <span className="text-normal">{group.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MuscleGroupSelector;
