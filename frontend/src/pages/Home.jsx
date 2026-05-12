import { useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { SessionCard, CardList, EmptyState } from "../components";
import { endSessionAPI } from "../api/sessionAPI.jsx";

const Home = () => {
  const initialSessions = useLoaderData();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState(initialSessions ?? []);
  const [endingSessionId, setEndingSessionId] = useState(null);

  const sortedSessions = useMemo(() => {
    return [...(sessions ?? [])].sort((a, b) => {
      const ad = new Date(a?.date ?? a?.createdAt ?? 0).getTime();
      const bd = new Date(b?.date ?? b?.createdAt ?? 0).getTime();
      return bd - ad;
    });
  }, [sessions]);

  const handleContinueSession = (sessionId) => {
    navigate(`/session/${sessionId}`);
  };

  const handleEndSession = async (sessionId) => {
    setEndingSessionId(sessionId);
    try {
      const ended = await endSessionAPI(sessionId, []);
      setSessions((prev) =>
        (prev ?? []).map((s) => (s.id === sessionId ? { ...s, ...ended } : s)),
      );
    } catch (e) {
      alert(e?.message || "Failed to end session");
    } finally {
      setEndingSessionId(null);
    }
  };

  const isEmpty = !sortedSessions || sortedSessions.length === 0;

  return (
    <div className="page page--home">
      <main className="page__content">
        <h1 className="h1 home__title">Your Last Sessions</h1>

        <CardList
          isEmpty={isEmpty}
          emptyMessage="No sessions yet. Start your first workout!"
          className="home__sessions-list"
        >
          {sortedSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onContinue={() => handleContinueSession(session.id)}
              onEnd={() => handleEndSession(session.id)}
              isEnding={endingSessionId === session.id}
            />
          ))}
        </CardList>
      </main>
    </div>
  );
};

export default Home;
