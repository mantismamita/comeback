'use client';

import type { Activity } from '@/types/Activity';
import { textToEmoji, typeMap } from '@/utils/activityTypes';
import { useState } from 'react';

export default function ActivityForm(activity: Activity | {} = {}) {
  const [selectedType, setSelectedType] = useState(
    activity?.activityType?.typeKey || ''
  );

  const t = typeMap.filter((type) => type.typeKey === selectedType);

  return (
    <form className="activity-form">
      <div className="form-group">
        {/* <label
          className="block text-sm/6 font-medium text-gray-100"
          htmlFor="activityType"
        >
          Activity Type
        </label> */}
        {/* <select
          id="activityType"
          name="activityType"
          defaultValue={activity?.activityType?.typeKey || ''}
          className=""
        >
          {getActivityTypesList().map((type) => (
            <option key={type.typeKey} value={type.typeKey}>
              {type.typeName}
            </option>
          ))}
        </select> */}
        <label
          id="listbox-label"
          className="block text-sm/6 font-medium text-gray-100"
        >
          Activity type
        </label>
        <div className="relative mt-2">
          <button
            type="button"
            aria-expanded="true"
            aria-haspopup="listbox"
            aria-labelledby="listbox-label"
            className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
              <span role="img" className="size-5 shrink-0 rounded-full">
                {textToEmoji(selectedType)}
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
          <ul
            role="listbox"
            tabIndex={-1}
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm"
          >
            {typeMap.map((type) => (
              <li
                id="listbox-option-0"
                role="option"
                className="relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none"
                key={type.typeKey}
                onClick={() => setSelectedType(type.typeKey)}
              >
                <div className="flex items-center">
                  {textToEmoji(type.typeKey)}
                  <span className="ml-3 block truncate font-normal">
                    {type.typeName}
                  </span>
                </div>
                {selectedType === type.typeKey && (
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
        </div>
      </div>

      <button type="submit">Save Activity</button>
    </form>
  );
}
