'use server';

import { fileURLToPath } from "url";
import path, { dirname } from "node:path";
import { readFileSync } from "node:fs";

import type { Activity } from "@/types/Activity"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const data = readFileSync(path.join(__dirname, "../..", "data", "test-garmin-data.json"), "utf8");

export default async function getData() {
  const jsonData: Activity[] = await JSON.parse(data);

  return jsonData;
}
