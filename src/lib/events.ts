import data from "@/content/events.json";
import type { EventItem } from "./types";

const eventsData: ReadonlyArray<EventItem> = Object.freeze(
  [...(data as EventItem[])].sort((a, b) => a.datetime.localeCompare(b.datetime)),
);

export function getEvents(): ReadonlyArray<EventItem> {
  return eventsData;
}
