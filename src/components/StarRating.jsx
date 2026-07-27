import { useState } from 'react';
import { Star } from 'lucide-react';
import { COLORS } from '../data/titles';

export default function StarRating({ value = 0, onRate, size = 16 }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= (hover || value);
        return (
          <button
            key={n}
            onClick={() => onRate(n === value ? 0 : n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            className="p-0.5 leading-none"
            aria-label={`Rate ${n} stars`}
          >
            <Star
              size={size}
              strokeWidth={1.5}
              color={filled ? COLORS.gold : COLORS.mutedDim}
              fill={filled ? COLORS.gold : 'none'}
            />
          </button>
        );
      })}
    </div>
  );
}
