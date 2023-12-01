import { CongregationGenerator } from "../fixtures/generate-congregation";

import { generateKey, groupByLocation } from "./group-by-coords";

test("should correctly group congregations with subs", () => {
  const meetings = CongregationGenerator.instance.randomWithSubs();
  const groupedMeetings = groupByLocation(meetings);

  meetings.forEach((meeting) => {
    const key = generateKey(meeting);
    // The list mapped to this address key should contain this meeting
    expect(groupedMeetings[key]).toContain(meeting);
  });

  const totalGrouped = Object.values(groupedMeetings).flat().length;
  // The length should match the total: all meetings should be present
  expect(totalGrouped).toBe(meetings.length);
});
