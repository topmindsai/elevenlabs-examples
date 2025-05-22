/**
 * Safely access Next.js environment variables on the client side
 */

export const getPublicAgentId = (): string => {
  if (typeof window !== 'undefined') {
    // Client-side
    return process.env.NEXT_PUBLIC_AGENT_ID || 'qzfCTUbp54hEcfcvTgAP';
  }
  // Server-side
  return process.env.AGENT_ID || process.env.NEXT_PUBLIC_AGENT_ID || 'qzfCTUbp54hEcfcvTgAP';
};

export const getPublicHost = (): string => {
  if (typeof window !== 'undefined') {
    // Client-side
    return process.env.NEXT_PUBLIC_HOST || window.location.origin || 'http://localhost:3001';
  }
  // Server-side
  return process.env.NEXT_PUBLIC_HOST || 'http://localhost:3001';
}; 