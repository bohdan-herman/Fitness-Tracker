import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import ExerciseSelector from "./ExerciseSelector";

const WorkoutFormModal = ({
  isOpen = false,
  onClose,
  title = "Create Workout",
  workoutName = "",
  onWorkoutNameChange,
  muscleGroups = [],
  selectedMuscleGroup = "",
  onMuscleGroupSelect,
  exercises = [],
  selectedExercises = [],
  onExerciseToggle,
  isLoadingExercises = false,
  onSubmit,
  submitButtonText = "Create Workout",
  isSubmitting = false,
}) => {
  const footer = (
    <div className="modal__footer--actions">
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onSubmit} loading={isSubmitting}>
        {submitButtonText}
      </Button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer}>
      <div className="workout-form">
        <div className="workout-form__field">
          <label className="workout-form__label">Workout Name</label>
          <Input
            type="text"
            placeholder="e.g. Push Day, Leg Day..."
            value={workoutName}
            onChange={(e) => onWorkoutNameChange(e.target.value)}
          />
        </div>

        <ExerciseSelector
          muscleGroups={muscleGroups}
          selectedMuscleGroup={selectedMuscleGroup}
          onMuscleGroupSelect={onMuscleGroupSelect}
          exercises={exercises}
          selectedExercises={selectedExercises}
          onExerciseToggle={onExerciseToggle}
          isLoading={isLoadingExercises}
          showSelectedCount={true}
        />
      </div>
    </Modal>
  );
};

export default WorkoutFormModal;
