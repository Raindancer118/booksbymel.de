import data from "@/content/events.json";
import type { EventItem } from "./types";

export function getEvents(): EventItem[] {
  return (data as EventItem[]).slice().sort((a,b)=>a.datetime.localeCompare(b.datetime));
}
