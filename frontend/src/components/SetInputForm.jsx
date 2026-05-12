import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const SetInputForm = ({ onAddSet }) => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (weight && reps) {
      onAddSet(weight, reps);
      setWeight("");
      setReps("");
    }
  };

  return (
    <form className="session__set-form" onSubmit={handleSubmit}>
      <Input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        step="0.5"
        min="0"
        required
      />
      <Input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        min="1"
        required
      />
      <Button variant="secondary" size="sm" type="submit">
        Add Set
      </Button>
    </form>
  );
};

export default SetInputForm;
