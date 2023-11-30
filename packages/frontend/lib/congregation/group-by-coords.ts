import { Congregation } from "../types/congregation";

export type CongregationGroups = Record<string, Congregation[]>;

export function generateKey(meeting: Congregation): string {
  // I know, i know, I'm passing the whole object here.
  return `${meeting.lat}-${meeting.lon}`;
}

export function groupByCoords(meetings: Congregation[]): CongregationGroups {
  // Create a key unique to coordinates
  return meetings.reduce((acc: CongregationGroups, meeting) => {
    const key = generateKey(meeting);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(meeting);
    return acc;
  }, {} as CongregationGroups);
}
