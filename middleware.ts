import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // пропускаємо службові та статичні файли
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    // якщо шлях без префікса локалі — редірект на /sk
    const hasLocale = /^\/(sk|en|de)(\/|$)/.test(pathname);
    if (!hasLocale) {
        const url = req.nextUrl.clone();
        url.pathname = `/sk${pathname}`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|api|.*\\..*).*)'],
};
