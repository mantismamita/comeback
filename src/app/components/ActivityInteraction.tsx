'use client';

import { useState } from 'react';
import ActivityForm from './ActivityForm';
import { Activity } from '@/types/Activity';
import SelectedActivityDisplay from './SelectedActivityDisplay';
export default function ActivityInteraction() {
  const [selectedActivityType, setSelectedActivityType] =
    useState<Activity | null>(null);

  console.log('selectedActivityType', selectedActivityType);

  return (
    <>
      <ActivityForm
        selectedActivityType={selectedActivityType}
        setSelectedActivityType={setSelectedActivityType}
      />
      <SelectedActivityDisplay activity={selectedActivityType} />
    </>
  );
}
