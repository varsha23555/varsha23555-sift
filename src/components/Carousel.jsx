import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel({ children }) {
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 380, behavior: 'smooth' });
    }
  };

  return (
    <div className="carousel" style={{ position: 'relative' }}>
      <button
        onClick={() => scrollBy(-1)}
        aria-label="Scroll left"
        className="carousel__nav carousel__nav--left"
      >
        <ChevronLeft size={16} />
      </button>
      <div ref={scrollRef} className="carousel" style={{ gap: '1rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {children}
      </div>
      <button
        onClick={() => scrollBy(1)}
        aria-label="Scroll right"
        className="carousel__nav carousel__nav--right"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
