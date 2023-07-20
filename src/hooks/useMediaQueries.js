import { useEffect, useState } from "react";

const initializeState = (mediaQueries) => {
  const initialState = {};
  mediaQueries.forEach((mediaQuery) => {
    initialState[mediaQuery.media] = mediaQuery.matches;
  });
  return initialState;
};

const useMediaQueries = (queries) => {
  const mediaQueries = queries.map((query) => window.matchMedia(query));
  const [matches, setMatches] = useState(() => initializeState(mediaQueries));

  const handleChange = (event) => {
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
