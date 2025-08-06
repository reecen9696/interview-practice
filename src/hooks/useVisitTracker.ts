'use client';

import { useState, useEffect } from 'react';

interface VisitStats {
  totalDays: number;
  longestStreak: number;
  currentStreak: number;
  visitDates: string[];
}

export function useVisitTracker() {
  const [stats, setStats] = useState<VisitStats>({
    totalDays: 0,
    longestStreak: 0,
    currentStreak: 0,
    visitDates: [],
  });

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const storedDates = localStorage.getItem('codemate-visits');
    const visitDates: string[] = storedDates ? JSON.parse(storedDates) : [];

    // Check if today is already recorded
    if (!visitDates.includes(today)) {
      visitDates.push(today);
      visitDates.sort(); // Keep dates sorted
      localStorage.setItem('codemate-visits', JSON.stringify(visitDates));
    }

    // Calculate stats
    const calculatedStats = calculateStats(visitDates);
    setStats(calculatedStats);
  }, []);

  const calculateStats = (dates: string[]): VisitStats => {
    if (dates.length === 0) {
      return { totalDays: 0, longestStreak: 0, currentStreak: 0, visitDates: [] };
    }

    const sortedDates = [...dates].sort();
    let longestStreak = 1;
    let currentStreak = 1;
    let tempStreak = 1;

    // Calculate streaks
    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1]);
      const currentDate = new Date(sortedDates[i]);
      const diffTime = currentDate.getTime() - prevDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        // Consecutive day
        tempStreak++;
      } else {
        // Break in streak
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }

    longestStreak = Math.max(longestStreak, tempStreak);

    // Calculate current streak (from today backwards)
    const today = new Date().toISOString().split('T')[0];
    const todayIndex = sortedDates.indexOf(today);
    
    if (todayIndex !== -1) {
      currentStreak = 1;
      for (let i = todayIndex - 1; i >= 0; i--) {
        const prevDate = new Date(sortedDates[i]);
        const nextDate = new Date(sortedDates[i + 1]);
        const diffTime = nextDate.getTime() - prevDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    } else {
      currentStreak = 0;
    }

    return {
      totalDays: dates.length,
      longestStreak,
      currentStreak,
      visitDates: sortedDates,
    };
  };

  const clearHistory = () => {
    localStorage.removeItem('codemate-visits');
    setStats({ totalDays: 0, longestStreak: 0, currentStreak: 0, visitDates: [] });
  };

  return { stats, clearHistory };
}
