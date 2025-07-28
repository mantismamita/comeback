type Gender = 'neutral' | 'female' | 'male';

export const typeMap = [
  { typeKey: 'running', typeName: 'Running' },
  { typeKey: 'cycling', typeName: 'Cycling' },
  { typeKey: 'indoor_cycling', typeName: 'Indoor Cycling' },
  { typeKey: 'lap_swimming', typeName: 'Swimming' },
  { typeKey: 'walking', typeName: 'Walking' },
  { typeKey: 'hiking', typeName: 'Hiking' },
  { typeKey: 'yoga', typeName: 'Yoga' },
  { typeKey: 'gymnastics', typeName: 'Gymnastics' },
  { typeKey: 'weightlifting', typeName: 'Weightlifting' },
  { typeKey: 'strength_training', typeName: 'Strength Training' },
  { typeKey: 'core_training', typeName: 'Core Training' },
  { typeKey: 'stair_climbing', typeName: 'Stair Climbing' },
];

export function textToEmoji(typeKey: string, gender: Gender = 'female') {
  const emojiMap: Record<Gender, Record<string, string>> = {
    neutral: {
      running: '🏃',
      cycling: '🚴',
      indoor_cycling: '🚴',
      swimming: '🏊',
      lap_swimming: '🏊',
      walking: '🚶',
      hiking: '🥾',
      yoga: '🧘',
      gymnastics: '🤸',
      weightlifting: '🏋️',
      strength_training: '🏋️',
      core_training: '💪',
      stair_climbing: '🧗',
    },
    female: {
      running: '🏃‍♀️',
      cycling: '🚴‍♀️',
      indoor_cycling: '🚴‍♀️',
      lap_swimming: '🏊‍♀️',
      walking: '🚶‍♀️',
      hiking: '🥾',
      yoga: '🧘‍♀️',
      gymnastics: '🤸‍♀️',
      weightlifting: '🏋️‍♀️',
      strength_training: '🏋️‍♀️',
      core_training: '💪',
      stair_climbing: '🧗‍♀️',
    },
    male: {
      running: '🏃',
      cycling: '🚴',
      indoor_cycling: '🚴',
      lap_swimming: '🏊',
      walking: '🚶',
      hiking: '🥾',
      yoga: '🧘',
      gymnastics: '🤸',
      weightlifting: '🏋️',
      strength_training: '🏋️',
      core_training: '💪',
      stair_climbing: '🧗',
    },
  };

  const emoji = emojiMap[gender][typeKey] || '❓';

  return `${emoji}`;
}
