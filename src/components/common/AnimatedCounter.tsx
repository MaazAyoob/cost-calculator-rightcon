import React, { useEffect, useState, useRef } from 'react';
import { formatCurrency, formatNumber } from '../../utils/cn';

export interface AnimatedCounterProps {
  value: number;
  duration?: number; // ms
  isCurrency?: boolean;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  isCurrency = false,
  className,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  // Track current display value in a ref so we animate from it (not 0) on subsequent changes
  const currentRef = useRef(0);

  useEffect(() => {
    const startValue = currentRef.current;
    const endValue = value;
    let startTimestamp: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (endValue - startValue) * easedProgress);

      currentRef.current = current;
      setDisplayValue(current);

      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      }
    };

    rafId = window.requestAnimationFrame(step);

    // Cleanup: cancel RAF on unmount or when value changes mid-animation
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [value, duration]);

  return (
    <span className={className}>
      {isCurrency ? formatCurrency(displayValue) : formatNumber(displayValue)}
    </span>
  );
};
