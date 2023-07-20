import { useEffect, useState } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  const handleChange = (mediaQueryList) => setMatches(mediaQueryList.matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    handleChange(mediaQueryList);
    mediaQueryList.addEventListener("change", (event) => {
      handleChange(event.target);
    });

    return () =>
      mediaQueryList.removeEventListener("change", (event) =>
        handleChange(event.target)
      );
  }, [query]);

  return matches;
};

export { useMediaQuery };
