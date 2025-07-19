import { useState, useEffect, useCallback } from 'react';

export function useInfiniteScroll(
  loadMore: () => void,
  hasMore: boolean,
  threshold = 100
) {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop < threshold && hasMore && !isFetching) {
      setIsFetching(true);
      loadMore();
    }
  }, [loadMore, hasMore, isFetching, threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isFetching) {
      setTimeout(() => setIsFetching(false), 1000);
    }
  }, [isFetching]);

  return isFetching;
}