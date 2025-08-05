'use client';

import { motion } from 'framer-motion';

export default function FadeInUp({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 1.2, 
        ease: [0.25, 1, 0.5, 1],
        delay
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
