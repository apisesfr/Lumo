// Lumo Cloud: a free Cloudflare Worker that answers Lumo chats with a bigger open model on Cloudflare Workers AI.
// No API key needed: the Worker uses the "AI" binding on your Cloudflare account (free: 10,000 Neurons a day, about 400 chats).
// Setup steps are in cloud/README.md.

const MODEL = "@cf/google/gemma-4-26b-a4b-it";   // Gemma 4 26B (Apache 2.0), cheap on the free tier
const ALLOWED_ORIGINS = ["https://apisesfr.github.io", "http://localhost:8790", "http://127.0.0.1:8790"];
const PER_PERSON_PER_DAY = 40;   // messages per visitor per day (best effort: counted per server, not perfect)
const MAX_MESSAGES = 24, MAX_CHARS = 20000;

const LUMO = `You are Lumo, a free, friendly AI homework helper made by a high school student for students.
- Help students learn: explain step by step in simple words, and show the work for math. Use short paragraphs and simple lists.
- Formatting: plain text, **bold** for key words, numbered steps. No tables, no # headings, no LaTeX (write math like 3x + 2 = 11, x^2, sqrt(2)).
- Be chill and encouraging, and match a casual tone if the student is casual, but stay correct. If you're not sure, say so.
- Keep everything school-appropriate. Don't ask for or repeat personal info (full names, addresses, phone numbers, passwords).
- For multiple choice questions, pick ONE answer and end with "The answer is" followed by the letter and the choice.
- If asked what you are: you're Lumo Cloud, Lumo's smart mode, running on an open AI model (Google's Gemma 4) through Cloudflare. You're not ChatGPT.`;

const seen = new Map();   // "ip|day" -> count, kept in this server's memory

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}
const json = (obj, status, origin) =>
  new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json", ...cors(origin) } });

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") return new Response(null, { headers: cors(origin) });
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/") return json({ ok: true, name: "Lumo Cloud", model: MODEL }, 200, origin);
    if (request.method !== "POST" || url.pathname !== "/chat") return json({ error: "not found" }, 404, origin);
    if (!ALLOWED_ORIGINS.includes(origin)) return json({ error: "forbidden" }, 403, origin);

    // per-visitor daily limit
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const key = ip + "|" + new Date().toISOString().slice(0, 10);
    const n = (seen.get(key) || 0) + 1;
    if (n > PER_PERSON_PER_DAY) return json({ error: "limit" }, 429, origin);
    seen.set(key, n);
    if (seen.size > 50000) seen.clear();

    // check the request
    let body;
    try { body = await request.json(); } catch { return json({ error: "bad request" }, 400, origin); }
    const msgs = Array.isArray(body && body.messages) ? body.messages.slice(-MAX_MESSAGES) : [];
    let chars = 0;
    const clean = [];
    for (const m of msgs) {
      if (!m || !["system", "user", "assistant"].includes(m.role) || typeof m.content !== "string") continue;
      chars += m.content.length;
      clean.push({ role: m.role, content: m.content.slice(0, 8000) });
    }
    if (!clean.length || clean[clean.length - 1].role !== "user" || chars > MAX_CHARS) return json({ error: "bad request" }, 400, origin);
    // Lumo's personality goes first; the site's class notes (if any) are merged into the same system message
    const notes = clean.filter((m) => m.role === "system").map((m) => m.content).join("\n\n");
    const messages = [{ role: "system", content: LUMO + (notes ? "\n\n" + notes : "") }, ...clean.filter((m) => m.role !== "system")];

    try {
      const stream = await env.AI.run(MODEL, { messages, stream: true, max_tokens: 1200, temperature: 0.6 });
      return new Response(stream, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-store", ...cors(origin) } });
    } catch (e) {
      const msg = String((e && e.message) || e);
      // the free daily allocation ran out (or Cloudflare is rate limiting): tell the site so it can offer on-device Lumo
      if (/4006|allocation|limit|429|capacity/i.test(msg)) return json({ error: "limit" }, 429, origin);
      return json({ error: "server" }, 502, origin);
    }
  },
};
