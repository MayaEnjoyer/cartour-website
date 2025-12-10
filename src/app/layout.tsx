import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Подключение шрифтов
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Метаданные сайта
export const metadata: Metadata = {
    title: "Cartour",
    description: "Airport & city transfers",
    icons: {
        icon: [
            {
                url: "/favicon.svg",
                type: "image/svg+xml",
            },
        ],
    },
    // Это превратится в:
    // <meta name="google-site-verification" content="SvbGjS-bIsmscaCKj1r0LbaG6ec0oo6YKincblPdDp4" />
    verification: {
        google: "SvbGjS-bIsmscaCKj1r0LbaG6ec0oo6YKincblPdDp4",
    },
};

// Корневой layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="sk">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh text-gray-900 
          bg-[radial-gradient(40%_60%_at_0%_0%,#e9edff_0%,transparent_60%),radial-gradient(60%_60%_at_100%_100%,#e6fff3_0%,transparent_60%)]`}
        >
        {/* Контент страницы */}
        {children}

        {/* Контейнер для порталов (например, ReservationSuccessModal) */}
        <div id="modal-root" />
        </body>
        </html>
    );
}
