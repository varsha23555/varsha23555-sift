const encoder = new TextEncoder();

export function sanitizeText(value, maxLength = 80) {
  if (typeof value !== 'string') {
    return '';
  }

  const stripped = value
    .replace(/<[^>]*>/g, ' ')
    .replace(/javascript:/gi, ' ')
    .replace(/on\w+=/gi, ' ')
    .replace(/[^\p{L}\p{N}\s._@-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return stripped.slice(0, maxLength);
}

export async function hashPassword(password) {
  const data = encoder.encode(password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}
