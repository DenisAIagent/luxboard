import React, { useEffect, useRef, useState } from 'react';

interface InfiniteScrollProps {
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  onLoadMore,
  hasMore,
  loading,
  children,
  className = '',
  loader,
  endMessage,
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (isIntersecting && hasMore && !loading) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, loading, onLoadMore]);

  const defaultLoader = (
    <div className="flex justify-center py-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1a1a1a] border-t-transparent"></div>
    </div>
  );

  const defaultEndMessage = (
    <div className="py-4 text-center text-sm text-gray-500">
      Vous avez atteint la fin de la liste
    </div>
  );

  return (
    <div className={className}>
      {children}
      <div ref={loadMoreRef}>
        {loading && (loader || defaultLoader)}
        {!hasMore && !loading && (endMessage || defaultEndMessage)}
      </div>
    </div>
  );
}; 