import React, { useEffect } from "react";

/**
 * This custom hook tracks the current scroll position of the webpage and returns it as a percentage
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const scrolled = Math.floor((winScroll / height) * 100);
      setScrollPosition(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
};
