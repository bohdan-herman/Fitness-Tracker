import React from "react";
import Button from "./Button";

const WorkoutCarousel = ({
  workouts = [],
  currentIndex = 0,
  onNext,
  onPrev,
  onDotClick,
}) => {
  if (workouts.length === 0) {
    return null;
  }

  return (
    <div>
      {/* Carousel dots */}
      <div className="library__dots">
        {workouts.map((_, index) => (
          <span
            key={index}
            className={`library__dot ${
              index === currentIndex ? "library__dot--active" : ""
            }`}
            onClick={() => onDotClick(index)}
            role="button"
            aria-label={`Go to workout ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="carousel__nav">
        <Button
          variant="secondary"
          onClick={onPrev}
          disabled={currentIndex === 0}
        >
          ← Prev
        </Button>
        <Button
          variant="secondary"
          onClick={onNext}
          disabled={currentIndex === workouts.length - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  );
};

export default WorkoutCarousel;
