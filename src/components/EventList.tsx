import { getEvents } from "@/lib/events";

export default function EventList(){
  const events = getEvents();
  if (!events.length) return <p>Aktuell keine Termine.</p>;
  return (
    <ul style={{listStyle:'none', padding:0}} className="grid">
      {events.map((ev,i)=>(
        <li key={i} className="card">
          <strong>{new Date(ev.datetime).toLocaleString('de-DE', { dateStyle:'long', timeStyle:'short' })}</strong><br/>
          {ev.title} — {ev.location} {ev.url ? (<a href={ev.url} style={{marginLeft:8}}>Details</a>) : null}
        </li>
      ))}
    </ul>
  );
}
