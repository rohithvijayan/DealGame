import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || '';
    const url = request.nextUrl.clone();
    const { pathname } = url;

    // 1. Dealers Subdomain (The Game)
    // dealers.cjp.info/ should show the Splash Screen (/)
    // dealers.cjp.info/game should show the game rounds (/game)
    if (hostname.includes('dealers.cjp.info')) {
        // Skip Rewriting for API, Next.js internals, and Files
        if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
            return handleSecurity(request);
        }

        // Rewrite root (/) on the dealers subdomain to /intel
        if (pathname === '/') {
            url.pathname = '/intel';
            return rewriteWithCsp(request, url);
        }
        return handleSecurity(request);
    }

    // 2. Main Domain (The Intel Archive)
    // cjp.info/ should show the Intel landing page (/intel)
    // cjp.info/[slug] should show the Intel article (/intel/[slug])
    else if (hostname.includes('cjp.info')) {
        // Skip Rewriting for API, Next.js internals, and Files
        if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
            return handleSecurity(request);
        }

        // If trying to access /game or /results from the main domain, redirect to the subdomain in production
        if (pathname.startsWith('/game') || pathname.startsWith('/results')) {
            const isProd = hostname === 'cjp.info' || hostname === 'www.cjp.info';
            if (isProd) {
                const newUrl = new URL(`https://dealers.cjp.info${pathname}`, request.url);
                return NextResponse.redirect(newUrl);
            }
            // For local dev where we don't have subdomains, just let it through
            return handleSecurity(request);
        }

        // Already on /intel? Proceed
        if (pathname.startsWith('/intel')) {
            return handleSecurity(request);
        }

        // Rewrite root and subpaths to /intel
        url.pathname = `/intel${pathname === '/' ? '' : pathname}`;
        return rewriteWithCsp(request, url);
    }

    // Default: Just add CSP/nonce and proceed (Localhost or other domains)
    return handleSecurity(request);
}

/** Utility to rewrite with security headers */
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
        `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''} https://connect.facebook.net https://www.googletagmanager.com`,
        `style-src 'self' 'unsafe-inline'`,
        `img-src 'self' blob: data: https://www.facebook.com https://www.googletagmanager.com https://www.google-analytics.com`,
        `font-src 'self' data:`,
        `connect-src 'self' https://www.facebook.com https://connect.facebook.net https://www.google-analytics.com https://*.googletagmanager.com`,
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
