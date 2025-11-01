'use client';

import { motion, type Variants } from 'framer-motion';
import React from 'react';

type Props = {
    children: React.ReactNode;
    delay?: number;
    className?: string;
};

const variants: Variants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
    show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Reveal({ children, delay = 0, className }: Props) {
    return (
        <motion.div
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
}
