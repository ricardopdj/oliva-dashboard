import { Resend } from "resend";

const MAX_TOTAL_BYTES = 4.5 * 1024 * 1024;

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

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "Invalid form data" }), { status: 400 });
    }

    const summary = formData.get("summary");
    if (typeof summary !== "string" || !summary.trim()) {
      return new Response(JSON.stringify({ ok: false, error: "Missing summary" }), { status: 400 });
    }
    const company = formData.get("company");
    const companyName = typeof company === "string" && company.trim() ? company.trim() : "empresa sem nome";

    const audioFiles: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("audio_") && value instanceof File) audioFiles.push(value);
    }

    const totalBytes = audioFiles.reduce((sum, f) => sum + f.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      return new Response(JSON.stringify({ ok: false, error: "Payload too large" }), { status: 413 });
    }

    const attachments = await Promise.all(
      audioFiles.map(async (file) => ({
        filename: file.name || "audio.webm",
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Novo briefing recebido — ${companyName}`,
      text: summary,
      attachments,
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
