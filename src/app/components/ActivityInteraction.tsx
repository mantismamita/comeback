'use client';

import { useState } from 'react';
import ActivityForm from './ActivityForm';
import { Activity } from '@/types/Activity';
import SelectedActivityDisplay from './SelectedActivityDisplay';
import { submitActivity } from '../actions/activity';
import { useActivities } from '../context/ActivitiesContext';

export default function ActivityInteraction({
  type,
}: {
  type: 'peak' | 'current';
}) {
  const { setPeakActivity, setCurrentActivity, peakActivity, currentActivity } =
    useActivities();

  // Local state for UI management
  const [isLoading, setIsLoading] = useState(false);

  const selectedActivity = type === 'peak' ? peakActivity : currentActivity;
  const setSelectedActivity =
    type === 'peak' ? setPeakActivity : setCurrentActivity;

  async function onActivityFound(
    typeKey: Activity['activityType']['typeKey'],
    date: string
  ) {
    setIsLoading(true);
    try {
      const response = await submitActivity(typeKey, date);
      if (response.success && response.results?.length) {
        setSelectedActivity(response.results[0]);
      } else {
        console.error(
          'Error finding activity:',
          response.error || response.message
        );
        setSelectedActivity(null); // Reset
      }
    } catch (error) {
      console.error('Error submitting activity:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={isLoading ? 'opacity-70' : ''}>
      {selectedActivity ? (
        <SelectedActivityDisplay
          activity={selectedActivity}
          title={type === 'peak' ? 'Peak Activity' : 'Current Activity'}
          onClose={() => setSelectedActivity(null)}
        />
      ) : (
        <ActivityForm
          selectedActivity={selectedActivity}
          onActivityFound={onActivityFound}
        />
      )}
    </div>
  );
}
