"use client"
import Link from 'next/link'
import { motion } from 'framer-motion';


export default function ({
  href,
  children,
  ...others
}: any) {
  const child = (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...others}
    >
      {children}
    </motion.a>
  );
  if (href) {
    return (
      <Link href={href || ''} passHref legacyBehavior  >
        {child}
      </Link>
    )
  }
  return child;
}