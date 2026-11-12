import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const config = JSON.parse(readFileSync(resolve(process.cwd(), "infrastructure/enquiry-worker/wrangler.jsonc"), "utf8"));

describe("enquiry deployment configuration", () => {
  it("uses the approved Microsoft 365 sender and recipient mailbox", () => {
    expect(config.vars.EMAIL_FROM).toBe("contact@exafluence.com");
  });

  it("permits the deployed website and Lovable test origins", () => {
    const origins = config.vars.ALLOWED_ORIGINS.split(",");
    expect(origins).toEqual([
      "https://exfedu.exafluence.workers.dev",
      "https://exfedu.lovable.app",
      "https://id-preview--6a6eef78-c02c-449d-a8d6-90f1dd4349d1.lovable.app",
      "https://6a6eef78-c02c-449d-a8d6-90f1dd4349d1.lovableproject.com",
    ]);
  });

  it("keeps private Microsoft credentials out of deployable configuration", () => {
    expect(config.vars).not.toHaveProperty("M365_CLIENT_SECRET");
  });
});
