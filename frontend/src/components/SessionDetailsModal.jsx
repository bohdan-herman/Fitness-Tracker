import React from "react";
import Modal from "./Modal";
import "../styles/sessionDetailsModal.css";

const SessionDetailsModal = ({ session, isOpen, onClose }) => {
  if (!session) return null;

  const completedDate = new Date(session.date ?? session.createdAt);
  const formatDate = (date) => {
    return date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const groupSetsByExercise = () => {
    const grouped = {};

    session.workout?.exercises?.forEach((exercise) => {
      grouped[exercise.id] = {
        exercise,
        sets: session.sets?.filter((s) => s.exerciseId === exercise.id) || [],
      };
    });

    return grouped;
  };

  const exerciseGroups = groupSetsByExercise();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Session Details">
      <div className="session-details">
        <div className="session-details__header">
          <h2 className="h2 session-details__title">
            {session.workout?.name || "Unnamed Workout"}
          </h2>
          <p className="text-small text-muted session-details__date">
            {formatDate(completedDate)}
          </p>
          <span className="session-details__badge">
            {session.status === "completed" ? "✓ Completed" : "Active"}
          </span>
        </div>

        <div className="session-details__exercises">
          {Object.entries(exerciseGroups).map(
            ([exerciseId, { exercise, sets }]) => (
              <div key={exerciseId} className="session-details__exercise">
                <div className="session-details__exercise-header">
                  <h3 className="h3 session-details__exercise-name">
                    {exercise.name}
                  </h3>
                  <span className="text-small text-muted session-details__muscle-group">
                    {exercise.muscleGroup}
                  </span>
                </div>

                {sets.length > 0 ? (
                  <div className="session-details__sets">
                    {sets.map((set, index) => (
                      <div key={index} className="session-details__set">
                        <span className="session-details__set-number">
                          Set {index + 1}
                        </span>
                        <div className="session-details__set-info">
                          <span className="session-details__set-weight">
                            {set.weight} kg
                          </span>
                          <span className="session-details__set-separator">
                            ×
                          </span>
                          <span className="session-details__set-reps">
                            {set.reps} reps
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-small text-muted session-details__no-sets">
                    No sets recorded
                  </p>
                )}
              </div>
            ),
          )}
        </div>

        {Object.values(exerciseGroups).every((eg) => eg.sets.length === 0) && (
          <div className="session-details__empty">
            <p className="text-muted">No exercises recorded for this session</p>
          </div>
        )}

        <div className="session-details__footer">
          <p className="text-small text-muted">
            Total Sets:{" "}
            <span className="text-semibold">
              {Object.values(exerciseGroups).reduce(
                (acc, eg) => acc + eg.sets.length,
                0,
              )}
            </span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default SessionDetailsModal;
