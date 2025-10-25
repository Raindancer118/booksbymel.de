import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const originalFetch = global.fetch;
const originalEndpoint = process.env.NEWSLETTER_ESP_ENDPOINT;
const originalApiKey = process.env.NEWSLETTER_ESP_API_KEY;
const originalAudienceId = process.env.NEWSLETTER_ESP_AUDIENCE_ID;

function resetEnv(){
  if (originalEndpoint === undefined) {
    delete process.env.NEWSLETTER_ESP_ENDPOINT;
  } else {
    process.env.NEWSLETTER_ESP_ENDPOINT = originalEndpoint;
  }

  if (originalApiKey === undefined) {
    delete process.env.NEWSLETTER_ESP_API_KEY;
  } else {
    process.env.NEWSLETTER_ESP_API_KEY = originalApiKey;
  }

  if (originalAudienceId === undefined) {
    delete process.env.NEWSLETTER_ESP_AUDIENCE_ID;
  } else {
    process.env.NEWSLETTER_ESP_AUDIENCE_ID = originalAudienceId;
  }
}

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    process.env.NEWSLETTER_ESP_ENDPOINT = "https://esp.example.com/double-opt-in";
    process.env.NEWSLETTER_ESP_API_KEY = "test-api-key";
    process.env.NEWSLETTER_ESP_AUDIENCE_ID = "aud-123";
  });

  afterEach(() => {
    vi.restoreAllMocks();
    resetEnv();
    if (originalFetch) {
      global.fetch = originalFetch;
    } else {
      // @ts-expect-error allow cleanup when fetch undefined
      delete global.fetch;
    }
  });

  it("forwards the request to the ESP and returns success", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ success: true }), { status: 202 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      new Request("http://localhost/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: "reader@example.com" }),
        headers: { "content-type": "application/json" },
      }),
    );

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://esp.example.com/double-opt-in");
    expect(options?.method).toBe("POST");

    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result).toMatchObject({ ok: true });
  });

  it("propagates ESP errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify({ message: "invalid email" }), { status: 400 }),
      ),
    );

    const response = await POST(
      new Request("http://localhost/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: "broken" }),
        headers: { "content-type": "application/json" },
      }),
    );

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("invalid email");
  });

  it("rejects missing emails without contacting the ESP", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const response = await POST(
      new Request("http://localhost/api/newsletter", {
        method: "POST",
        body: JSON.stringify({}),
        headers: { "content-type": "application/json" },
      }),
    );

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("E-Mail-Adresse");
  });
});
