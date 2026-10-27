import React, { useRef, useState } from 'react';

export type FloorPlanHotspot = {
  id: string;
  title: string;
  count?: number;
  countLabel?: string;
  tone: 'urgent' | 'today' | 'count';
  detail: string;
  onClick: () => void;
};

type Props = {
  hotspots: FloorPlanHotspot[];
  activeId?: string;
  onFocusHotspot: (hotspot: FloorPlanHotspot | null) => void;
  allDone?: boolean;
};

const placements: Record<string, React.CSSProperties> = {
  fridge: { left: '48%', top: '27%', transform: 'translate(-50%, -50%)' },
  chores: { left: '78%', top: '41%', transform: 'translate(-50%, -50%)' },
  recycle: { left: '23%', top: '57%', transform: 'translate(-50%, -50%)' },
  bills: { left: '68%', top: '52%', transform: 'translate(-50%, -50%)' },
  shopping: { left: '42%', top: '35%', transform: 'translate(-50%, -50%)' },
  entry: { left: '89%', top: '58%', transform: 'translate(-50%, -50%)' },
};

export function HomeFloorPlan({ hotspots, activeId, onFocusHotspot, allDone = false }: Props) {
  const startPoint = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState<FloorPlanHotspot | null>(null);
  const [dragPoint, setDragPoint] = useState({ x: 0, y: 0 });

  const clearDrag = () => {
    startPoint.current = null;
    dragged.current = false;
    setDragging(null);
  };

  return (
    <section className="home-room-section" aria-label="원룸 평면도">
      <div className="home-room-scene">
        <img className="home-room-art" src="/images/home-studio-isometric.jpg?v=10" alt="" aria-hidden="true" />
        {hotspots.map((hotspot) => {
          const active = activeId === hotspot.id;
          return (
            <button
              key={hotspot.id}
              type="button"
              className={`home-hotspot ${active ? 'is-highlighted' : ''}`}
              style={placements[hotspot.id] || { left: '40%', top: '50%' }}
              aria-label={`${hotspot.title} · ${hotspot.detail}`}
              onMouseEnter={() => onFocusHotspot(hotspot)}
              onMouseLeave={() => onFocusHotspot(null)}
              onFocus={() => onFocusHotspot(hotspot)}
              onBlur={() => onFocusHotspot(null)}
              onPointerDown={event => {
                event.preventDefault();
                event.currentTarget.setPointerCapture(event.pointerId);
                startPoint.current = { x: event.clientX, y: event.clientY };
                setDragPoint({ x: event.clientX, y: event.clientY });
                setDragging(hotspot);
              }}
              onPointerMove={event => {
                if (!startPoint.current) return;
                const dx = event.clientX - startPoint.current.x;
                const dy = event.clientY - startPoint.current.y;
                if (Math.hypot(dx, dy) > 8) dragged.current = true;
                if (dragged.current) setDragPoint({ x: event.clientX, y: event.clientY });
              }}
              onPointerUp={() => {
                if (dragged.current) {
                  suppressClick.current = true;
                  hotspot.onClick();
                  window.setTimeout(() => { suppressClick.current = false; }, 0);
                }
                clearDrag();
              }}
              onPointerCancel={clearDrag}
              onClick={event => {
                if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); return; }
                hotspot.onClick();
              }}
            >
              <span className="home-hotspot-hit" aria-hidden="true" />
              <span className="home-hotspot-pill">
                <span>{hotspot.title}</span>
                {hotspot.count !== undefined && <span className={`home-hotspot-count tone-${hotspot.tone}`}>{hotspot.countLabel ?? hotspot.count}</span>}
              </span>
              {active && <span className="home-hotspot-ripple" aria-hidden="true" />}
            </button>
          );
        })}
        {allDone && <span className="home-room-complete" aria-hidden="true"><span>✓</span></span>}
      </div>
      {dragging && dragged.current && <div className="home-drag-hint" style={{ left: Math.max(12, Math.min(dragPoint.x + 12, (typeof window === 'undefined' ? 400 : window.innerWidth) - 232)), top: Math.max(12, Math.min(dragPoint.y + 12, (typeof window === 'undefined' ? 700 : window.innerHeight) - 48)) }}>놓으면 {dragging.id === 'entry' ? '우리집' : dragging.id === 'bills' ? '정산' : dragging.id === 'fridge' || dragging.id === 'shopping' ? '냉장고' : '집안일'} 화면으로 이동해요</div>}
    </section>
  );
}

export default HomeFloorPlan;
