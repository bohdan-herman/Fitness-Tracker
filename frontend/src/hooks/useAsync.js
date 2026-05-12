import { useState, useCallback } from "react";

export const useAsync = (asyncFunction, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const result = await asyncFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err?.message || "An error occurred");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction],
  );

  if (immediate) {
    // Run immediately on mount
    import("react").then(() => execute());
  }

  return { data, loading, error, execute };
};
