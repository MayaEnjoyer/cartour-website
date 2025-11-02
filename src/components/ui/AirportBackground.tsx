'use client';

export default function AirportBackground() {
    return (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(180deg, #8F9AA6 0%, #D6DCE2 45%, #8F9AA6 100%)',
                }}
            />

            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(900px 500px at 50% 120px, rgba(255,255,255,0.55), transparent 65%)',
                }}
            />

            <div className="absolute left-[-10%] top-[22%] h-[42vmin] w-[42vmin] rounded-full bg-white/28 blur-3xl animate-float" />
            <div
                className="absolute right-[-12%] bottom-[8%] h-[50vmin] w-[50vmin] rounded-full bg-white/22 blur-3xl animate-float"
                style={{ animationDelay: '2.2s' }}
            />

            {/* ТОЧКОВА СІТКА, дуже приглушена */}
            <div
                className="absolute inset-0 bg-dot-grid opacity-15"
                style={{
                    maskImage: 'radial-gradient(75% 75% at 50% 38%, black, transparent)',
                }}
            />

            <div className="absolute inset-x-0 bottom-[-18%] h-[40%] bg-gradient-to-t from-black/10 to-transparent" />
        </div>
    );
}
