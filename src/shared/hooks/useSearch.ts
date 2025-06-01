import { useState, useEffect, useMemo } from 'react';

export function useSearch<T>(
  items: T[] | undefined,
  searchKey: keyof T | ((item: T) => string),
  delay = 300
) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);

  const filteredItems = useMemo(() => {
    if (!items || !debouncedSearchTerm.trim()) return items;

    return items.filter(item => {
      const valueToSearch = typeof searchKey === 'function'
        ? searchKey(item)
        : String(item[searchKey]);
      
      return valueToSearch.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    });
  }, [items, debouncedSearchTerm, searchKey]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
}