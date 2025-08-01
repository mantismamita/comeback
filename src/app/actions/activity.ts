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
  formData: FormData
): Promise<ActionResponse> {
  try {
    // Simulate network delay for loading state
    await new Promise((resolve) => setTimeout(resolve, 700));

    const data: {
      activityType: Activity['activityType']['typeKey'];
      activityDate: string;
    } = {
      activityType: formData.get(
        'activityType'
      ) as Activity['activityType']['typeKey'],
      activityDate: formData.get('activityDate') as string,
    };

    // Check security (zod? validation, etc.)
    if (!data.activityType || !data.activityDate) {
      return {
        success: false,
        message: 'Activity type and date are required',
        errors: {
          activityType: !data.activityType ? ['Activity type is required'] : [],
          activityDate: !data.activityDate ? ['Activity date is required'] : [],
        },
      };
    }

    console.log('Submitting...', data.activityType, data.activityDate);
    const activities = await getDateActivity(
      data.activityType,
      data.activityDate
    );
    console.log('Submitting activity:', activities[0].activityName);

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
