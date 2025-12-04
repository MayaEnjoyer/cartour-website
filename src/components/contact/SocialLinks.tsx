'use client';
import { motion } from 'framer-motion';

const links = [
    {
        href: 'https://www.instagram.com/cartour.sk/',
        label: 'Instagram',
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4">
                <path
                    fill="currentColor"
                    d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"
                />
            </svg>
        ),
    },
    {
        href: 'https://www.facebook.com/cartour.sk/',
        label: 'Facebook',
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4">
                <path
                    fill="currentColor"
                    d="M22 12.07C22 6.49 17.52 2 11.93 2 6.35 2 1.86 6.49 1.86 12.07c0 5.02 3.66 9.18 8.44 9.96v-7.05H7.9v-2.91h2.4v-2.22c0-2.38 1.42-3.69 3.59-3.69 1.04 0 2.12.18 2.12.18v2.33h-1.19c-1.17 0-1.54.73-1.54 1.48v1.92h2.62l-.42 2.91h-2.2v7.05c4.78-.78 8.44-4.94 8.44-9.96z"
                />
            </svg>
        ),
    },
    {
        href: 'https://wa.me/421908699151',
        label: 'WhatsApp',
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4">
                {/* внешний пузырь */}
                <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                    d="M12 3.1A8.1 8.1 0 0 0 4 11.2a8 8 0 0 0 1.1 4.1L4 21l3.8-1.1A8.3 8.3 0 0 0 12 19.3 8.1 8.1 0 0 0 12 3.1z"
                />
                {/* трубка внутри */}
                <path
                    fill="currentColor"
                    d="M10.6 9.1l-.3.7a1.2 1.2 0 0 0 .1 1.1 4.7 4.7 0 0 0 2.2 2.1 1.2 1.2 0 0 0 1.1 0l.6-.3a.6.6 0 0 1 .7.1l.8.8a.7.7 0 0 1-.1 1 3 3 0 0 1-2 1 4.8 4.8 0 0 1-4.2-2.3 4.4 4.4 0 0 1-.8-2 2.8 2.8 0 0 1 1-2.3.6.6 0 0 1 .9.1z"
                />
            </svg>
        ),
    },
    {
        href: 'tel:+421908699151',
        label: 'Call',
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4">
                <path
                    fill="currentColor"
                    d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z"
                />
            </svg>
        ),
    },
];

export default function SocialLinks() {
    return (
        <div className="social-row flex items-center gap-3">
            {links.map((item, i) => (
                <motion.a
                    key={item.href}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={item.label}
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="social-btn"
                >
                    <span className="social-btn-inn">{item.icon}</span>
                </motion.a>
            ))}
        </div>
    );
}
