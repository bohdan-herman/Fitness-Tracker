import { useState, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import {
  SearchInput,
  ExerciseCard,
  LoadingState,
  EmptyState,
  MuscleGroupSelector,
} from "../components";
import { exercisesByMuscleGroupAPI } from "../api/exercisesAPI.jsx";

const muscleGroups = [
  { id: "legs", label: "Legs", img: "/muscles/legs.png" },
  { id: "chest", label: "Chest", img: "/muscles/chest.png" },
  { id: "shoulders", label: "Shoulders", img: "/muscles/shoulders.png" },
  { id: "back", label: "Back", img: "/muscles/back.png" },
  { id: "hands", label: "Hands", img: "/muscles/hands.png" },
  { id: "abs", label: "Abs", img: "/muscles/abs.png" },
];

const Exercises = () => {
  const allExercises = useLoaderData();
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMuscleGroupSelect = async (muscleGroup) => {
    setSelectedMuscleGroup(muscleGroup);
    setSearchTerm("");
    setIsLoading(true);
    try {
      const exercises = await exercisesByMuscleGroupAPI(muscleGroup);
      setFilteredExercises(exercises);
    } catch (error) {
      console.error("Error loading exercises:", error);
      setFilteredExercises([]);
    } finally {
      setIsLoading(false);
    }
  };

  const displayedExercises = useMemo(() => {
    const baseExercises = selectedMuscleGroup
      ? filteredExercises
      : (allExercises ?? []);

    return baseExercises.filter((ex) =>
      ex.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [allExercises, filteredExercises, searchTerm, selectedMuscleGroup]);

  const currentMuscleGroupLabel =
    muscleGroups.find((g) => g.id === selectedMuscleGroup)?.label ||
    "All Muscles";

  return (
    <div className="page page--exercises">
      <main className="page__content exercises__layout">
        <div className="align-items-Center">
          {" "}
          <section className="exercises__muscle-section">
            <h2 className="h2 exercises__muscle-title">Choose Muscle Group</h2>
            <MuscleGroupSelector
              muscleGroups={muscleGroups}
              selectedId={selectedMuscleGroup}
              onSelect={handleMuscleGroupSelect}
              showImages={true}
            />
          </section>
        </div>

        <section className="exercises__list-section">
          <h2 className="h2 exercises__list-title">
            {currentMuscleGroupLabel}
          </h2>

          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search an exercise ..."
            className="exercises__search"
          />

          {isLoading ? (
            <LoadingState message="Loading exercises..." />
          ) : displayedExercises.length === 0 ? (
            <EmptyState message="No exercises found" />
          ) : (
            <div className="exercises__cards-grid">
              {displayedExercises.map((ex) => (
                <ExerciseCard
                  key={ex.id}
                  exercise={ex}
                  maxWeight={true}
                  onSelect={() => {}}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Exercises;
