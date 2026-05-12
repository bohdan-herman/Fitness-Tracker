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
  return (
    <div className="library__card card">
      <h3 className="workout-card__name">{workout.name}</h3>
      <p className="workout-card__meta">
        {workout.exercises?.length || 0} exercise
        {workout.exercises?.length !== 1 ? "s" : ""}
      </p>

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
