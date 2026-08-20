import { Resend } from "resend";

interface AudioLink {
  qid: string;
  label: string;
  url: string;
}

interface SubmitBody {
  summary?: unknown;
  company?: unknown;
  audioLinks?: unknown;
}

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), { status: 405 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.BRIEFING_TO_EMAIL;
    const from = process.env.BRIEFING_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      return new Response(JSON.stringify({ ok: false, error: "Server not configured" }), { status: 500 });
    }

    let body: SubmitBody;
    try {
      body = (await request.json()) as SubmitBody;
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "Invalid request body" }), { status: 400 });
    }

    const summary = body.summary;
    if (typeof summary !== "string" || !summary.trim()) {
      return new Response(JSON.stringify({ ok: false, error: "Missing summary" }), { status: 400 });
    }
    const companyName = typeof body.company === "string" && body.company.trim() ? body.company.trim() : "empresa sem nome";

    const audioLinks: AudioLink[] = Array.isArray(body.audioLinks)
      ? body.audioLinks.filter(
          (a): a is AudioLink =>
            !!a && typeof a === "object" &&
            typeof (a as AudioLink).url === "string" &&
            typeof (a as AudioLink).label === "string"
        )
      : [];

    const text = audioLinks.length
      ? `${summary}\n\n== ÁUDIOS GRAVADOS ==\n${audioLinks.map((a) => `${a.label}: ${a.url}`).join("\n")}`
      : summary;

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Novo briefing recebido — ${companyName}`,
      text,
    });

    if (error) {
      return new Response(JSON.stringify({ ok: false, error: "Email send failed" }), { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  },
};
