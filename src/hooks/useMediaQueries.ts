import { useEffect, useState } from "react";

const initializeState = (mediaQueries: MediaQueryList[]) => {
  const initialState: Record<string, boolean> = {};
  mediaQueries.forEach((mediaQuery) => {
    initialState[mediaQuery.media] = mediaQuery.matches;
  });
  return initialState;
};

const useMediaQueries = (queries: string[]) => {
  const mediaQueries = queries.map((query) => window.matchMedia(query));
  const [matches, setMatches] = useState(() => initializeState(mediaQueries));

  const handleChange = (event: MediaQueryListEvent) => {
    setMatches((prevState) => {
      return { ...prevState, [event.media]: event.matches };
    });
  };

  useEffect(() => {
    mediaQueries.forEach((mediaQuery) => {
      mediaQuery.addEventListener("change", handleChange);
    });

    return () => {
      mediaQueries.forEach((mediaQuery) => {
        mediaQuery.removeEventListener("change", handleChange);
      });
    };
  }, [mediaQueries]);

  return matches;
};

export { useMediaQueries };
