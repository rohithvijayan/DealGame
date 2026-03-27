import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || '';
    const url = request.nextUrl.clone();
    const { pathname } = url;

    // Subdomain routing for Production
    // dealers.cjp.info -> /game/...
    if (hostname.includes('dealers.cjp.info')) {
        if (!pathname.startsWith('/game') && !pathname.startsWith('/api') && !pathname.includes('.')) {
            url.pathname = `/game${pathname === '/' ? '' : pathname}`;
            return rewriteWithCsp(request, url);
        }
    }
    // cjp.info -> /intel/...
    else if (hostname.includes('cjp.info') && !hostname.includes('dealers.')) {
        if (!pathname.startsWith('/intel') && !pathname.startsWith('/api') && !pathname.includes('.')) {
            url.pathname = `/intel${pathname === '/' ? '' : pathname}`;
            return rewriteWithCsp(request, url);
        }
    }

    // Default: Just add CSP/nonce and proceed
    return handleSecurity(request);
}

/** Utility to rewrite with the same CSP logic as handleSecurity */
function rewriteWithCsp(request: NextRequest, url: URL) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const isDev = process.env.NODE_ENV === 'development';
    const csp = getCsp(nonce, isDev);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', csp);

    const response = NextResponse.rewrite(url, {
        request: { headers: requestHeaders },
    });
    response.headers.set('Content-Security-Policy', csp);
    return response;
}

/** Standard security header handling */
function handleSecurity(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const isDev = process.env.NODE_ENV === 'development';
    const csp = getCsp(nonce, isDev);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', csp);

    const response = NextResponse.next({
        request: { headers: requestHeaders },
    });
    response.headers.set('Content-Security-Policy', csp);
    return response;
}

function getCsp(nonce: string, isDev: boolean) {
    return [
        `default-src 'self'`,
        `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''} https://connect.facebook.net`,
        `style-src 'self' 'unsafe-inline'`,
        `img-src 'self' blob: data: https://www.facebook.com`,
        `font-src 'self' data:`,
        `connect-src 'self' https://www.facebook.com https://connect.facebook.net`,
        `object-src 'none'`,
        `base-uri 'self'`,
        `form-action 'self'`,
        `frame-ancestors 'none'`,
        `upgrade-insecure-requests`,
    ].join('; ');
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
