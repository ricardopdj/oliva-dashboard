import { issueSignedToken } from "@vercel/blob";
import { handleUploadPresigned, type HandleUploadPresignedBody } from "@vercel/blob/client";

const ALLOWED_AUDIO_TYPES = ["audio/webm", "audio/ogg", "audio/mp4", "audio/mpeg", "audio/wav", "audio/x-m4a"];
const MAX_UPLOAD_BYTES = 500 * 1024 * 1024;
const UPLOAD_TOKEN_TTL_MS = 60 * 60 * 1000;

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), { status: 405 });
    }

    let body: HandleUploadPresignedBody;
    try {
      body = (await request.json()) as HandleUploadPresignedBody;
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "Invalid request body" }), { status: 400 });
    }

    try {
      const jsonResponse = await handleUploadPresigned({
        body,
        request,
        getSignedToken: async (pathname) => ({
          token: await issueSignedToken({
            pathname,
            operations: ["put"],
            allowedContentTypes: ALLOWED_AUDIO_TYPES,
            maximumSizeInBytes: MAX_UPLOAD_BYTES,
            validUntil: Date.now() + UPLOAD_TOKEN_TTL_MS,
          }),
          urlOptions: {
            allowedContentTypes: ALLOWED_AUDIO_TYPES,
            maximumSizeInBytes: MAX_UPLOAD_BYTES,
          },
        }),
      });
      return new Response(JSON.stringify(jsonResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: (error as Error).message }), { status: 400 });
    }
  },
};
