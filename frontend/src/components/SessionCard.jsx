import React from "react";
import Button from "./Button";

const SessionCard = ({
  session,
  onContinue,
  onEnd,
  onViewDetails,
  isEnding = false,
}) => {
  const isActive = session.status !== "completed";

  const handleCardClick = () => {
    if (!isActive && onViewDetails) {
      onViewDetails(session);
    }
  };

  return (
    <li
      className={`card-session ${!isActive && onViewDetails ? "card-session--clickable" : ""}`}
      onClick={handleCardClick}
      role={!isActive && onViewDetails ? "button" : undefined}
      tabIndex={!isActive && onViewDetails ? 0 : undefined}
    >
      <div className="card-session__left">
        <span className="text-semibold card-session__name">
          {session.workout?.name || "Unnamed Workout"}
        </span>
        <span className="text-small text-muted">
          {isActive ? "Active" : "Completed"}
        </span>
      </div>

      <div className="card-session__right">
        <div className="card-session__meta">
          <span className="text-normal card-session__sets">
            {session.workout?.exercises?.length || 0}
          </span>

          <span className="card-session__icon" aria-label="trophy">
            🏆
          </span>

          <span className="text-normal card-session__date">
            {new Date(session.date ?? session.createdAt).toLocaleDateString()}
          </span>
        </div>

        {isActive && (
          <div className="card-session__buttons">
            <Button variant="primary" size="sm" onClick={onContinue}>
              Continue
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onEnd}
              disabled={isEnding}
              loading={isEnding}
            >
              End
            </Button>
          </div>
        )}

        {!isActive && onViewDetails && (
          <div className="card-session__buttons">
            <Button variant="secondary" size="sm" onClick={handleCardClick}>
              View Details
            </Button>
          </div>
        )}
      </div>
    </li>
  );
};

export default SessionCard;
