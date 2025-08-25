'use server';

import { Activity } from '@/types/Activity';
import { getDateActivity } from '../getData';

export type ActionResponse = {
  success: boolean;
  message: string;
  results?: Activity[];
  errors?: Record<string, string[]>;
  error?: string;
};
export async function submitActivity(
  activityType: Activity['activityType']['typeKey'],
  activityDate: string
): Promise<ActionResponse> {
  try {
    // Simulate network delay for loading state
    await new Promise((resolve) => setTimeout(resolve, 700));

    // Check security (zod? validation, etc.)
    if (!activityType || !activityDate) {
      console.warn('Activity type or date is missing:', {
        activityType,
        activityDate,
      });
      return {
        success: false,
        message: 'Activity type and date are required',
        errors: {
          activityType: !activityType ? ['Activity type is required'] : [],
          activityDate: !activityDate ? ['Activity date is required'] : [],
        },
      };
    }

    console.log('Submitting...', activityType, activityDate);
    const activities = await getDateActivity(activityType, activityDate);

    return {
      success: true,
      message: 'Activity submitted successfully',
      results: activities,
    };
  } catch (error) {
    console.error('Error submitting activity:', error);
    return {
      success: false,
      message: 'An error occurred while submitting the activity',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
