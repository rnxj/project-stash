export async function sha256(source: string) {
  const sourceBytes = new TextEncoder().encode(source);
  const digest = await crypto.subtle.digest('SHA-256', sourceBytes);
  const resultBytes = Array.from(new Uint8Array(digest));
  return resultBytes.map((x) => x.toString(16).padStart(2, '0')).join('');
}
