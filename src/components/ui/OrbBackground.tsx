'use client';

import React from 'react';

export default function OrbBackground() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            {/* big blurred orb */}
            <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.35)_0%,rgba(99,102,241,0)_60%)] blur-3xl animate-[float_12s_ease-in-out_infinite]" />
            {/* another orb */}
            <div className="absolute top-1/3 -right-48 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.28)_0%,rgba(34,197,94,0)_60%)] blur-3xl animate-[float_14s_ease-in-out_infinite_reverse]" />
            {/* noise overlay for depth */}
            <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] bg-repeat" />
            <style jsx global>{`
        @keyframes float {
          0%   { transform: translate3d(0,0,0) }
          50%  { transform: translate3d(0,-20px,0) }
          100% { transform: translate3d(0,0,0) }
        }
      `}</style>
        </div>
    );
}
