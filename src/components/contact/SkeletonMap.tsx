import React from 'react';

export default function SkeletonMap() {
    return (
        <div className="relative h-[360px] w-full overflow-hidden rounded-xl border border-black/10 bg-zinc-100 dark:bg-zinc-900 dark:border-white/10">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite_linear] bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10" />
            <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
        </div>
    );
}
