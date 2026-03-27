import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const isDev = process.env.NODE_ENV === 'development';

    const cspHeader = [
        `default-src 'self'`,
        // strict-dynamic + nonce covers all Next.js scripts (chunks, polyfills, etc.)
        // unsafe-eval needed in dev for hot-reload; the Meta Pixel inline init also needs the nonce
        `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''} https://connect.facebook.net`,
        `style-src 'self' 'unsafe-inline'`,
        // Allow self-hosted images + FB pixel noscript img + data URIs for grain overlay
        `img-src 'self' blob: data: https://www.facebook.com`,
        `font-src 'self' data:`,
        // Needed for FB events.js XHR calls
        `connect-src 'self' https://www.facebook.com https://connect.facebook.net`,
        `object-src 'none'`,
        `base-uri 'self'`,
        `form-action 'self'`,
        `frame-ancestors 'none'`,
        `upgrade-insecure-requests`,
    ].join('; ');

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', cspHeader);

    const response = NextResponse.next({
        request: { headers: requestHeaders },
    });
    response.headers.set('Content-Security-Policy', cspHeader);

    return response;
}

export const config = {
    matcher: [
        {
            // Run on all routes EXCEPT Next.js internals and static files
            source: '/((?!_next/static|_next/image|favicon.ico|manifest.json|.*\\.(?:webp|png|jpg|jpeg|svg|ico|json)).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
};
