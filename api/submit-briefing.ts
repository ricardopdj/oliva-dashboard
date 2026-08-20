import { Resend } from "resend";
import { issueSignedToken, presignUrl } from "@vercel/blob";

interface AudioEntry {
  qid: string;
  label: string;
  pathname: string;
}

interface SubmitBody {
  summary?: unknown;
  company?: unknown;
  audioLinks?: unknown;
}

const GET_LINK_TTL_MS = 7 * 24 * 60 * 60 * 1000;

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

    const audioEntries: AudioEntry[] = Array.isArray(body.audioLinks)
      ? body.audioLinks.filter(
          (a): a is AudioEntry =>
            !!a && typeof a === "object" &&
            typeof (a as AudioEntry).pathname === "string" &&
            typeof (a as AudioEntry).label === "string"
        )
      : [];

    let audioSection = "";
    if (audioEntries.length) {
      const validUntil = Date.now() + GET_LINK_TTL_MS;
      const token = await issueSignedToken({ operations: ["get"], validUntil });
      const links = await Promise.all(
        audioEntries.map(async (a) => {
          const { presignedUrl } = await presignUrl(token, {
            operation: "get",
            pathname: a.pathname,
            access: "private",
            validUntil,
          });
          return `${a.label}: ${presignedUrl}`;
        })
      );
      audioSection = `\n\n== ÁUDIOS GRAVADOS (links válidos por 7 dias) ==\n${links.join("\n")}`;
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Novo briefing recebido — ${companyName}`,
      text: `${summary}${audioSection}`,
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
