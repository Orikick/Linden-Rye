import { useCallback, useEffect, useState } from "react";

const LOADING = { status: "loading", data: null, error: null };

// Loads the menu from the local JSON file as a separate chunk.
// status is "loading", "error" or "success"; retry() runs the load again.
export default function useMenu() {
  const [state, setState] = useState(LOADING);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    import("../data/menu.json")
      .then((module) => {
        const data = module.default;
        if (!data || !Array.isArray(data.categories)) {
          throw new Error("The menu file is not in the expected format.");
        }
        if (!cancelled) setState({ status: "success", data, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ status: "error", data: null, error });
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setState(LOADING);
    setAttempt((count) => count + 1);
  }, []);

  return { ...state, retry };
}
