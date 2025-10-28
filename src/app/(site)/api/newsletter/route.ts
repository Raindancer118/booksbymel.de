import { NextResponse } from "next/server";

export const runtime = "edge";

type NewsletterRequest = {
  email?: string;
};

type EspError = {
  message?: string;
  error?: string;
};

export async function POST(request: Request) {
  const endpoint = process.env.NEWSLETTER_ESP_ENDPOINT;
  const apiKey = process.env.NEWSLETTER_ESP_API_KEY;
  const audienceId = process.env.NEWSLETTER_ESP_AUDIENCE_ID;

  if (!endpoint) {
    return NextResponse.json(
      { error: "Newsletter-Dienst ist nicht konfiguriert." },
      { status: 500 },
    );
  }

  let payload: NewsletterRequest;
  try {
    payload = (await request.json()) as NewsletterRequest;
  } catch (error) {
    return NextResponse.json(
      { error: "Ungültige Anfrage – JSON konnte nicht gelesen werden." },
      { status: 400 },
    );
  }

  const email = payload?.email?.trim().toLowerCase();
  if (!email) {
    return NextResponse.json(
      { error: "Bitte eine gültige E-Mail-Adresse angeben." },
      { status: 400 },
    );
  }

  const consent = {
    timestamp: new Date().toISOString(),
    source: "booksbymel.de/newsletter",
    ip: request.headers.get("x-forwarded-for") ?? undefined,
  };

  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (apiKey) {
    headers.set("Authorization", `Bearer ${apiKey}`);
  }

  if (audienceId) {
    headers.set("X-Audience-Id", audienceId);
  }

  try {
    const espResponse = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        listId: audienceId,
        doubleOptIn: true,
        consent,
      }),
    });

    let responseBody: EspError | undefined;
    try {
      responseBody = (await espResponse.json()) as EspError;
    } catch (error) {
      responseBody = undefined;
    }

    if (!espResponse.ok) {
      const message = responseBody?.message || responseBody?.error || "Newsletter-Anmeldung fehlgeschlagen.";
      return NextResponse.json({ error: message }, { status: espResponse.status });
    }

    console.info("Newsletter consent", { email, ...consent });

    return NextResponse.json(
      {
        ok: true,
        message: "Bestätigungs-E-Mail unterwegs. Bitte Posteingang prüfen.",
      },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler beim Newsletter-Dienst.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
