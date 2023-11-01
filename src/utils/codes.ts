function generateState() {
  return Math.random().toString(36).substring(7);
}

async function generateCodeVerifier(): Promise<string> {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const codeVerifier: string[] = [];
  const length = 128;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    codeVerifier.push(charset.charAt(randomIndex));
  }

  return codeVerifier.join("");
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  const codeChallenge = Array.from(new Uint8Array(buffer))
    .map((byte) => String.fromCharCode(byte))
    .join("");
  return base64UrlEncode(codeChallenge);
}

function base64UrlEncode(input: string): string {
  const base64 = btoa(input);
  return base64.replace("+", "-").replace("/", "_").replace(/=+$/, "");
}

async function generateCodeChallengePair(): Promise<{
  codeVerifier: string;
  codeChallenge: string;
}> {
  const codeVerifier = await generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  return { codeVerifier, codeChallenge };
}

export {
  base64UrlEncode,
  generateCodeChallenge,
  generateCodeChallengePair,
  generateCodeVerifier,
  generateState,
};
