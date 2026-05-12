import React from "react";

const ExerciseCard = ({
  exercise,
  onSelect,
  isSelected = false,
  showArrow = true,
  maxWeight = false,
}) => {
  return (
    <div
      className={`card-exercise ${isSelected ? "card-exercise--selected" : ""}`}
    >
      <div className="card-exercise__info">
        <p className="card-exercise__title">{exercise.name}</p>
        {maxWeight && (
          <p className="card-exercise__subtitle">
            Max weight: {exercise.maxWeight ?? "none"}
          </p>
        )}
      </div>
      {showArrow && (
        <button
          className="btn-icon"
          onClick={onSelect}
          type="button"
          aria-label="Select exercise"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18l6-6-6-6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ExerciseCard;
