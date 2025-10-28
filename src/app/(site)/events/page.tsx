import EventList from "@/components/EventList";
import Seo from "@/components/Seo";

export default function EventsPage(){
  return (
    <main className="container">
      <Seo title="Events" description="Lesungen, Signings & Auftritte." ogImage="/images/og/default.jpg" />
      <h1>Events</h1>
      <EventList />
    </main>
  );
}
