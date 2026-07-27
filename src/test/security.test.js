import { describe, expect, it } from 'vitest';
import { hashPassword, sanitizeText } from '../utils/security';

describe('security helpers', () => {
  it('sanitizes user-provided text before storage', () => {
    expect(sanitizeText('  Alice <script>\n', 20)).toBe('Alice');
  });

  it('hashes passwords instead of storing them in plain text', async () => {
    const hash = await hashPassword('demo1234');
    expect(hash).toMatch(/^[a-f0-9]{64}$/i);
    expect(hash).not.toBe('demo1234');
  });
});
