import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// The browser calls the backend directly (e.g. login), and images are served from it.
const backendOrigin = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SERVER_URL ?? "").origin;
  } catch {
    return "";
  }
})();

// Next.js injects inline bootstrap scripts, so 'unsafe-inline' is needed until a nonce-based
// CSP is set up. 'unsafe-eval' is only for React's dev tooling.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${backendOrigin}`.trim(),
  "font-src 'self' data:",
  `connect-src 'self' ${backendOrigin}`.trim(),
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains",
        },
      ]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    // Only the localhost:4000 dev backend needs the Image Optimizer to reach a private IP.
    dangerouslyAllowLocalIP: isDev,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "web-ikvpd32y6hh5.up-de-fra1-k8s-1.apps.run-on-seenode.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
