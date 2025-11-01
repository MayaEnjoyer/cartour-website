import { redirect } from 'next/navigation';

export default function RootRedirect() {
    redirect('/sk'); // canonical default locale
}
