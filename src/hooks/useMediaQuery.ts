import { useEffect, useState } from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  const handleChange = (mediaQueryList: MediaQueryListEvent | MediaQueryList) =>
    setMatches(mediaQueryList.matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    handleChange(mediaQueryList);
    mediaQueryList.addEventListener("change", handleChange);

    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};

export { useMediaQuery };
