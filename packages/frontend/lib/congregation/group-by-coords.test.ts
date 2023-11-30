import { test, expect } from "bun:test";
import { generateKey, groupByCoords } from "./group-by-coords";
import { CongregationGenerator } from "../fixtures/generate-congregation";

test("should correctly group congregations with subs", () => {
  const meetings = CongregationGenerator.instance.randomWithSubs();
  const groupedMeetings = groupByCoords(meetings);

  meetings.forEach((meeting) => {
    const key = generateKey(meeting);
    // The list mapped to this address key should contain this meeting
    expect(groupedMeetings[key]).toContain(meeting);
  });

  const totalGrouped = Object.values(groupedMeetings).flat().length;
  // The length should match the total: all meetings should be present
  expect(totalGrouped).toBe(meetings.length);
});
