'use client';

import { useState, useRef, useEffect } from 'react';
import { Category } from '@/types';
import EventCard from './EventCard';

interface EventTabSectionProps {
  subcategories: Category[];
}

export default function EventTabSection({ subcategories }: EventTabSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 80 });
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Update indicator position
  useEffect(() => {
    const activeTabEl = tabRefs.current[activeTab];
    const container = tabsRef.current;
    
    if (activeTabEl && container) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTabEl.getBoundingClientRect();
      
      setIndicatorStyle({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      });
    }
  }, [activeTab]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const activeTabEl = tabRefs.current[activeTab];
      const container = tabsRef.current;
      
      if (activeTabEl && container) {
        const containerRect = container.getBoundingClientRect();
        const tabRect = activeTabEl.getBoundingClientRect();
        
        setIndicatorStyle({
          left: tabRect.left - containerRect.left,
          width: tabRect.width,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    const timeout = setTimeout(handleResize, 100);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, [activeTab]);

  if (!subcategories.length) return null;

  return (
    <>
      {/* Tab Navigation */}
      <div className="mt-16 mb-10">
        <div
          ref={tabsRef}
          className="flex gap-10 overflow-x-auto scrollbar-hide whitespace-nowrap pb-2"
        >
          {subcategories.map((subcategory, index) => (
            <button
              key={subcategory.id}
              ref={(el) => { tabRefs.current[index] = el; }}
              className={`font-semibold tab-button flex-shrink-0 ${
                index === activeTab ? 'active' : ''
              }`}
              style={{ color: index === activeTab ? '#1A1A1A' : '#808080' }}
              onClick={() => setActiveTab(index)}
            >
              {subcategory.name}
            </button>
          ))}
        </div>

        {/* Tab Indicator */}
        <div className="relative w-full bg-surface-300 h-0.5 mt-6">
          <div
            className="absolute top-0 h-full bg-gray-100 transition-all duration-300 ease-in-out"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {subcategories.map((subcategory, index) => (
          <div
            key={subcategory.id}
            className={`w-full grid md:grid-cols-2 grid-cols-1 gap-16 ${
              index === activeTab ? '' : 'hidden'
            }`}
          >
            {subcategory.latest_events?.length ? (
              subcategory.latest_events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500 py-10">
                <p>No upcoming events found in {subcategory.name}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
