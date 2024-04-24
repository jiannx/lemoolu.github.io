"use client"
import Link from 'next/link'
import { motion } from 'framer-motion';
import { Link as ChakraLink, Tooltip } from "@chakra-ui/react";


export default function ({
  href,
  children,
  ...others
}: any) {
  const child = (
    <ChakraLink
      as={motion.a}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      {...others}
    >
      {children}
    </ChakraLink>
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