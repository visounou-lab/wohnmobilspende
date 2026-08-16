/**
 * Einfaches In-Memory-Rate-Limiting pro IP.
 *
 * Hinweis: In einer serverlosen Umgebung (Vercel) ist der Speicher pro
 * Instanz. Das bietet einen grundlegenden Schutz gegen einfache Missbrauchs-
 * versuche. Für strengere Anforderungen kann später ein externer Speicher
 * (z. B. Upstash Redis) ergänzt werden.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): { success: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return {
      success: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return {
    success: true,
    remaining: limit - bucket.count,
    retryAfterSeconds: 0,
  };
}

/** Ermittelt die Client-IP aus den üblichen Proxy-Headern. */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
