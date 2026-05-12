import { useState, useMemo } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  SearchInput,
  EmptyState,
  Button,
  WorkoutCard,
  WorkoutFormModal,
  WorkoutCarousel,
} from "../components";
import {
  createWorkoutAPI,
  deleteWorkoutAPI,
  updateWorkoutAPI,
  createSessionAPI,
} from "../api/libraryAPI";
import { exercisesByMuscleGroupAPI } from "../api/exercisesAPI.jsx";
import { useModal } from "../hooks";

const muscleGroups = [
  { id: "legs", label: "Legs" },
  { id: "chest", label: "Chest" },
  { id: "shoulders", label: "Shoulders" },
  { id: "back", label: "Back" },
  { id: "hands", label: "Hands" },
  { id: "abs", label: "Abs" },
];

const Library = () => {
  const workouts = useLoaderData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Modal states
  const createModal = useModal();
  const editModal = useModal();

  // Create form state
  const [workoutName, setWorkoutName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("legs");
  const [availableExercises, setAvailableExercises] = useState([]);
  const [isLoadingExercises, setIsLoadingExercises] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Edit form state
  const [editingWorkoutId, setEditingWorkoutId] = useState(null);
  const [editWorkoutName, setEditWorkoutName] = useState("");
  const [editSelectedExercises, setEditSelectedExercises] = useState([]);
  const [editSelectedMuscleGroup, setEditSelectedMuscleGroup] =
    useState("legs");
  const [editAvailableExercises, setEditAvailableExercises] = useState([]);
  const [isEditingExercises, setIsEditingExercises] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Delete state
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Session creation state
  const [isCreatingSession, setIsCreatingSession] = useState(null);

  // Filter workouts by search term
  const filteredWorkouts = useMemo(() => {
    return workouts.filter((w) =>
      w.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [workouts, searchTerm]);

  const currentWorkout = filteredWorkouts[currentIndex];

  // Load exercises for muscle group
  const loadExercises = async (muscleGroup) => {
    setIsLoadingExercises(true);
    try {
      const exercises = await exercisesByMuscleGroupAPI(muscleGroup);
      setAvailableExercises(exercises);
    } catch (error) {
      console.error("Error loading exercises:", error);
      setAvailableExercises([]);
    } finally {
      setIsLoadingExercises(false);
    }
  };

  // Handle create modal open
  const handleOpenCreateModal = async () => {
    createModal.open();
    await loadExercises(selectedMuscleGroup);
  };

  // Handle muscle group select in create form
  const handleMuscleGroupSelect = async (muscleGroup) => {
    setSelectedMuscleGroup(muscleGroup);
    await loadExercises(muscleGroup);
  };

  // Toggle exercise selection in create form
  const handleExerciseSelect = (exercise) => {
    setSelectedExercises((prev) => {
      const isSelected = prev.some((ex) => ex.id === exercise.id);
      if (isSelected) {
        return prev.filter((ex) => ex.id !== exercise.id);
      } else {
        return [...prev, { id: exercise.id }];
      }
    });
  };

  // Handle create workout
  const handleCreateWorkout = async () => {
    if (!workoutName.trim()) {
      alert("Please enter a workout name");
      return;
    }

    if (selectedExercises.length === 0) {
      alert("Please select at least one exercise");
      return;
    }

    setIsCreating(true);
    try {
      await createWorkoutAPI(workoutName, selectedExercises);
      setWorkoutName("");
      setSelectedExercises([]);
      setSelectedMuscleGroup("legs");
      createModal.close();
      window.location.reload();
    } catch (error) {
      console.error("Error creating workout:", error);
      alert("Failed to create workout");
    } finally {
      setIsCreating(false);
    }
  };

  // Handle open edit modal
  const handleOpenEditModal = (workout) => {
    setEditingWorkoutId(workout.id);
    setEditWorkoutName(workout.name);
    setEditSelectedExercises(workout.exercises.map((ex) => ({ id: ex.id })));
    setEditSelectedMuscleGroup("legs");
    editModal.open();
    loadEditExercises("legs");
  };

  const loadEditExercises = async (muscleGroup) => {
    setIsEditingExercises(true);
    try {
      const exercises = await exercisesByMuscleGroupAPI(muscleGroup);
      setEditAvailableExercises(exercises);
    } catch (error) {
      console.error("Error loading exercises:", error);
      setEditAvailableExercises([]);
    } finally {
      setIsEditingExercises(false);
    }
  };

  // Handle muscle group select in edit form
  const handleEditMuscleGroupSelect = async (muscleGroup) => {
    setEditSelectedMuscleGroup(muscleGroup);
    await loadEditExercises(muscleGroup);
  };

  // Toggle exercise selection in edit form
  const handleEditExerciseSelect = (exercise) => {
    setEditSelectedExercises((prev) => {
      const isSelected = prev.some((ex) => ex.id === exercise.id);
      if (isSelected) {
        return prev.filter((ex) => ex.id !== exercise.id);
      } else {
        return [...prev, { id: exercise.id }];
      }
    });
  };

  // Handle update workout
  const handleUpdateWorkout = async () => {
    if (!editWorkoutName.trim()) {
      alert("Please enter a workout name");
      return;
    }

    if (editSelectedExercises.length === 0) {
      alert("Please select at least one exercise");
      return;
    }

    setIsUpdating(true);
    try {
      await updateWorkoutAPI(
        editingWorkoutId,
        editWorkoutName,
        editSelectedExercises,
      );
      editModal.close();
      window.location.reload();
    } catch (error) {
      console.error("Error updating workout:", error);
      alert("Failed to update workout");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle delete workout
  const handleDeleteWorkout = async (workoutId) => {
    setIsDeleting(true);
    try {
      await deleteWorkoutAPI(workoutId);
      setDeleteConfirmId(null);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting workout:", error);
      alert("Failed to delete workout");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle create session
  const handleCreateSession = async (workoutId) => {
    setIsCreatingSession(workoutId);
    try {
      const session = await createSessionAPI(workoutId);
      if (session) {
        navigate(`/session/${session.id}`);
      }
    } catch (error) {
      console.error("Error creating session:", error);
      alert("Failed to create session");
    } finally {
      setIsCreatingSession(null);
    }
  };

  // Carousel handlers
  const handleNext = () => {
    if (currentIndex < filteredWorkouts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const closeCreateModal = () => {
    createModal.close();
    setWorkoutName("");
    setSelectedExercises([]);
  };

  const closeEditModal = () => {
    editModal.close();
    setEditingWorkoutId(null);
    setEditWorkoutName("");
    setEditSelectedExercises([]);
  };

  return (
    <div className="page page--library">
      <main className="page__content">
        {/* Search */}
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search a workout ..."
          className="library__search"
        />

        {/* Workout cards carousel */}
        {filteredWorkouts.length === 0 ? (
          <EmptyState message="No workouts found" />
        ) : (
          <>
            <div className="library__cards">
              {currentWorkout && (
                <WorkoutCard
                  key={currentWorkout.id}
                  workout={currentWorkout}
                  onStartSession={handleCreateSession}
                  onEdit={handleOpenEditModal}
                  onDelete={() => setDeleteConfirmId(currentWorkout.id)}
                  onCancelDelete={() => setDeleteConfirmId(null)}
                  isDeleting={isDeleting}
                  isCreatingSession={isCreatingSession === currentWorkout.id}
                  showDeleteConfirm={deleteConfirmId === currentWorkout.id}
                />
              )}
            </div>

            <WorkoutCarousel
              workouts={filteredWorkouts}
              currentIndex={currentIndex}
              onNext={handleNext}
              onPrev={handlePrev}
              onDotClick={handleDotClick}
            />
          </>
        )}

        {/* Add new workout button */}
        <div className="library__footer">
          <Button variant="primary" size="lg" onClick={handleOpenCreateModal}>
            Add new workout
          </Button>
        </div>

        {/* Create workout modal */}
        <WorkoutFormModal
          isOpen={createModal.isOpen}
          onClose={closeCreateModal}
          title="Create Workout"
          workoutName={workoutName}
          onWorkoutNameChange={setWorkoutName}
          muscleGroups={muscleGroups}
          selectedMuscleGroup={selectedMuscleGroup}
          onMuscleGroupSelect={handleMuscleGroupSelect}
          exercises={availableExercises}
          selectedExercises={selectedExercises}
          onExerciseToggle={handleExerciseSelect}
          // isLoadingExercises={isLoadingExercises}
          onSubmit={handleCreateWorkout}
          submitButtonText="Create Workout"
          isSubmitting={isCreating}
        />

        {/* Edit workout modal */}
        <WorkoutFormModal
          isOpen={editModal.isOpen}
          onClose={closeEditModal}
          title="Edit Workout"
          workoutName={editWorkoutName}
          onWorkoutNameChange={setEditWorkoutName}
          muscleGroups={muscleGroups}
          selectedMuscleGroup={editSelectedMuscleGroup}
          onMuscleGroupSelect={handleEditMuscleGroupSelect}
          exercises={editAvailableExercises}
          selectedExercises={editSelectedExercises}
          onExerciseToggle={handleEditExerciseSelect}
          // isLoadingExercises={isEditingExercises}
          onSubmit={handleUpdateWorkout}
          submitButtonText="Update Workout"
          isSubmitting={isUpdating}
        />
      </main>
    </div>
  );
};

export default Library;
