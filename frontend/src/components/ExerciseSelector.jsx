import React from "react";

const ExerciseSelector = ({
  muscleGroups = [],
  selectedMuscleGroup = "",
  onMuscleGroupSelect,
  exercises = [],
  selectedExercises = [],
  onExerciseToggle,
  isLoading = false,
  showSelectedCount = true,
}) => {
  const isExerciseSelected = (exerciseId) => {
    return selectedExercises.some((ex) => ex.id === exerciseId);
  };

  return (
    <div className="exercise-selector">
      <label className="exercise-selector__label">Select Exercises</label>

      {/* Muscle group buttons */}
      <div className="exercise-selector__muscle-grid">
        {muscleGroups.map((group) => (
          <button
            key={group.id}
            className={`exercise-selector__muscle-btn ${
              selectedMuscleGroup === group.id ? "active" : ""
            }`}
            onClick={() => onMuscleGroupSelect(group.id)}
            type="button"
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* Exercises list */}
      {isLoading ? (
        <p className="text-small text-muted">Loading exercises...</p>
      ) : (
        <div className="exercise-selector__list">
          {exercises.length === 0 ? (
            <p className="text-small text-muted">No exercises found</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {exercises.map((exercise) => (
                <li
                  key={exercise.id}
                  className={`exercise-selector__item ${
                    isExerciseSelected(exercise.id)
                      ? "exercise-selector__item--selected"
                      : ""
                  }`}
                  onClick={() => onExerciseToggle(exercise)}
                >
                  <input
                    type="checkbox"
                    checked={isExerciseSelected(exercise.id)}
                    onChange={() => onExerciseToggle(exercise)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-small">{exercise.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {showSelectedCount && (
        <p className="exercise-selector__count">
          {selectedExercises.length} exercise
          {selectedExercises.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
};

export default ExerciseSelector;
