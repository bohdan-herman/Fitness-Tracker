import React from "react";
import Button from "./Button";

const SessionCard = ({ session, onContinue, onEnd, isEnding = false }) => {
  const isActive = session.status !== "completed";

  return (
    <li className="card-session">
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
      </div>
    </li>
  );
};

export default SessionCard;
