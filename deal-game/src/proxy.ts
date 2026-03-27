import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
    // Intel subdomain rewriting: intel.* → /intel/...
    const hostname = request.headers.get('host') ?? '';
    const url = request.nextUrl.clone();
    if (hostname.startsWith('intel.') && !url.pathname.startsWith('/intel')) {
        url.pathname = '/intel' + url.pathname;
        // Build CSP headers for the rewrite
        const intelNonce = Buffer.from(crypto.randomUUID()).toString('base64');
        const isDev = process.env.NODE_ENV === 'development';
        const intelCsp = [
            `default-src 'self'`,
            `script-src 'self' 'nonce-${intelNonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
            `style-src 'self' 'unsafe-inline'`,
            `img-src 'self' blob: data:`,
            `font-src 'self' data:`,
            `connect-src 'self'`,
            `object-src 'none'`,
            `base-uri 'self'`,
            `form-action 'self'`,
            `frame-ancestors 'none'`,
            `upgrade-insecure-requests`,
        ].join('; ');
        const intelHeaders = new Headers(request.headers);
        intelHeaders.set('x-nonce', intelNonce);
        intelHeaders.set('Content-Security-Policy', intelCsp);
        const rewriteResponse = NextResponse.rewrite(url, {
            request: { headers: intelHeaders },
        });
        rewriteResponse.headers.set('Content-Security-Policy', intelCsp);
        return rewriteResponse;
    }

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
