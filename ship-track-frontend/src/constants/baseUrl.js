// In dev, use Vite proxy (same origin). In production, set VITE_API_URL to your API host.
export const AUTH_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "" : "http://localhost:8080"),
    TIME_OUT: 15000,
    TOKEN: 'token',
    AUTHORIZATION:'Authorization',
    BEARER: 'Bearer'
}