import { useState, useCallback } from 'react';

export function useExpandedSections(initial: string[]) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(initial));

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }, []);

  return { expandedSections, toggleSection };
}
