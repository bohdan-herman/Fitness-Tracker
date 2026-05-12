import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, LoadingState } from "../components";
import SetInputForm from "../components/SetInputForm";
import { getSessionAPI, endSessionAPI } from "../api/sessionAPI.jsx";
import "../styles/session.css";

const Session = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sets, setSets] = useState({});
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await getSessionAPI(sessionId);
        setSession(data);

        // Initialize sets state with empty arrays for each exercise
        const initialSets = {};
        data.workout?.exercises?.forEach((exercise) => {
          initialSets[exercise.id] =
            data.sets?.filter((s) => s.exerciseId === exercise.id) || [];
        });
        setSets(initialSets);
      } catch (err) {
        setError(err?.message || "Failed to load session");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  const handleAddSet = (exerciseId, weight, reps) => {
    setSets((prev) => ({
      ...prev,
      [exerciseId]: [
        ...(prev[exerciseId] || []),
        { exerciseId, weight: parseFloat(weight), reps: parseInt(reps) },
      ],
    }));
  };

  const handleRemoveSet = (exerciseId, index) => {
    setSets((prev) => ({
      ...prev,
      [exerciseId]: prev[exerciseId].filter((_, i) => i !== index),
    }));
  };

  const handleEndSession = async () => {
    setIsEnding(true);
    try {
      // Flatten sets array
      const allSets = Object.values(sets).flat();
      await endSessionAPI(sessionId, allSets);
      navigate("/");
    } catch (err) {
      alert(err?.message || "Failed to end session");
    } finally {
      setIsEnding(false);
    }
  };

  if (loading) {
    return (
      <div className="page page--session">
        <LoadingState message="Loading session..." fullPage={true} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page page--session">
        <div className="session__error">{error}</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="page page--session">
        <div className="session__error">Session not found</div>
      </div>
    );
  }

  return (
    <div className="page page--session">
      <main className="page__content">
        <div className="session__header">
          <h1 className="h1 session__title">
            {session.workout?.name || "Unnamed Workout"}
          </h1>
          <span className="text-small text-muted session__status">Active</span>
        </div>

        <div className="session__exercises">
          {session.workout?.exercises?.map((exercise) => (
            <div key={exercise.id} className="session__exercise-card">
              <div className="session__exercise-header">
                <h2 className="h2 session__exercise-name">{exercise.name}</h2>
                <span className="text-small text-muted">
                  {exercise.muscleGroup}
                </span>
              </div>

              <div className="session__exercise-sets">
                {sets[exercise.id]?.map((set, index) => (
                  <div key={index} className="session__set-item">
                    <span className="text-normal session__set-data">
                      {set.weight}kg × {set.reps}
                    </span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveSet(exercise.id, index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <SetInputForm
                onAddSet={(weight, reps) =>
                  handleAddSet(exercise.id, weight, reps)
                }
              />
            </div>
          ))}
        </div>

        <div className="session__actions">
          <Button
            variant="primary"
            size="lg"
            onClick={handleEndSession}
            loading={isEnding}
          >
            End Session
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Session;
