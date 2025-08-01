'use client';
import { useState, useRef, useEffect } from 'react';
import { textToEmoji, typeMap } from '@/utils/activityTypes';
import type { Activity } from '@/types/Activity';
import { submitActivity } from '../actions/activity';

export default function ActivityForm({
  selectedActivityType,
  setSelectedActivityType,
}: Partial<Pick<Activity, 'activityType'>> = {}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (listRef.current && !listRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (
      !open &&
      (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')
    ) {
      setOpen(true);
      e.preventDefault();
      return;
    }
    if (open) {
      if (e.key === 'ArrowDown') {
        setActiveIndex((i) => (i + 1) % typeMap.length);
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        setActiveIndex((i) => (i - 1 + typeMap.length) % typeMap.length);
        e.preventDefault();
      } else if (e.key === 'Enter' || e.key === ' ') {
        setSelectedActivityType(typeMap[activeIndex].typeKey);
        setOpen(false);
        e.preventDefault();
      } else if (e.key === 'Escape') {
        setOpen(false);
        e.preventDefault();
      }
    }
  }

  useEffect(() => {
    if (open && listRef.current) {
      const activeOption = listRef.current.querySelector(
        '[aria-selected="true"]'
      );
      if (activeOption)
        (activeOption as HTMLElement).scrollIntoView({ block: 'nearest' });
    }
  }, [open, activeIndex]);

  const t = typeMap.filter((type) => type.typeKey === selectedActivityType);

  console.log('selectedActivityType>>', selectedActivityType);

  return (
    <form
      className="activity-form flex flex-wrap gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        submitActivity(new FormData(event.target as HTMLFormElement));
      }}
    >
      <div className="form-group w-1/3">
        <label
          id="listbox-label"
          className="block text-sm font-medium text-gray-100 "
        >
          Activity type
        </label>
        <div className="relative mt-2">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-labelledby="listbox-label"
            aria-controls="activity-type-listbox"
            className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.75 pr-2 pl-3 text-left text-gray-900 outline-gray-300 sm:text-sm/6"
            onClick={() => setOpen((v) => !v)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
              <span role="img" className="size-5 shrink-0 rounded-full">
                {textToEmoji(selectedActivityType)}
              </span>
              <span className="block truncate">
                {t[0]?.typeName || 'Choose an Activity Type'}
              </span>
            </span>
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              data-slot="icon"
              aria-hidden="true"
              className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            >
              <use href="#double_arrow" />
            </svg>
          </button>
          {open && (
            <ul
              id="activity-type-listbox"
              role="listbox"
              tabIndex={-1}
              aria-labelledby="listbox-label"
              ref={listRef}
              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm"
            >
              {typeMap.map((type, idx) => (
                <li
                  id={`listbox-option-${idx}`}
                  role="option"
                  aria-selected={selectedActivityType === type.typeKey}
                  className={`relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none ${
                    idx === activeIndex ? 'bg-indigo-100' : ''
                  }`}
                  key={type.typeKey}
                  onClick={() => {
                    setSelectedActivityType(type.typeKey);
                    setOpen(false);
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  <div className="flex items-center">
                    {textToEmoji(type.typeKey)}
                    <span className="ml-3 block truncate font-normal">
                      {type.typeName}
                    </span>
                  </div>
                  {selectedActivityType === type.typeKey && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        data-slot="icon"
                        aria-hidden="true"
                        className="size-5"
                      >
                        <use href="#checkmark" />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="form-group w-1/3">
        <label
          htmlFor="activity-date"
          className="block text-sm font-medium text-gray-100 mb-2"
        >
          Activity date
        </label>
        <input
          type="date"
          id="activity-date"
          name="activityDate"
          className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <input type="hidden" name="activityType" value={selectedActivityType} />
      <div className="form-group w-full">
        <button
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          type="submit"
        >
          Save Activity
        </button>
      </div>
    </form>
  );
}
