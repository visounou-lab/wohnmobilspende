/**
 * Session-Konstanten ohne Node-spezifische Abhängigkeiten.
 * Getrennt von auth.ts, damit die Middleware (Edge Runtime) diese Werte
 * nutzen kann, ohne bcrypt in das Edge-Bundle zu ziehen.
 */
export const COOKIE_NAME = "ws_admin_session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 8; // 8 Stunden
