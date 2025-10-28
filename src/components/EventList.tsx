import { getEvents } from "@/lib/events";

const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  dateStyle: "long",
  timeStyle: "short",
});

export default function EventList(){
  const events = getEvents();

  if (!events.length) {
    return <p>Aktuell keine Termine.</p>;
  }

  return (
    <ul className="grid grid--auto-fit list-reset">
      {events.map(event => {
        const date = new Date(event.datetime);
        const key = `${event.datetime}-${event.title}`;

        return (
          <li key={key} className="card event-list__item">
            <time className="event-list__datetime" dateTime={event.datetime}>
              {dateFormatter.format(date)}
            </time>
            <p className="event-list__details">
              {event.title} — {event.location}
              {event.url ? (
                <>
                  {" · "}
                  <a className="event-list__link" href={event.url}>
                    Details
                  </a>
                </>
              ) : null}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
