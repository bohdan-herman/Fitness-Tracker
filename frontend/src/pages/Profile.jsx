import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Button, Input } from "../components";
import { updateProfileNameAPI } from "../api/profileAPI.jsx";

const Profile = () => {
  const profile = useLoaderData();
  const [isEditingName, setIsEditingName] = useState(false);
  const [currentName, setCurrentName] = useState(profile?.name || "");
  const [newName, setNewName] = useState(profile?.name || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleNameUpdate = async () => {
    if (!newName.trim()) {
      alert("Name cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      const result = await updateProfileNameAPI(newName);
      if (result) {
        setCurrentName(result.name ?? newName);
        setIsEditingName(false);
      }
    } catch (error) {
      console.error("Error updating name:", error);
      alert("Failed to update name");
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="page page--profile">
        <main className="page__content page__content--centered">
          <p className="text-normal text-muted">Failed to load profile</p>
        </main>
      </div>
    );
  }

  return (
    <div className="page page--profile">
      <main className="page__content page__content--centered">
        <div className="profile__avatar-wrapper">
          <div className="profile__avatar">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
              <path
                d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {isEditingName ? (
          <div className="profile__edit-form">
            <Input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new name"
            />
            <div className="profile__edit-actions">
              <Button variant="primary" onClick={handleNameUpdate} loading={isLoading}>
                Save
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setIsEditingName(false);
                  setNewName(currentName);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <h1 className="h1 profile__name">{currentName || "No name set"}</h1>
        )}

        <div className="profile__actions">
          {!isEditingName && (
            <Button size="lg" variant="primary" onClick={() => setIsEditingName(true)}>
              Change Name
            </Button>
          )}
          <Button size="lg" variant="secondary">
            Change Photo
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
