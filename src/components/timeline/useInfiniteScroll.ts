import { useEffect, useRef } from "react";

const PAST_THRESHOLD = 90;

export const useInfiniteScroll = (options: {
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  fetchNextPage: () => void;
}) => {
  const optionsRef = useRef(options);
  optionsRef.current = options; // Keeps the same reference between renders

  useEffect(() => {
    const handleScroll = () => {
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = Math.floor((window.scrollY / height) * 100);

      const { hasNextPage, isFetching, fetchNextPage } = optionsRef.current;

      if (hasNextPage && !isFetching && scrolled > PAST_THRESHOLD) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};
