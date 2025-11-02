// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function RootRedirect() {
    // виберіть вашу дефолтну локаль (sk/en/de)
    redirect('/sk');
}
