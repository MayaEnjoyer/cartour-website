'use client';

type Item = { title: string; content: React.ReactNode };

export default function Accordion({
                                      items,
                                      defaultOpen,
                                  }: {
    items: Item[];
    defaultOpen?: number;
}) {
    return (
        <div className="rounded-xl border divide-y">
            {items.map((it, i) => (
                <details
                    key={it.title}
                    className="group"
                    {...(defaultOpen === i ? { open: true } : {})}
                >
                    <summary className="flex cursor-pointer select-none items-center justify-between p-4">
                        <span className="font-medium">{it.title}</span>
                        <span className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded border text-sm transition-transform open:rotate-45">
              +
            </span>
                    </summary>

                    <div className="px-4 pb-4 text-sm text-gray-600">{it.content}</div>
                </details>
            ))}
        </div>
    );
}
