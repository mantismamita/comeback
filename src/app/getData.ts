'use server';

import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import type { Activity } from '@/types/Activity';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testDataPath = path.join(
  __dirname,
  '../..',
  'data',
  'test-garmin-data.json'
);
const mockDataPath = path.join(__dirname, '../..', 'data', 'mock-data.json');

let dataPath = testDataPath;
if (!existsSync(testDataPath)) {
  dataPath = mockDataPath;
}

const data = readFileSync(dataPath, 'utf8');

export default async function getData() {
  const jsonData: Activity[] = await JSON.parse(data);
  return jsonData;
}
