import React from "react";
import Button from "./Button";

const WorkoutCard = ({
  workout,
  onStartSession,
  onEdit,
  onDelete,
  isDeleting = false,
  isCreatingSession = false,
  showDeleteConfirm = false,
  onCancelDelete,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("ru-RU", {
        month: "short",
        day: "numeric",
        year:
          date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  const lastSessionDate = workout.sessions?.[0]?.date || null;
  const formattedLastSessionDate = formatDate(lastSessionDate);

  return (
    <div className="library__card card">
      <h3 className="workout-card__name">{workout.name}</h3>
      <p className="workout-card__meta">
        {workout.exercises?.length || 0} exercise
        {workout.exercises?.length !== 1 ? "s" : ""}
      </p>

      {/* Exercises list */}
      {workout.exercises && workout.exercises.length > 0 && (
        <div className="workout-card__exercises">
          <ul className="workout-card__exercises-list">
            {workout.exercises.slice(0, 4).map((exercise) => (
              <li key={exercise.id} className="workout-card__exercise-item">
                {exercise.name}
              </li>
            ))}
            {workout.exercises.length > 4 && (
              <li className="workout-card__exercise-item text-muted">
                +{workout.exercises.length - 4} more
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Last session date */}
      {formattedLastSessionDate && (
        <div className="workout-card__last-session">
          <span className="text-small text-muted">
            Last used:{" "}
            <span className="text-semibold">{formattedLastSessionDate}</span>
          </span>
        </div>
      )}

      <div className="workout-card__actions">
        <Button
          variant="primary"
          onClick={() => onStartSession(workout.id)}
          loading={isCreatingSession}
          className="workout-card__btn"
        >
          Start
        </Button>

        <Button
          variant="secondary"
          onClick={() => onEdit(workout)}
          className="workout-card__btn"
        >
          Edit
        </Button>

        {showDeleteConfirm ? (
          <>
            <Button
              variant="danger"
              onClick={() => onDelete(workout.id)}
              loading={isDeleting}
              className="workout-card__btn"
            >
              Confirm
            </Button>
            <Button
              variant="secondary"
              onClick={onCancelDelete}
              className="workout-card__btn"
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="danger"
            onClick={() => onDelete(workout.id)}
            className="workout-card__btn"
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default WorkoutCard;
