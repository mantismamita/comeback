'use client';

import { useState } from 'react';
import ActivityForm from './ActivityForm';
import { Activity } from '@/types/Activity';
import SelectedActivityDisplay from './SelectedActivityDisplay';
import { submitActivity } from '../actions/activity';
export default function ActivityInteraction() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  async function onActivityFound(
    typeKey: Activity['activityType']['typeKey'],
    date: string
  ) {
    const response = await submitActivity(typeKey, date);
    console.log('response', response, date, typeKey);
    if (response.success && response.results?.length) {
      setSelectedActivity(response.results[0]);
    } else {
      console.error(
        'Error finding activity:',
        response.error || response.message
      );
      setSelectedActivity({} as Activity); // Reset
    }
  }

  return (
    <>
      <ActivityForm
        selectedActivity={selectedActivity}
        onActivityFound={onActivityFound}
      />
      {selectedActivity && (
        <SelectedActivityDisplay activity={selectedActivity} />
      )}
    </>
  );
}
