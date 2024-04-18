"use client"
import Link from 'next/link'
import { motion } from 'framer-motion';
import { Link as ChakraLink } from "@chakra-ui/react";


export default function ({ href, children, ...others }: any) {
  return (
    <Link href={href || ''} passHref legacyBehavior {...others}>
      <ChakraLink as={motion.a}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {children}
      </ChakraLink>
    </Link>
  )
}