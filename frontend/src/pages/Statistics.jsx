import { useState, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { Button, EmptyState } from "../components";

const muscleGroups = ["Back", "Hands", "Legs", "Chest", "Abs", "Shoulders"];
const muscleGroupImg = {
  Back: "/muscles/back.png",
  Hands: "/muscles/hands.png",
  Legs: "/muscles/legs.png",
  Chest: "/muscles/chest.png",
  Abs: "/muscles/abs.png",
  Shoulders: "/muscles/shoulders.png",
};

const Statistics = () => {
  const muscleGroupStats = useLoaderData();
  const [period, setPeriod] = useState("week");

  // Преобразуем данные в формат для графика
  const chartData = useMemo(() => {
    return muscleGroups.map((group) => ({
      label: group,
      sets: muscleGroupStats[group] || 0,
    }));
  }, [muscleGroupStats]);

  const Y_MAX = useMemo(() => {
    const maxSets = Math.max(...chartData.map((item) => item.sets), 18);
    return Math.ceil(maxSets / 2) * 2; // Округляем до чётного числа
  }, [chartData]);

  const yAxisLabels = useMemo(() => {
    const labels = [];
    for (let i = Y_MAX; i >= 0; i -= 2) {
      labels.push(i);
    }
    return labels;
  }, [Y_MAX]);

  const hasData = chartData.some((item) => item.sets > 0);

  return (
    <div className="page page--statistics">
      <main className="page__content statistics__layout">
        {/* Left title */}
        <h1 className="h1 statistics__title">Statistics of {period}</h1>

        {/* Period toggle */}
        <div className="statistics__toggle">
          <Button
            variant={period === "week" ? "primary" : "secondary"}
            className="statistics__toggle-btn"
            onClick={() => setPeriod("week")}
          >
            Week
          </Button>
          <Button
            variant={period === "month" ? "primary" : "secondary"}
            className="statistics__toggle-btn"
            onClick={() => setPeriod("month")}
          >
            Month
          </Button>
        </div>

        {/* Chart */}
        {!hasData ? (
          <EmptyState message="No statistics data yet. Start training to see your progress!" />
        ) : (
          <div className="statistics__chart">
            {/* Y-axis labels */}
            <div className="statistics__y-axis">
              {yAxisLabels.map((val) => (
                <span key={val} className="text-small statistics__y-label">
                  {val}
                </span>
              ))}
            </div>

            {/* Bars */}
            <div className="statistics__bars">
              {chartData.map((item) => (
                <div key={item.label} className="statistics__bar-col">
                  <div
                    className="statistics__bar"
                    style={{ height: `${(item.sets / Y_MAX) * 100}%` }}
                  />
                  <span className="text-small statistics__bar-label">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Muscle group icons row */}
        <div className="statistics__muscle-row">
          {muscleGroups.map((g) => (
            <div key={g} className="statistics__muscle-item">
              <img
                className="statistics__muscle-img"
                src={muscleGroupImg[g]}
                alt={g}
                loading="lazy"
              />
              <span className="text-small">{g}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Statistics;
